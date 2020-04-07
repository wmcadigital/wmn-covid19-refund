import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FormContext } from 'globalState/FormContext';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';

const Step2 = ({ currentStep, setCurrentStep, isPaperTicket }) => {
  const [formState, formDispatch] = useContext(FormContext); // Get the state of form data from FormContext

  // Update customerType on radio button change
  const handleRadioChange = (e) =>
    formDispatch({
      type: 'UPDATE_CUSTOMER_TYPE',
      payload: e.target.value,
    });

  // Goto next step on continue
  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  //  Set up default radio options (shown for both paper ticket and swift card)
  const radios = [
    {
      text: 'I pay monthly by Direct Debit',
      value: 'DirectDebit',
    },
    {
      text: 'I bought it from the West Midlands Network or Swift website',
      value: 'SwiftPortal',
    },
    {
      text: 'I pay for it through my company',
      value: 'Corporate',
    },
    {
      text:
        'I bought it from a ticket office, travel shop or Payzone shop',
      value: 'Shop',
    },
  ];

  // If the user has selected something other than paper ticket in step 1
  if (!isPaperTicket) {
    const workwise = { text: 'I am on the Workwise scheme', value: 'Workwise' };
    const ticketMachine = {
      text: 'I bought it from a Swift kiosk',
      value: 'SwiftPortal',
    };

    radios.splice(-1, 0, workwise); // push workwise radio option to last before 1 in radio list
    radios.splice(-1, 0, ticketMachine); // push ticketMachine radio option to last before 1 in radio list
  }

  return (
    <>
      <h2>Tell us about your ticket</h2>
      <Radios
        name="CustomerType"
        label="How did you buy your ticket?"
        radios={radios}
        onChange={handleRadioChange}
      />

      <button
        type="button"
        className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
        onClick={() => handleContinue()}
        disabled={
          formState.CustomerType === 'SwiftCard' ||
          formState.CustomerType === 'PaperTicket'
        }
      >
        Continue
      </button>
    </>
  );
};

Step2.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  isPaperTicket: PropTypes.bool.isRequired,
};

export default Step2;
