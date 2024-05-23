////////////////////////FUNCTION POST LOG IN//////////////////////////////////// 

// Sélection des éléments du DOM
const form = document.getElementById("form")
const emailInput = document.querySelector('form #email')
const passwordInput = document.querySelector('form #password')
const messageError = document.getElementById('error__message')

// Fonction pour envoyer une REQUETE POST pour l'authentification de l'utilisateur
async function authenticateUser(data) {
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const { token } = await response.json();
            // Stocker le token et marquer l'utilisateur comme connecté
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('loggedIn', true)
            // Rediriger vers la page de gestion si l'authentification est réussie
            window.location.href = "index.html";
        } else {
            //on appel cette function qui gere les erreurs
            handleErrors(response, data);
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la connexion :", error);
    }
}

// Fonction pour GERER LES ERREURS DE REPONSE avec UN DEUXS MESSAGES
function handleErrors(response, data) {
    messageError.style.display = "block";

    if (response.status === 404 && data.email) {
        //class cree en css error__input login.js
        emailInput.classList.add("error__input");
        messageError.innerText = "Adresse e-mail invalide.";
    }

    if (response.status === 401 && data.password) {
        //class cree en css error__input login.js
        passwordInput.classList.add("error__input");
        messageError.innerText = "Mot de passe incorrect.";
    }
}

//function pour DEFINIR LES CARACTERES DU EMAIL
function isValidEmail(email) {
    //"i" va definir les caracteres du email insensibles au majuscules ou minuscules
    const emailRegExp = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z]{2,6}$", "i");
    return emailRegExp.test(email);
}

// Fonction pour valider les champs du formulaire
function validateFields() {
    let isValid = true;
    messageError.style.display = "none";
    emailInput.classList.remove('error__input');
    passwordInput.classList.remove('error__input');
    //Attention de double le .value, une fois defini avec la variable
    //pas besoin dna sle condition
    const emailValue = emailInput.value;
    //Attention avec le mot de passe avec trim()
    const passwordValue = passwordInput.value;

    if (emailValue === '') {
        emailInput.classList.add('error__input');
        isValid = false;
    }

    if (passwordValue === '') {
        passwordInput.classList.add('error__input');
        isValid = false;
    }

    if (!isValid) {
        messageError.innerText = 'Veuillez remplir tous les champs.';
        messageError.style.display = 'block';

    } else if (!isValidEmail(emailValue)) {
        emailInput.classList.add('error__input');
        messageError.innerText = 'Adresse e-mail invalide.';
        messageError.style.display = 'block';
        isValid = false;
    }

    return isValid;
}

// Fonction pour GERER LA SOUMISSION DU FORMULAIRE
function handleFormSubmit(event) {
    event.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire.

    if (validateFields()) {
        const userData = {
            //on utilize trim() pour EFFACER LES ESPACES AU DEBUT
            //ET A LA FIN DE  CHAMPS DU FORMULAIRE
            //ATTENTION AVEC TRIM() APRES VALUE
            email: emailInput.value,
            password: passwordInput.value
        }
        // ON APPEL LA FUNCTION QUI GERE L'AUTENTIFICATION
        authenticateUser(userData);
    }
}

// Attacher l'événement submit au formulaire
function initialize() {
    //ON INTRODUI COMMEN PARAMETRE LA FUNCTION DE SOUMISSION
    form.addEventListener('submit', handleFormSubmit);
}

// Initialisation du formulaire
initialize();

//BONUS pour observer le mot de passe
const togglePassword = document.getElementById("togglePassword")
//bonus pour observe le mot de passe
togglePassword.addEventListener('click', () => {
    // Basculer le type de l'input entre 'password' et 'text'
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
    passwordInput.setAttribute('type', type)
    // Changer l'icône en fonction de l'état
    togglePassword.classList.toggle('fa-eye')
    togglePassword.classList.toggle('fa-eye-slash')
})



/* 
const form = document.getElementById("form")
// Fonction pour envoyer une requête POST pour l'authentification de l'utilisateur
async function getUser(data) {
    try {

        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
             const { token } = await response.json(); // Obtener el token de la respuesta
            //STOCKER LE TOKEN quand la session es valide
            // Il est important cette procedure pour povoir
            //faire des  autres manipulation administrateur
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('loggedIn' , true)
            // Rediriger vers la page de gestion si l'authentification est réussie
            window.location.href = "index.html";
            
        } else {
            // Afficher un message d'erreur si l'authentification échoue
            const messageError = document.getElementById("error__message");
            const email = document.querySelector("form #email");
            const password = document.querySelector("form #password");
            
            // Vérifier si l'email est incorrect
            if (response.status === 404 && data.email) {
                //class creer dans le css pour L'input email er password
                email.classList.add("error__input");
                messageError.innerText = "Nom d'utilisateur incorrect.";
                messageError.style.display = "block";
            }

            // Vérifier si le mot de passe est incorrect
            if (response.status === 401 && data.password) {
                //class creer dans le css pour L'input email er password
                password.classList.add("error__input");
                messageError.innerText = "Mot de passe incorrect.";
                messageError.style.display = "block";
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la connexion :", error);
        // Gérer les erreurs ici
    }
}
///////codigo de remplazo TEMPORAL 
async function login() {
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire.

        // Capture des valeurs des champs email et mot de passe.
        const email = document.querySelector('form #email').value
        const password = document.querySelector('form #password').value

        // Validation de base pour vérifier que les champs ne sont pas vides.
        if (email === '' || password === '') {
            const messageError = document.getElementById('error__message');
            const emailInput = document.querySelector('form #email');
            const passwordInput = document.querySelector('form #password');
    console.log(email)
            messageError.innerText = 'Veuillez remplir tous les champs.';
            messageError.style.display = 'block';
            
            emailInput.classList.add('error__input');
            passwordInput.classList.add('error__input');
            return;
        }

        // Création de l'objet utilisateur avec les données saisies.
        const userData = {
            email: email,
            password: password
        };

        // Appel à la fonction getUser pour envoyer les données au serveur.
        await getUser(userData);
    });
}
// Appel de la fonction login pour attacher l'événement submit.
login();
*/
