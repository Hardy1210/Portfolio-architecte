//FUNCTION POST 
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
            //STOCKER LE quand la session es valide
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
                email.classList.add("error__input");
                messageError.innerText = "Nom d'utilisateur incorrect.";
                messageError.style.display = "block";
            }

            // Vérifier si le mot de passe est incorrect
            if (response.status === 401 && data.password) {
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
