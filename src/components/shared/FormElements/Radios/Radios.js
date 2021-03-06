import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Import contexts
import { useFormContext } from 'react-hook-form';
// Import components
import Radio from './Radio/Radio';

const { sanitize } = dompurify;

const Radios = ({ name, label, radios, fieldValidation, onChange }) => {
  const { errors } = useFormContext();

  return (
    <div
      className={`wmnds-fe-group ${
        errors[name] ? 'wmnds-fe-group--error' : ''
      }`}
    >
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2 className="wmnds-fe-question">{label}</h2>
          {/* If there is an error, show here */}
          {errors[name] && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{
                __html: sanitize(errors[name].message),
              }}
            />
          )}
        </legend>
        <div className="wmnds-fe-radios">
          {/* Loop through radios and display each radio button */}
          {radios.map((radio) => (
            <Radio
              key={radio.text}
              name={name}
              text={radio.text}
              value={radio.value}
              fieldValidation={fieldValidation}
              onChange={onChange}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

Radios.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  radios: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string, PropTypes.string)
  ).isRequired,
  fieldValidation: PropTypes.func,
  onChange: PropTypes.func,
};

Radios.defaultProps = {
  fieldValidation: null,
  onChange: null,
};

export default Radios;
