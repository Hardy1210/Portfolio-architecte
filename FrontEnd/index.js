/////////////////////////////BUTTON DES CATEGORIES///////////////////

/*function pour DEMANDER AU API LES BUTTON DES CATEGORIES Swagger*/
async function getCategorys() {
    try {
        // on recupere les donnes
        const response = await fetch("http://localhost:5678/api/categories")
        // Vérifie si la réponse est correcte
        if (!response.ok) {
            throw new Error('La requête a échoué')
        }
        // Analyse la réponse JSON
        return await response.json()
        // Affiche les données récupérées dans la console
        //let responseJson = response.json()
        //console.log(responseJson)
    } catch (error) {
        // Gère les erreurs potentielles
        console.error("Une erreur s'est produite lors de la récupération des données :", error)
    }
}
//getCategorys();

/*function qu'AFFICHE LES BUTTONS de categorie dans le DOM*/
const ul = document.getElementById("sort")

async function addCategorysButtons() {
    const categorysBtn = await getCategorys()
    //console.log(categorysBtn)
    categorysBtn.forEach(tri => {
        const li = document.createElement("li")
        li.textContent = tri.name
        //on rajout le id pour pouvoir l'utiliser pour faire le tri des images
        li.id = tri.id
        // la class est deja pris en compte
        // car les parametres sont ecris avec le parent
        //li.classList.add("tri")
        ul.appendChild(li)
    })
}
addCategorysButtons()

////FILTRER LES CATEGORIES AU CLICK(pour utilizer la logique on peut utilizER le code depuis l'api)////
async function selectCategory() {
    //ON APPEL LA RECUPERATION DES IMAGES DE LA GALLLERY pour fiaire la gestion de tris
    //absolument a voir a avce la documentation Swagger
    const category = await getWorks()
    //console.log(category)
    const btnCategory = document.querySelectorAll(".tri li")
    for(let i = 0; i < btnCategory.length; i++) {
        btnCategory[i].addEventListener("click", (e) => {
            //on va creer une variable pôur estoquer le resulta de levenement(e)
            //pour l'utilizer pour le tri des images
            const btnCategoryId = e.target.id
            console.log(e.target.id)
            //console.log(btnCategoryId)
            //pour chaque click on elimine les images works
            gallery.innerHTML = ""
            // On va creer la condition pour filtrer
                if (btnCategoryId !== "0") {
                    const filterCategory = category.filter((works) => {
                    return works.categoryId == btnCategoryId
                    })
                    filterCategory.forEach((works) => {
                        //ON APPEL LA FUNCTION QU'ON A CREER AVANT
                        addWorks(works)
                    })
                    } else {
                        //ON APPEL LA FUNCTION  QU'ON A CREER AVANT
                        createWorks() 
                    }
        })
    }
}
selectCategory()

/////////////////////////////GALLERY PRINCIPALE/////////////////////////////////////////

//FUNCTION POUR RECUPERER le tableau de la gallerie sur swagger
async function getWorks() {
    try {
        const responseGallery = await fetch("http://localhost:5678/api/works")
        //verrification si laq repose est correcte
        if (!responseGallery.ok) {
            throw new Error("la requete a echoue")
        }
        //Analiser la reponse
        return await responseGallery.json()
        
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
    }
}
//getWorks()

//CREATION DES ELEMENT POUR HAQUE IMAGE
async function createWorks() {
    const works = await getWorks()
    works.forEach((work) => {
        addWorks(work)
    })
}
createWorks()

//On va CREER LES ELEMENTS DE LA GALLARIE dans le DOM
const gallery = document.querySelector(".gallery")

    function addWorks(work) {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")

        //on va inserer des autres element du tableau sur
        //swagger pour pouvoir les utilize pour le tri
        figure.id = work.categoryId
        img.src = work.imageUrl
        figcaption.textContent = work.title

        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
}
//addWorks()

///////////COMUNICATION AVEC LE POST DE LA REQUET POUR CONNECTION LOG IN//////////////////////////////////////////

