


/////////////////////////FERMER ET OUVRIR MODALE////////////////////////////////////////////////

//function pour FERMER ET OUVRIR la fenetre popup Gallery #POPUP
const openEdition = document.querySelector(".btn__modifier")
const closeEdition = document.querySelector(".close")
const popup = document.getElementById("popup")

openEdition.addEventListener("click", () => {
    popup.style.display = "flex"
})
closeEdition.addEventListener("click", () => {
    popup.style.display = "none"
})

//Evenemen pour faire disparaitre le popup au CLICK DEHORS DE
//LA MODALE popup__container
popup.addEventListener("click", (e) => {
    //console.log(e.target.className)
    if (e.target.classList == "popup-hidden") {
        popup.style.display = "none"
    }
})
/*function pour faire disparetre et aparaitre un element avec la propiete toggle 
openEdition.addEventListener("click", togglePopup)
closeEdition.addEventListener("click", togglePopup)

function togglePopup() {
    const popup = document.getElementById("popup")
    popup.classList.toggle("popup-hidden")
    
}*/











