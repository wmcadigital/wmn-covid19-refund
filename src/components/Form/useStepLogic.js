import React, { useState, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
// Import components
import GenericError from 'components/shared/Errors/GenericError';
import Button from 'components/shared/Button/Button';

const useStepLogic = (formRef, setCannotProcess) => {
  const { register, errors, trigger, getValues } = useFormContext(); // Get useForm methods
  const [formDataState, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const [isContinuePressed, setIsContinuePressed] = useState(false); // State for tracking if continue has been pressed
  const { CustomerType, currentStep } = formDataState;

  // Function for setting the step of the form
  const setStep = (step) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: step,
    });
    window.scrollTo(0, 0);
  };

  // Update the current step to the correct one depending on users selection
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await trigger();
    setIsContinuePressed(true);
    // if no errors
    if (result) {
      // remove 'Error: ' from title as there are no errors
      document.title = document.title.replace('Error: ', '');
      if (Object.keys(getValues()).includes('UploadTicket')) {
        const payload = getValues();

        // upload ticket key is no longer needed
        delete payload.UploadTicket;

        const file = getValues('UploadTicket')[0];

        const PhotoBase64Extension = file.type.split('/')[1]; // => image/png (split at '/' and grab second part 'png')
        // Start base64'n our uploaded image
        const reader = new FileReader(); // Start new file reader
        reader.readAsDataURL(file); // Read file as dataURL

        // When loaded
        reader.onloadend = () => {
          // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
          const PhotoBase64 = reader.result.replace(/^data:.+;base64,/, '');

          // Update our formData with the base64Extension and Base64 photo
          formDataDispatch({
            type: 'UPDATE_FORM_DATA',
            payload: { ...payload, PhotoBase64Extension, PhotoBase64 },
          });
        };
      } else {
        formDataDispatch({ type: 'UPDATE_FORM_DATA', payload: getValues() });
      }

      if (!formDataState.formStatus.hasReachedConfirmation) {
        // step logic that applies to step 1 only
        if (formDataState.currentStep === 1) {
          switch (CustomerType) {
            case 'SwiftCard':
            case 'PaperTicket':
            case 'DirectDebit':
              setStep(currentStep + 1); // Go to next step (2) so we can set customerType
              break;
            case 'Scratchcard':
            case 'ClassPass':
              setCannotProcess(true); // go to cannot process
              // setStep(currentStep + 3); // Skip to last steps as payment info isn't needed for scratchcard and classPass
              break;
            default:
              setCannotProcess(true); // go to cannot process
              // setStep(currentStep + 2); // Skip two steps(step 3) as customerType has been set
              break;
          }
        } else if (CustomerType === 'DirectDebit') {
          setStep(currentStep + 1);
        }
        // if not on step 1 and if not direct debit, we can't currently process
        else {
          setCannotProcess(true); // go to cannot process
        }
      } else {
        setStep(5);
      }
    }
    // else, errors are true...
    else {
      window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
      // add 'Error: ' to title as there are errors
      document.title = `Error: ${document.title}`;
    }
  };

  // Continue button
  const continueButton = (
    <Button
      btnClass="wmnds-btn wmnds-col-1 wmnds-m-t-md"
      type="submit"
      text="Continue"
    />
  );

  const showGenericError = Object.keys(errors).length > 0 &&
    isContinuePressed && <GenericError errors={errors} />;

  return {
    setStep,
    register,
    handleSubmit,
    showGenericError,
    continueButton,
    formDataState,
    formDataDispatch,
  };
};

export default useStepLogic;
