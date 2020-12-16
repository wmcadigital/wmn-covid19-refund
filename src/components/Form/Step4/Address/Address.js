import React from 'react';
// Import contexts
import { useFormContext } from 'react-hook-form';
// Import components
import Input from 'components/shared/FormElements/Input/Input';

const Address = () => {
  const { register } = useFormContext(); // Custom hook for handling validation (errors etc)

  const postcodeRegex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;

  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <h2 className="wmnds-fe-question">What is your home address?</h2>
      </legend>
      {/* Building and street */}
      <Input
        className="wmnds-col-1-2 wmnds-col-sm-2-3"
        name="AddressLine1"
        label="Building and street"
        autocomplete="address-line1"
        fieldValidation={register({
          required: 'Enter building and street',
        })}
      />
      <Input
        className="wmnds-col-1-2 wmnds-col-sm-2-3"
        name="AddressLine2"
        label="Address line 2"
        autocomplete="address-line2"
        fieldValidation={register({
          required: false,
        })}
      />

      {/* Town/City and County */}
      <Input
        className="wmnds-col-1 wmnds-col-sm-1-2"
        name="AddressTown"
        label="Town or city"
        autocomplete="address-level2"
        fieldValidation={register({
          required: 'Enter town/city',
        })}
      />
      <Input
        className="wmnds-col-1 wmnds-col-sm-1-2"
        name="AddressLine3"
        label="County"
        autocomplete="address-county"
        fieldValidation={register({
          required: false,
        })}
      />

      {/* Postcode */}
      <Input
        name="AddressPostcode"
        label="Postcode"
        className="wmnds-col-1-2 wmnds-col-sm-1-4"
        autocomplete="postal-code"
        fieldValidation={register({
          required: 'Enter a postcode',
          pattern: {
            value: postcodeRegex,
            message:
              'Enter a postcode in the correct format, for example B19 3SD',
          },
        })}
      />
    </fieldset>
  );
};

export default Address;
