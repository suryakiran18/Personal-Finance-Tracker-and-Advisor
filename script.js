const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  const name = nameInput.value;
  const email = emailInput.value;

  console.log(`Submitted form data: Name: ${name}, Email: ${email}`);


  // Perform any additional actions with the form data

  // Reset the form
  nameInput.value = '';
  emailInput.value = '';
});