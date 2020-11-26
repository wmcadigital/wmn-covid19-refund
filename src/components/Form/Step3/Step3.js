import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
// Import components
import DirectDebit from './DirectDebit/DirectDebit';
import SwiftCard from './SwiftCard/SwiftCard';
import TicketNumber from './TicketNumber/TicketNumber';
import SoMTicketNumber from './SoMTicketNumber/SoMTicketNumber';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo'
// import SoMTicketNumber from './SoMTicketNumber/SoMTicketNumber';
import UploadTicket from './UploadTicket/UploadTicket';
import LastUsed from './LastUsed/LastUsed';
import HowProcess from './HowProcess/HowProcess';

const Step3 = ({
  currentStep,
  isPaperTicket,
  isSwiftOnMobile,
}) => {
  const [formState] = useContext(FormDataContext); // Get the state of form data from FormDataContext

  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { handleSubmit, showGenericError, continueButton } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  const { CustomerType, Application } = formState; // Destructure object

  // Set placeholder vars which we will change in the switch below (based on CustomerType)
  let elementsToRender; // Used to change conditional elements to render
  let shouldRenderUpload;

  // If a swift on mobile user (clicked in step 1)
  if (isSwiftOnMobile) {
    elementsToRender = <SoMTicketNumber />;
  }
  // Else if is paper ticket user (clicked in step 1)
  else if (isPaperTicket) {
    switch (CustomerType) {
      // If the paper ticket and customertype is DD
      case 'DirectDebit':
        elementsToRender = (
          <>
            <DirectDebit />
            <TicketNumber />
          </>
        );
        break;
      // If the paper ticket and customertype is Corporate
      case 'Corporate':
        elementsToRender = (
          <>
            <>
              <TicketNumber />
              <HowProcess />
            </>
          </>
        );
        break;
      // Else if paperTicket
      default:
        elementsToRender = <TicketNumber />;
        break;
    }

    // if a CustomerType is corporate then only show file upload if they have selected cancel ticket option in HowProcess
    // Otherwise if the customerType isn't corporate then show file upload.
    if (
      (CustomerType === 'Corporate' &&
        Application.ActionType === 'CancelTicket') ||
      CustomerType !== 'Corporate'
    ) {
      shouldRenderUpload = true; // Show FileUpload
    } else {
      shouldRenderUpload = false; // Hide FileUpload
    }
  }
  // If not a paper ticket or swift on mobile then must be online customertype so run switch on it
  else {
    // Switch on customer type, then change disabledState and elementsToRender accordingly
    switch (CustomerType) {
      // DirectDebit
      case 'DirectDebit':
        elementsToRender = (
          <>
            <DirectDebit />
            <SwiftCard />
          </>
        );

        break;

      //  Corporate
      case 'Corporate':
        elementsToRender = (
          <>
            <SwiftCard />
            <HowProcess />
          </>
        );

        break;

      // Worwise, Shop, SwiftPortal, OnlineSales(this won't happen as it is hidden in step2 unless paper ticket is chosen, so it will be part of the else statement below)
      // Pass isSwiftOnMobile state to see if user has selected this option in step 1, if so we show slightly different text for swiftCard
      default:
        elementsToRender = <SwiftCard />;
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
    <SectionStepInfo section={`Section ${currentStep} of 4`} description="Tell us about your ticket" />

    {/* Show generic error message */}
    {showGenericError}

      {/* {errorState.errors.length && errorState.continuePressed && (
        <GenericError />
      )} */}

      {/* This changes based on switch logic above */}
      {elementsToRender}

      <LastUsed />

      {/* Only show this based on the logic set near top of file */}
      {shouldRenderUpload && <UploadTicket />}

      {continueButton}
    </form>
  );
};

Step3.propTypes = {
  currentStep: PropTypes.number.isRequired,
  isPaperTicket: PropTypes.bool.isRequired,
  isSwiftOnMobile: PropTypes.bool.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step3;
