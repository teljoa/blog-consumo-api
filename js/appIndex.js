document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/articles').then(response => response.json())
        .then(posts => {
        const postsTable = document.getElementById('postsTable');
        
        posts.forEach(post => {
            fetch(`http://localhost:3000/users/${post.autorId}`).then(response => response.json()).then(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a href="post-details.html?id=${post.id}"> ${post.title}</a></td>
                    <td>${user.name}</td>
                    <td>
                        <div class="buttons-container">
                            <button class="edit" data-id="${post.id}">Editar</button>
                            <button class="delete" data-id="${post.id}">Eliminar</button>
                        </div>
                    </td>
              ` ;
                postsTable.appendChild(row);
            }).catch(error => console.error('Error al obtener el autor:', error));
        });
    }).catch(error => console.error('Error al obtener los posts:', error));
});