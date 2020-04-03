import { useState, useContext, useEffect } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';

const useInputValidation = (name, label, inputmode, customValidation) => {
  // set up the state for the inputs value prop and set it to the default value
  const [formState, formDispatch] = useContext(FormContext); // Get the state of form data from FormContext
  // set up state for the inputs error prop
  const [error, setError] = useState(null);
  const [isTouched, setIsTouched] = useState(false);

  const value = formState.Application[name] || ''; // Get value from state

  // set up the event handler for onChange event
  function handleChange(e) {
    // When input is changed then update state
    formDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { [name]: e.target.value },
    });
  }

  // set up event handler for onBlur
  function handleBlur() {
    setIsTouched(true); // Set touched as the input has been touched by user (used below to determine whether to show errors)
  }

  // Handle validation
  // Re-use this logic everytime state is updated
  useEffect(() => {
    // If the user has touched the input then we can show errors
    if (isTouched) {
      // If there is no length
      if (!value.length) {
        setError(`Enter your ${label}`);
      }
      // If input is numeric and isn't a phone number(we handle phone number with custom regex in it's own file) then it should only contain numbers
      else if (
        inputmode === 'numeric' &&
        !/^\d+$/.test(value) &&
        name !== 'PhoneNumber'
      ) {
        setError(`${label} must only include numbers`);
      }
      // Run custom validation logic
      else if (customValidation) {
        setError(customValidation());
      }
      // Else all is good, so reset error
      else {
        setError(null);
      }
    }
  }, [
    customValidation,
    inputmode,
    isTouched,
    label,
    name,
    value,
    value.length,
  ]);

  // return object
  return {
    handleChange,
    handleBlur,
    error,
  };
};

export default useInputValidation;