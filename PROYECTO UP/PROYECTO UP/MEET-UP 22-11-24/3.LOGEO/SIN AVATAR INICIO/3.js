// Obtener referencias a los elementos del DOM
const fingerprintButton = document.getElementById('login-fingerprint');
const fingerprintStatus = document.getElementById('fingerprint-status');
const loginForm = document.getElementById('login-form');

// Función para simular el escaneo de huellas dactilares
fingerprintButton.addEventListener('click', () => {
  fingerprintStatus.textContent = 'Scanning...'; // Mostrar mensaje de escaneo

  // Simular un retraso para el proceso de escaneo
  setTimeout(() => {
    const success = Math.random() > 0.2; // 80% de probabilidad de éxito

    if (success) {
      fingerprintStatus.textContent = 'Fingerprint scan successful!';
      fingerprintStatus.style.color = '#2ecc71'; // Cambiar color a verde
    } else {
      fingerprintStatus.textContent = 'Fingerprint scan failed. Try again.';
      fingerprintStatus.style.color = '#e74c3c'; // Cambiar color a rojo
    }
  }, 2000); // Tiempo de espera de 2 segundos
});

// Manejar el envío del formulario
loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevenir el envío del formulario por defecto

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) {
    alert(`Welcome back, ${email}!`);
  } else if (fingerprintStatus.textContent.includes('successful')) {
    alert('Login successful with fingerprint!');
  } else {
    alert('Please provide valid credentials or authenticate with your fingerprint.');
  }
});
