
/////////////////////////FERMER ET OUVRIR MODALE////////////////////////////////////////////////

//function pour FERMER ET OUVRIR la fenetre popup Gallery #POPUP
const openEdition = document.querySelectorAll(".btn__modifier")
const closeEdition = document.querySelector(".close")
const popup = document.getElementById("popup")

openEdition.forEach(element => {
    element.addEventListener("click", () => {
    popup.style.display = "flex"
    })
})

closeEdition.addEventListener("click", () => {
    popup.style.display = "none"
    //Code pour recharger la page a la fermeture
    //window.location.reload()
})

//Evenement pour faire disparaitre le popup au CLICK DEHORS DE
//LA MODALE popup__container
popup.addEventListener("click", (e) => {
    //console.log(e.target.className)
    if (e.target.classList == "popup-hidden") {
        popup.style.display = "none"
        //Code pour recharger la page a la fermeture
        window.location.reload()
    }
})
/*function pour faire disparetre et aparaitre un element avec la propiete toggle 
openEdition.addEventListener("click", togglePopup)
closeEdition.addEventListener("click", togglePopup)

function togglePopup() {
    const popup = document.getElementById("popup")
    popup.classList.toggle("popup-hidden")
    
}*/











