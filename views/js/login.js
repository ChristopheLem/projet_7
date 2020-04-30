const email = document.getElementById('email')
const password = document.getElementById('psw')
const btn = document.getElementById('btn')

const url = 'http://localhost:4000/api/auth/login'
const login = {
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
        await postData(url, login); // Envoie données au serveur 
        sessionStorage.setItem('status', ('connected')) ;  
        window.location = `index.html`; // Redirige vers la page de confirmation de commande
})

if( sessionStorage.getItem('status') && window.location.href.includes('login.html')) {
    window.location.replace('index.html')
    console.log('You are already connected !')   
}