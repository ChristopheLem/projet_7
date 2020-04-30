const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('psw')
const btn = document.getElementById('btn')

const url = 'http://localhost:4000/api/auth/signup'
const signup = {
    username: username.value,
    email: email.value,
    password: password.value
}

// Envoie données à l'api
const postData = async (url, dataElt) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(dataElt)
    })
    return await response.json();
}

btn.addEventListener("click", async (e) => {
    e.preventDefault(); 
        await postData(url, signup); // Envoie données au serveur  
        window.location = `login.html`; // Redirige vers la page login
})