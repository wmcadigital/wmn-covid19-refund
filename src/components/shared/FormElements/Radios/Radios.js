import React from 'react';
import PropTypes from 'prop-types';

import Radio from '../Radio/Radio';

const Radios = ({ label, onChange }) => {
  return (
    <div className="wmnds-fe-group">
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h3 className="wmnds-fe-question">{label}</h3>
        </legend>
        <div className="wmnds-fe-radios">
          <Radio
            name="CustomerType"
            text="Swift card"
            value="SwiftCard"
            onChange={onChange}
          />
          <Radio
            name="CustomerType"
            text="Paper ticket"
            value="PaperTicket"
            onChange={onChange}
          />
          <Radio
            name="CustomerType"
            text="Swift on Mobile app"
            value="SwiftPortal"
            onChange={onChange}
          />
          <Radio
            name="CustomerType"
            text="Scratchcard"
            value="Scratchcard"
            onChange={onChange}
          />
          <Radio
            name="CustomerType"
            text="Class pass"
            value="ClassPass"
            onChange={onChange}
          />
        </div>
      </fieldset>
    </div>
  );
};

Radios.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

Radios.defaultProps = {
  onChange: null,
};

export default Radios;
