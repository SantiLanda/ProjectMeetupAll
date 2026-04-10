const loginForm = document.getElementById('login-form');

// Manejar el envío del formulario
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  if (email && password && gender) {
    alert(`Welcome back, ${email}! Gender: ${gender}`);
  } else if (!gender) {
    alert('Please select your gender.');
  } else {
    alert('Please provide valid credentials or authenticate with your fingerprint.');
  }
});
