document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/users').then(response => response.json())
    .then(users => {

      const postAuthorSelect = document.getElementById('postAuthor');
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Selecciona un autor';
      postAuthorSelect.appendChild(defaultOption);
  
      users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        postAuthorSelect.appendChild(option);
      });
    }).catch(error => console.error('Error al cargar los usuarios:', error));

    const postForm = document.getElementById('postForm');
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const postTitle = document.getElementById('postTitle').value;
      const postAuthor = document.getElementById('postAuthor').value;
      const postContent = document.getElementById('postContent').value;
  
      if (!postAuthor) {
        alert('Por favor, selecciona un autor.');
        return;
      }
  
      const newPost = {
        title: postTitle,
        content: postContent,
        autorId: parseInt(postAuthor)
      };
  
      fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      }).then(response => response.json())
        .then(data => {
            alert('Post añadido exitosamente');
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error al crear el post:', error);
            alert('Ocurrió un error al crear el post.');
        });
    });
});