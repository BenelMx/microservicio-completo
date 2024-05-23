/* eslint-disable prettier/prettier */
document
  .getElementById('newUserForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');

    if (!nameInput.validity.valid || !emailInput.validity.valid) {
      showError(
        'Por favor complete correctamente todos los campos.',
        '#name',
        nameError,
      );
      showError(
        'Por favor complete correctamente todos los campos.',
        '#email',
        emailError,
      );
      return;
    }

    const name = nameInput.value;
    const email = emailInput.value;

    const newUser = { name, email };

    try {
      const response = await fetch('http://localhost:3001/examen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('El usuario ya existe en la base de datos');
      }

      const data = await response.json();
      showMessage('success', `Usuario ${data.name} creado con éxito`);
      localStorage.setItem('userData', JSON.stringify(data)); 
    } catch (error) {
      showMessage('error', `Error: ${error.message}`);
    }
  });

document.getElementById('enterButton').addEventListener('click', function () {
  const userData = localStorage.getItem('userData');
  if (userData) {
    window.location.href = 'ver_datos.html';
  } else {
    showMessage('error', 'No hay datos de usuario disponibles.');
  }
});

function showError(message, inputId, errorElement) {
  errorElement.textContent = message;
  errorElement.className = 'error-message active';
  document.querySelector(inputId).classList.add('error-input');

  setTimeout(function () {
    errorElement.textContent = '';
    errorElement.className = 'error-message';
    document.querySelector(inputId).classList.remove('error-input');
  }, 5000); 
}

function showMessage(type, message) {
  const responseDiv = document.getElementById('response');
  responseDiv.innerText = message;
  responseDiv.className = type;
  responseDiv.style.opacity = '1';

  setTimeout(function () {
    responseDiv.style.opacity = '0';
  }, 5000); 
}