// Function qui va a COMUNIQUER AVEC le fichier login.js
//et va a ajouter la class  display block pour faire aparaitre le MOD EDITION
window.addEventListener('load', () => {
    //cette code et originaire du un autre fichier.js por faire la coneccion
    if (sessionStorage.getItem('loggedIn') === "true") {

        const blockEdition = document.querySelectorAll(".block__edition")
        const logout = document.querySelector(".logout")
        const loginUser = document.querySelector(".login")

        logout.style.display = "block";
        loginUser.style.display = "none";
         //attention pour ajouter un class a plusieurs elemts
        //il faut fairla propiete forEach pour que ç soi apliquée
        blockEdition.forEach(function (element) {
            element.classList.add("block")
        })
        logout.addEventListener("click", () => {
            //cette code pour faire la conneccion avec mon autre fichie.js
            sessionStorage.setItem('loggedIn', false)

            //redireccion a la page de login
            window.location.href = 'login.html'
        })
    }
})

///////////////////////////////MODALE/////////////////////////////////////////

//code pour FAIRE APARAITRE ET DISPARAITRE LA MODALE popup__container--add 
const btnAddPhoto = document.querySelector(".btn__ajouter")
const containerPopupAdd = document.querySelector(".popup__container--add")
const popupGalleryContainer = document.querySelector(".popup__container")
//Aux click de la fleche on revient a la gallery popup
const backArrow = document.querySelector(".icons .fa-arrow-left")
//Au click on ferme le popup pour ajouter des photos
const closeAddPhoto = document.querySelector(".icons .fa-xmark")

//Function pour manipuler la modal popup__container--add
function modalAddPhoto() {
    //rediriger au click du button pour ajouter une photo
    btnAddPhoto.addEventListener("click", () => {
        containerPopupAdd.style.display = "block"
        popupGalleryContainer.style.display = "none"
    })
    //Aux click de la fleche on revient a la gallery popup
    backArrow.addEventListener("click", () => {
        containerPopupAdd.style.display = "none"
        popupGalleryContainer.style.display = "block"
    })
    //Au click on ferme le popup pour ajouter des photos
    closeAddPhoto.addEventListener("click", () => {
        popup.style.display = "none"
    })
}
modalAddPhoto()

///////////////////////////////MODALE/////////////////////////////////////////

//EVENEMENT POUR PREVISUALISER l'image qu'on charge dans l'input file
//on va stoque dans des variables les element a utilizer 
const previewImg = document.querySelector(".container__file img")
const iconFile = document.querySelector(".container__file .fa-image")
const labelFile = document.querySelector(".container__file label")
const inputFile = document.querySelector(".container__file input")
const pFile =document.querySelector(".container__file p")

//le code qu'on va faire c'est pour nous permetre la previsualisation
//de limage qu'on charge sur l'input, pour ça on fait  aussi quelques
//parametres pour faire disparaitre les autres elements a l'interieur
//de notre function

// On va ecouter l'evenement sur l'input file
inputFile.addEventListener("change", () => {
    //on va acceder au premiere fichier d'entrée pur le manipumer
    const file = inputFile.files[0]
    if(file) {
        const reader = new FileReader()
        reader.onload = function(e) {
            previewImg.src = e.target.result
            //von disparaitre les qutres elemens 
            previewImg.style.display = "block"
            labelFile.style.display = "none"
            iconFile.style.display = "none"
            pFile.style.display = "none"
        }
        //pour l'ejecution du code
        reader.readAsDataURL(file)
    }
})


//On va CREER UNE LISTE DE CATEGORIES a linterieur de la balise <select>
//qu'on va l'appeler depui l'api
async function categoryModal() {
    const selectCategory = document.querySelector(".popup__container--add select")
    const categorySelect = await getCategorys()
    //por chaque categorie on va creer un valeur "id" et an vcaleur "name"
    categorySelect.forEach(category => {
        const option = document.createElement("option")
        //la option  "id" vient de swagger et pareilment "name"
        option.value = category.id
        option.textContent = category.name
        selectCategory.appendChild(option)
    })
}
categoryModal()

//////////////////////AJOUT(D'IMAGE) ET VERIFICACION DU FORMULAIRE///////////////

//Onva faire un POST pour ajouter une image et L'AFFICHER DANS LA GALLERIE PRINCIPAL
const formModalContainerAdd = document.querySelector(".popup__container--add form")
const formTitle = document.querySelector(".popup__container--add #title")
const formCategory = document.querySelector(".popup__container--add #category")
const formImageInput = document.querySelector(".popup__container--add #imageInput")
//pour utilizzer le token 
const token = sessionStorage.getItem('token')// Obtén el token almacenado en sessionStorage

