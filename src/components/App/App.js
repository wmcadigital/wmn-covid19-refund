import React, { useState } from 'react';
// Import contexts
import { FormProvider } from 'globalState/FormDataContext';
// Import components
import Form from 'components/Form/Form';
import Introduction from 'components/Introduction/Introduction';
import SuccessPage from 'components/SuccessPage/SuccessPage';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import NoProcessPage from 'components/NoProcessPage/NoProcessPage';

function App() {
  const [isFormStarted, setIsFormStarted] = useState({
    isStarted: false,
    isOnFrontPage: true,
  });
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);
  const [cannotProcess, setCannotProcess] = useState(null);

  return (
    <div className="wmnds-p-b-lg wmnds-grid">
      {/* If form isn't started, show intro...else show form */}
      {isFormStarted.isOnFrontPage && (
        <Introduction
          setIsFormStarted={setIsFormStarted}
          setCannotProcess={setCannotProcess}
        />
      )}

      <FormProvider>
        {!cannotProcess ? (
          <>
            {!isFormStarted.isOnFrontPage && formSubmitStatus === null && (
              <Form
                formSubmitStatus={formSubmitStatus}
                setFormSubmitStatus={setFormSubmitStatus}
                setCannotProcess={setCannotProcess}
                setIsFormStarted={setIsFormStarted}
              />
            )}
          </>
        ) : (
          <NoProcessPage
            isFormStarted={isFormStarted}
            setIsFormStarted={setIsFormStarted}
            setCannotProcess={setCannotProcess}
          />
        )}

        {formSubmitStatus && <SuccessPage />}
        {formSubmitStatus === false && <ErrorPage />}
      </FormProvider>
    </div>
  );
}

export default App;
