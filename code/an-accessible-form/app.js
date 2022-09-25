const YES_ENGLISH = 'yes-english';
const YES_GERMAN = 'yes-german';
const YES_SPANISH = 'yes-spanish';

const onFormSubmit = (event) => {
  event.preventDefault();

  // Process the form data into an object.
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);

  validate(formProps);
};

const validate = (formProps) => {
  // Get all form fields
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const enjoyingError = document.getElementById('enjoyingError');
  const success = document.getElementById('success');

  // The object representing the errors
  // Key - formProps key name, Value - the client-facing error message.
  let errors = {};

  // Hide all the error fields, so we can conditionally show them if they have an error.
  nameError.classList.add('is-hidden');
  emailError.classList.add('is-hidden');
  enjoyingError.classList.add('is-hidden');
  success.classList.add('is-hidden');

  // Handle requiring the Name field.
  if (!formProps.name) {
    errors.name = 'Name is required.';
    nameError.innerHTML = errors.name;
    nameError.classList.remove('is-hidden');
  }

  // Handle requiring the Email field.
  if (!formProps.email) {
    errors.email = 'Email is required.';
    emailError.innerHTML = errors.email;
    emailError.classList.remove('is-hidden');
  }

  // Handle requiring the 'Are you Enjoying TP2022' field.
  if (!formProps.enjoying) {
    errors.enjoying = 'Knowing that you are enjoying ThunderPlains 2022 is required.';
    enjoyingError.innerHTML = errors.enjoying;
    enjoyingError.classList.remove('is-hidden');
  }

  if (Object.keys(errors).length > 0) {
    return;
  }

  const thankYou = getThankYouMessage(formProps.enjoying);

  success.innerHTML =
    `${thankYou}, ${formProps.name} (${formProps.email})`;

  success.classList.remove('is-hidden');
}

const getThankYouMessage = (enjoying) => {
  switch(enjoying) {
    case YES_GERMAN:
      return 'Dankeschön';
    case YES_SPANISH:
      return 'Gracias';
  }

  return 'Thank You';
};
