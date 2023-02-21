const YES_ENGLISH = 'yes-english';
const YES_GERMAN = 'yes-german';
const YES_SPANISH = 'yes-spanish';

const onFormSubmit = (event) => {
  event.preventDefault();

  // Process the form data into an object.
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const errors = validate(data);

  if (errors.length > 0) {
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
  for (const { name, label } of errors) {
    handleValidationError(name, label);
  }

  focusOn(errors[0].name);
};

const validate = (formProps) => {
  // The array representing the errors
  let errors = [];

  resetValidation();

  // Handle requiring the Name field.
  if (!formProps.name) {
    errors.push({
      name: 'name',
      label: 'Name is required.',
    });
  }

  // Handle requiring the Email field.
  if (!formProps.email) {
    errors.push({
      name: 'email',
      label: 'Email is required.',
    });
  }

  // Handle formatting the Email field.
  if (formProps.email && !formProps.email.match(/^\S+@\S+\.\S+$/)) {
    errors.push({
      name: 'email',
      label: 'Must provide a properly formatted email address.',
    });
  }

  // Handle requiring the 'Are you Enjoying TP2022' field.
  if (!formProps.enjoying) {
    errors.push({
      name: 'enjoying',
      label: 'Knowing that you are enjoying OKC WebDevs is required.',
    });
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
    elem.removeAttribute('aria-describedby');
  });
}

const handleValidationError = (name, label) => {
  const formControl = document.querySelector(`[name=${name}]`);
  const formGroup = formControl.closest('.form-group');

  const errorElement = formGroup.appendChild(document.createElement('p'))

  errorElement.id = `${name}Error`;
  errorElement.innerText = label;
  errorElement.setAttribute('role', 'alert');
  errorElement.classList.add('error', 'validation');

  formControl.setAttribute('aria-invalid', 'true');
  formControl.setAttribute('aria-describedby', errorElement.id);
};

const focusOn = (name) => {
  document.querySelector(`[name=${name}]`).focus();
};
