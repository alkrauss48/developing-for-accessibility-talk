const YES_ENGLISH = 'yes-english';
const YES_GERMAN = 'yes-german';
const YES_SPANISH = 'yes-spanish';

const onFormSubmit = (event) => {
  event.preventDefault();

  // Process the form data into an object.
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);

  // Get the right 'thank you' message, based on the user's 'enjoying' response.
  const thankYou = getThankYouMessage(formProps.enjoying);

  // Print the results
  const results = document.getElementById('results');

  results.innerHTML =
    `${thankYou}, ${formProps.name} (${formProps.email})`;
};

const getThankYouMessage = (enjoying) => {
  switch(enjoying) {
    case YES_GERMAN:
      return 'Dankeschön';
    case YES_SPANISH:
      return 'Gracias';
  }

  return 'Thank You';
};
