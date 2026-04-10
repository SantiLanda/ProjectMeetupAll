// register.js

// Referencias a elementos del DOM
const fingerprintButton = document.getElementById('fingerprint-scan');
const biometricStatus = document.getElementById('biometric-status');
const registrationForm = document.getElementById('registration-form');

// Simulación del escaneo de huellas dactilares
fingerprintButton.addEventListener('click', () => {
  biometricStatus.textContent = 'Scanning...'; // Mostrar mensaje de escaneo

  // Simular un retraso para el proceso de escaneo
  setTimeout(() => {
    const success = Math.random() > 0.2; // 80% de probabilidad de éxito

    if (success) {
      biometricStatus.textContent = 'Fingerprint scan successful!';
      biometricStatus.style.color = '#2ecc71'; // Cambiar color a verde
    } else {
      biometricStatus.textContent = 'Fingerprint scan failed. Try again.';
      biometricStatus.style.color = '#e74c3c'; // Cambiar color a rojo
    }
  }, 2000); // Tiempo de espera de 2 segundos
});

// Manejar el envío del formulario
registrationForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevenir el envío por defecto

  if (biometricStatus.textContent.includes('successful')) {
    alert('Registration successful! Welcome to Meet-Up!');
  } else {
    alert('Please complete the biometric authentication.');
  }
});
