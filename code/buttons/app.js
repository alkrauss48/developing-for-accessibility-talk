const onButtonClick = () => {
  alert('You triggered some behavior instead of navigating to a new URL!');
};

const onFormSubmit = (event) => {
  event.preventDefault();

  const name = document.getElementById('name');
  const results = document.getElementById('results');

  results.innerHTML = name.value;
};
