import React from 'react';
import Title from 'components/shared/Title/Title';
import ContactDetails from 'components/shared/ContactDetails/ContactDetails';

const ErrorPage = () => {
  return (
    <>
      <Title />
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        {/* Error message */}
        <h3>We can't process your refund online yet</h3>

        <p>You'll need to phone Customer Services to get your refund.</p>

        <ContactDetails />
      </div>
    </>
  );
};

export default ErrorPage;