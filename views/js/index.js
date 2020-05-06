const story = document.getElementById('story');
const fileField = document.querySelector('input[type=file]')
const btn = document.getElementById('btn');
const errorMessage = document.getElementById('error-message');

const url = 'http://localhost:4000/post'
const token = 'Bearer ' + sessionStorage.getItem('token') // Récupère le token stocké dans local storage
// Crée les données du post 
const createData = async (url, formData) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': token
            },
            method: 'POST',
            body: formData
        })
        return await response.json()        
    } catch (err) {
        throw new Error(err)
    }
}
// Permet de créer un nouveau post
btn.addEventListener('click', async (e) => {
    try {
        e.preventDefault();
        console.log(story.value)
        if( story.value.length > 0) {
            const formData = new FormData();
            const post = { content: story.value }
            formData.append('post', JSON.stringify(post))
            if ( fileField.files[0]) formData.append('image', fileField.files[0])   
            const data = await createData(url, formData)
            story.value = "";
            window.location.reload(true)
            return console.log(data.message)
        }   
        return errorMessage.textContent = "Veuillez raconter votre histoire !"     
    } catch (err) {
        throw new Error(err)
    }
})

// Permet d'afficher les différents posts
const urlPosts = 'http://localhost:4000/posts'
const displayPosts = async () => {
    const posts = await getPosts(urlPosts);
    for( let i = posts.length -1; i >= 0; i--) {
        const {username, content, avatar, id, imageUrl} = posts[i]
        const date = posts[i].updatedAt // Récupère la date du post actuel
        const postDate = convertDate(date) // Convertis la date en format français
        renderPost(username, avatar, imageUrl, content, postDate, id)
    }
    likeOrDislike()
}
// Récupère les données des différents posts
const getPosts = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        return await response.json()
    } catch (err) {
        throw new Error(err)
    }
}

const renderPost = (username, avatar, imageUrl, postContent, postDate, postId) => {
    const section = document.getElementById('post');
    const article = document.createElement('article');
    if(imageUrl === null) {
        article.innerHTML = `
        <div class="post">
            <p class="username"><img src="${avatar}" id="avatar">${username}</p>
            <div class="content">
                <p>${postContent}</p>
                <div>
                    <i class="far fa-thumbs-up"></i>
                    <i class="far fa-thumbs-down"></i>
                </div>
            </div>
            <p class="date">${postDate}</p>
            <a href="post.html?${postId}"><b>Voir post...</b></a>
        </div>
        `        
    } else {
        article.innerHTML = `
        <div class="post">
            <p class="username"><img src="${avatar}" id="avatar">${username}</p>
            <div class="content">
                <p>${postContent}</p>
                <img src="${imageUrl}">
                <div>
                    <i class="far fa-thumbs-up"></i>
                    <i class="far fa-thumbs-down"></i>
                </div>
            </div>
            <p class="date">${postDate}</p>
            <a href="post.html?${postId}"><b>Voir post...</b></a>
        </div>
        `
    }

    section.appendChild(article)
}
// Convertir date en format français
const convertDate = (date) => {
    const engDate = date.split('T')[0].split('-')
    const hour = date.split('T')[1].split('.')[0]
    let frDate = []
    for( let i = engDate.length - 1 ; i >= 0; i-- ) {
        frDate.push(engDate[i])
    }
    frDate = frDate.join('-')
    const message = frDate + ', ' + hour
    return message
}
const likeOrDislike = () => {
    const likes = document.querySelectorAll('.fa-thumbs-up')
    const dislikes = document.querySelectorAll('.fa-thumbs-down')    
    for(let i = 0; i < likes.length; i++) {
        likes[i].addEventListener('click', () =>{
            if(!likes[i].className.includes('like') && !dislikes[i].className.includes('dislike')) {
                likes[i].value = 1;
                likes[i].classList.add('like')       
            } else {
                likes[i].value = 0;
                likes[i].classList.remove('like');                   
            }
        })
        dislikes[i].addEventListener('click', () =>{
            if(!dislikes[i].className.includes('dislike') && !likes[i].className.includes('like')) {
                dislikes[i].value = 1;
                dislikes[i].classList.add('dislike')       
            } else {
                dislikes[i].value = 0;
                dislikes[i].classList.remove('dislike');                   
            }
        })   
    }  
}

displayPosts()
