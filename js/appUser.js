document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const newUser = {
        name: username,
        email: email,
        password: password
      };
  
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      }).then(response => response.json())
        .then(data => {
          alert('Usuario creado exitosamente');
          window.location.href = 'index.html';
        })
        .catch(error => {
          console.error('Error al crear el usuario:', error);
          alert('Ocurrió un error al crear el usuario.');
        });
    });
});