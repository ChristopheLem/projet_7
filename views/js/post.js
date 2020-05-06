// Recupere les paramètres de l'url
const postId = window.location.search.split('?')[1];
const urlPost = `http://localhost:4000/post/${postId}`
const urlProfile = `http://localhost:4000/user/me`
const token = 'Bearer ' + sessionStorage.getItem('token') // Récupère le token stocké dans local storage

// Permet d'afficher le post
const displayPost = async () => {
    const userData = await getData(urlProfile)
    const userId = userData.id;
    const postData = await getData(urlPost)
    const {username, content, avatar, imageUrl } = postData
    const postUserId = postData.userId
    const date = postData.updatedAt // Récupère la date du post actuel
    const postDate = convertDate(date) // Convertis la date en format français
    renderPost(username, avatar, imageUrl, content, postDate, postUserId, userId)
}
// Récupère des données selon l'url donnée
const getData = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': token
            }
        })
        return await response.json()
    } catch (err) {
        throw new Error
    }
}
// Selon status de l'utilisateur , permet de rendre visuellement le post
const renderPost = (username, avatar, imageUrl, postContent, postDate, postUserId, userId) => {
    const section = document.getElementById('post');
    const article = document.createElement('article');
    if(imageUrl === null) { // le post ne possède pas d'image 
        if ( postUserId === userId) { // l'utilisateur est celui qui a écrit le post
            article.innerHTML = `
            <div class="post">
                <p class="username"><img src="${avatar}" id="avatar">${username}</p>
                <form class="content">
                    <textarea>${postContent}</textarea>
                    <input type="file" name="image">
                    <button type="submit" class="validbtn" id="btn">Modifier</button>  
                </form>
                <p class="date">${postDate}</p>
                <i class="fas fa-times"></i>
            </div>`              
        } else { // l'utilisateur n'est pas celui qui a écrit le post
            article.innerHTML = `
            <div class="post">
                <p class="username"><img src="${avatar}" id="avatar">${username}</p>
                <div class="content">
                    <p>${postContent}</p>
                </div>
                <p class="date">${postDate}</p>
            </div>
            ` 
        }
    } else { // le post possède une image
        if (postUserId === userId) { // l'utilisateur est celui qui a écrit le post
            article.innerHTML = `
            <div class="post">
                <p class="username"><img src="${avatar}" id="avatar">${username}</p>
                <form class="content">
                    <textarea>${postContent}</textarea>
                    <img src="${imageUrl}">
                    <input type="file" name="image">
                    <button type="submit" class="validbtn" id="btn">Modifier</button>  
                </form>
                <p class="date">${postDate}</p>
                <i class="fas fa-times"></i>
            </div>`
        } else { // l'utilisateur n'est pas celui qui a écrit le post
            article.innerHTML = `
            <div class="post">
                <p class="username"><img src="${avatar}" id="avatar">${username}</p>
                <div class="content">
                    <p>${postContent}</p>
                    <img src="${imageUrl}">
                </div>
                <p class="date">${postDate}</p>
            </div>`
        }

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
displayPost()