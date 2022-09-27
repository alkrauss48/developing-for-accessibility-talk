const YES_ENGLISH = 'yes-english';
const YES_GERMAN = 'yes-german';
const YES_SPANISH = 'yes-spanish';


const onFormSubmit = (event) => {
  event.preventDefault();

  // Process the form data into an object.
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const errors = validate(data);

  if (Object.keys(errors).length > 0) {
    handleErrors(errors);
    return;
  }

  handleSuccess(data);
};

const handleSuccess = (data) => {
  const thankYou = getThankYouMessage(data.enjoying);

  const success = document.getElementById('form')
    .appendChild(document.createElement('p'))

  success.innerText =
    `${thankYou}, ${data.name} (${data.email})`;

  success.classList.add('success', 'validation');
};

const handleErrors = (errors) => {
  for (const name in errors) {
    const message = errors[name];

    handleValidationError(name, message);
  }
};

const validate = (formProps) => {
  // The object representing the errors
  // Key - formProps key name, Value - the client-facing error message.
  let errors = {};

  resetValidation();

  // Handle requiring the Name field.
  if (!formProps.name) {
    errors.name = 'Name is required.';
  }

  // Handle requiring the Email field.
  if (!formProps.email) {
    errors.email = 'Email is required.';
  }

  // Handle formatting the Email field.
  if (!errors.email && !formProps.email.match(/^\S+@\S+\.\S+$/)) {
    errors.email = 'Must provide a valid email address.';
  }

  // Handle requiring the 'Are you Enjoying TP2022' field.
  if (!formProps.enjoying) {
    errors.enjoying = 'Knowing that you are enjoying ThunderPlains 2022 is required.';
  }

  return errors;
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

const resetValidation = () => {
  document.querySelectorAll('.validation').forEach( elem => elem.remove() );

  document.querySelectorAll('[aria-invalid]').forEach( (elem) => {
    elem.removeAttribute('aria-invalid');
  });

  document.querySelectorAll('[aria-errormessage]').forEach( (elem) => {
    elem.removeAttribute('aria-errormessage');
  });
}

const handleValidationError = (name, message) => {
  const formControl = document.querySelector(`[name=${name}]`);
  const formGroup = formControl.closest('.form-group');

  const errorElement = formGroup.appendChild(document.createElement('p'))

  errorElement.id = `${name}Error`;
  errorElement.innerText = message;
  errorElement.setAttribute('role', 'alert');
  errorElement.classList.add('error', 'validation');

  formControl.setAttribute('aria-invalid', 'true');
  formControl.setAttribute('aria-errormessage', errorElement.id);
};