formModalContainerAdd.addEventListener("submit", (e) => {
    e.preventDefault();

    if (formImageInput.files.length === 0) {
        console.error('No file selected for upload.')
        return;
    }
    const formData = new FormData();
    formData.append('image', formImageInput.files[0])
    formData.append('title', formTitle.value)
    formData.append('category', formCategory.value)

    fetch('http://localhost:5678/api/works', {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json()
            
        } else {
            throw new Error('Error en la solicitud')
        }
    })
    .then(data => {
        console.log("Image ajoutée:", data)
        //On appel cette funcion
        addImageGallery(data);
        addGalleryPopup()
    })
    .catch(error => {
        console.error('Erreur:', error)
    });
});

///////////////////////////////MODALE GALLERY//////////////////////////////////////////

//function pour CREER LA GALLERIE ET L'AJOUTER dans la gallery popup
const galleryPopup = document.querySelector(".popup__gallery")

async function addGalleryPopup() {
    galleryPopup.innerHTML = ""
    const gallery = await getWorks()
    //console.log(gallery)
    gallery.forEach(images => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const trashBtn = document.createElement("button")
        trashBtn.classList.add("trash")
        trashBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        trashBtn.id = images.id
        img.src = images.imageUrl
        //ajouter recement
        img.alt = images.title;
        figure.id = images.categoryId
        figure.appendChild(trashBtn)
        figure.appendChild(img)
        galleryPopup.appendChild(figure)
        
    })
    deleteGalleryPopup()
}

//setInterval(addGalleryPopup, 5000);
//est appeler plus bas dans le code
//addGalleryPopup()

////////////////////////EFFACER LES IMAGES/////////////////////////////////////////////
//function pour effacer les projets DE LA GALLERIE
function deleteGalleryPopup() {
    const deleteGallery = document.querySelectorAll(".trash")
    deleteGallery.forEach(trash => {
        trash.addEventListener("click", async () => {
            const imageId = trash.id
            await deleteImageFromApi(imageId)
            trash.parentElement.remove()
        })
    })
}

// Function pour eliminer les images de la gallerie 
//et que soi prise en compte depui l'API
async function deleteImageFromApi(imageId) {
    const token = sessionStorage.getItem('token')
    if (!token) {
        alert('No token found, please log in.')
        return
    }
    try {
        const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            console.log("Image supprimée avec succès")
            // ACTUALIZE LA MODAL
            //addGalleryPopup()
            removeImageFromGallery(imageId);
        } else {
            console.error("Erreur lors de la suppression de l'image")
        }
    } catch (error) {
        console.error('Erreur lors de la connexion au serveur:', error)
    }
    
}
addGalleryPopup()

//Pour EVITER DES ERREURS SUR LA CONSOLE LORS LA SUPRESION DE L'IMAGE
//ET QUE SOI PRISE EN  COMPTE CORRECTEMENT LA RECHARGE DINAMIQUE DE LA MODAL 
function removeImageFromGallery(imageId) {
    const galleryItem = document.querySelector(`.gallery-item[data-id="${imageId}"]`);
    if (galleryItem) {
        galleryItem.remove();
    }
}















//VERIFICATION si les imput sont remplies  
function verificationInputAddWorks() {
    const formTitle = document.querySelector(".popup__container--add #title")
    const formImageInput = document.querySelector(".popup__container--add #imageInput");
    const btnValidation = document.querySelector(".btn__add--container button")
    const messageSpan = document.querySelector("#imageUpload .error")
    //pour creer une nouvele element dnas la gallery dinamiquement
    const gallery = document.querySelector("#portfolio .gallery")
    
    function validateFields() {
        // Réinitialiser le message d'erreur
        messageSpan.textContent = ''
        messageSpan.classList.remove("error__message")

        // Vérifier si les champs sont vides
        if (formTitle.value === "" || formImageInput.files.length === 0) {
            messageSpan.textContent = 'Veuillez remplir tous les champs.'
            messageSpan.classList.add("error__message");
            btnValidation.style.backgroundColor = "#A7A7A7"
            formTitle.placeholder = "Entrez un titre"
        } else {
            btnValidation.style.backgroundColor = "#1D6154"
        }
    }
    
    // Ajouter l'écouteur d'événements sur les champs de saisie
    formTitle.addEventListener("input", validateFields)
    formImageInput.addEventListener("input", validateFields)
}
verificationInputAddWorks()

//Function pour INTRODUIR LES NOOVELLES IMAGES DANS LA gallerie
//SANS RECHARGER LA PAGE
function addImageGallery(work) {
    const gallery = document.querySelector("#portfolio .gallery");
    const figure = document.createElement("figure");
    figure.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
        `
    gallery.appendChild(figure);
}
