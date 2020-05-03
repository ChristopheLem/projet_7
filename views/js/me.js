const myUsername = document.getElementById('username')
const myEmail = document.getElementById('email')
const myPassword = document.getElementById('psw')
const updateBtn = document.getElementById('updatebtn')
const deleteBtn = document.getElementById('deletebtn')

const token = 'Bearer ' + sessionStorage.getItem('token') // Récupère le token stocké dans local storage
const urlMyProfile = 'http://localhost:4000/user/me' // Url de l'utilisateur connecté
// Récupère et affiche les données (username et email)
const getProfile = async () => {
   const data = await getData(urlMyProfile); // Récupère les données de l'utilisateur
   const { username, email } = data // 
   myUsername.value = username // Défini la valeur de l'input username
   myEmail.value = email // Défini la valeur de email
}
// Récupère les données de l'utilisateur
const getData = async (url) => {
    const response = await fetch(url, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
    }
})
    return await response.json();
}
getProfile()

// Modifie la ou les donnée(s) de l'utilisateur et envoie au serveur
const updateData = async (url, data) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}

// Gestionnaire d'évènement créé sur clic du bouton 'Modifier'
updateBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let userData = { // Donnée de l'utilisateur
        username: myUsername.value,
        email: myEmail.value,
        password: myPassword.value
    }
    const data = await updateData(urlMyProfile, userData) // Modifie la ou les donnée(s) de l'utilisateur et envoie au serveur
    console.log(data.message)
})
// DELETE ACCOUNT
const deleteProfile = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    return await response.json();
}

deleteBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const data = await deleteProfile(urlMyProfile);
    sessionStorage.clear();
    window.location = "signup.html";

})












// const url = 'http://localhost:4000/api/auth/signup'
// const update = {
//     username: username.value,
//     email: email.value,
//     password: password.value
// }

// // Envoie données à l'api
// const updateData = async (url, dataElt) => {
//     const response = await fetch(url, {
//         headers: {
//             'Content-Type' : 'application/json'
//         },
//         method: 'PUT',
//         body: JSON.stringify(dataElt)
//     })
//     return await response.json();
// }

// btn.addEventListener("click", async (e) => {
//     e.preventDefault(); 
//         await updateData(url, signup); // Envoie données au serveur  
//         window.location.reload(true);
// })