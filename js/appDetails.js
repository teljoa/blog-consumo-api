document.addEventListener('DOMContentLoaded',()=>{
    const postId = new URLSearchParams(window.location.search).get('id');
    const postTitle = document.getElementById('postTitle');
    const postAuthor = document.getElementById('postAuthor');
    const postContent = document.getElementById('postContent');
    const commentsList = document.getElementById('commentsList');
    const commentForm = document.getElementById('commentForm');
    const commentAuthorSelect = document.getElementById('commentAuthor');
    const commentContent = document.getElementById('commentContent');
    
    fetch(`http://localhost:3000/articles/${postId}`)
      .then(response => response.json())
      .then(post => {
        postTitle.textContent = post.title;

        fetch(`http://localhost:3000/users/${post.autorId}`)
          .then(response => response.json())
          .then(user => {
            postAuthor.textContent = `Autor: ${user.name}`;
          })
          .catch(error => console.error('Error al cargar el autor:', error));
        
          postContent.textContent = post.content;

          fetch(`http://localhost:3000/comments?articleId=${postId}`)
          .then(response => response.json())
          .then(comments => {
            comments.forEach(comment => {
              fetch(`http://localhost:3000/users/${comment.userId}`)
                .then(response =>response.json()).then(user =>{
                const li = document.createElement('li');
                li.textContent =`${comment.comment} - Autor: ${user.name}`;
                commentsList.appendChild(li);
              }).catch(error => console.error('Error al cargar el autor:', error));  
            });
          }).catch(error => console.error('Error al cargar los comentarios:', error));
        }).catch(error => console.error('Error al cargar el post:', error));
    
        fetch('http://localhost:3000/users')
          .then(response => response.json())
          .then(users => {
            users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            commentAuthorSelect.appendChild(option);
          });
        }).catch(error => console.error('Error al cargar los usuarios:', error));
        
        commentForm.addEventListener('submit', (e) => {
          e.preventDefault();
      
          const userId = commentAuthorSelect.value;
          const commentText = commentContent.value;
      
          if (!userId || !commentText) {
            alert('Por favor, completa todos los campos.');
            return;
          }
      
          const newComment = {
            comment: commentText,
            userId: parseInt(userId),
            articleId: parseInt(postId)
          };
      
          fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
          })
            .then(response => response.json())
            .then(comment => {
              alert('Comentario añadido exitosamente');

              fetch(`http://localhost:3000/users/${comment.userId}`)
                .then(response =>response.json()).then(user =>{
                  const li = document.createElement('li');
                  li.textContent = `${comment.comment} - ${user.name}`;
                  commentsList.appendChild(li);
                }).catch(error => console.error('Error al cargar el autor:', error));  
            })
            .catch(error => {
              console.error('Error al añadir el comentario:', error);
              alert('Ocurrió un error al añadir el comentario.');
            });
        });
})  