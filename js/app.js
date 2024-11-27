//index.html

document.addEventListener('DOMContentLoaded', () => {
    // Obtener los datos de la API para los artículos (posts)
    fetch('http://localhost:3000/articles')
        .then(response => response.json())
        .then(posts => {
        // Obtener la tabla donde se agregarán las filas
        const postsTable = document.getElementById('postsTable');
        
        // Recorrer los posts y agregar cada uno como una fila en la tabla
        posts.forEach(post => {
          // Obtener el nombre del autor a partir del autorId
            fetch(`http://localhost:3000/users/${post.autorId}`)
            .then(response => response.json())
            .then(user => {
                // Crear una fila para el post
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a href="post-details.html?id=${post.id}"> ${post.title}</a></td>
                    <td>${user.name}</td>
                    <td>
                        <div class="buttons-container">
                            <button class="editBtn" data-id="${post.id}">Editar</button>
                            <button class="deleteBtn" data-id="${post.id}">Eliminar</button>
                        </div>
                    </td>
              ` ;
                // Agregar la fila a la tabla
                postsTable.appendChild(row);
            })
            .catch(error => console.error('Error al obtener el autor:', error));
        });
      })
    .catch(error => console.error('Error al obtener los posts:', error));
});