const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('psw')
const btn = document.getElementById('btn')
const errorMessage = document.getElementById('error-message')

const url = 'http://localhost:4000/api/auth/signup'
let signup = {};

const regexEmail = /.+@.+\..+/;

const containANumber = value => value.match(containNumber) ? true : false;
const containSpecialCharacter = value => value.match(specialCharacter) ? true : false; // Vérifie que la valeur donnée ne possède pas de symbole

const isValidInput = (value) => value.length >= 2 ? true : false;
const isValidEmail = (value) => value.match(regexEmail) ? true : false; // Vérifie que la valeur donnée soit bien dans le format email
const isValidPassword = (value) => value.length > 7 // Vérifie que le valeur contient plus de 7 caractère

//Permet de vérifier les saisies utilisateurs
const formValidate = () => {
    if (isValidInput(username.value)) { 
        errorMessage.textContent = ""; 
        if(isValidEmail(email.value)) {
            errorMessage.textContent = "";
            if(isValidPassword(password.value)) {
                errorMessage.textContent = "";
                return  signup = { // Si toutes les inputs saisies sont valides, renvoie l'objet contact à cartInformation
                    username: username.value,
                    email: email.value,
                    password: password.value
                }
            } else {
                errorMessage.textContent = "Le mot de passe doit contenir au minimum 8 caractères !"
                password.focus();
                return false;
            }
        } else {
            errorMessage.textContent = "Merci de renseigner une adresse mail valide !";
            email.focus();
            return false;
        }
    } else {
        errorMessage.textContent = "Merci de renseigner votre nom d'utilisateur !"
        username.focus();
        return false;
    }
}

// Envoie données à l'api
const postData = async (url, dataElt) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type' : 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dataElt)
        })
        return await response.json();        
    } catch (err) {
        throw new Error(err)
    }

}
// Permet de créer un nouvel utilisateur
btn.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
        const ValidForm = formValidate();
        if (ValidForm !== false ) {
            const data = await postData(url, signup); // Envoie données au serveur  
            if ( data.error ) {
                errorMessage.textContent = data.error
                return console.error(data.error)
            }
            window.location = `login.html`; // Redirige vers la page login        
        }        
    } catch (err) {
        throw new Error(err)
    }
})
