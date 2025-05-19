const openModal = document.querySelectorAll(".gallery img");
const closeModal = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const imgModal = modal.querySelector("img");
const body = document.querySelector("body");

const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"))
}

openModal.forEach((img) => {
    img.addEventListener("click", () => {
        imgModal.src = img.src;
        imgModal.alt = img.alt;
        body.style.overflow = 'hidden'; 
        toggleModal();
    });
});

closeModal.addEventListener("click", () => {
    toggleModal();
    body.style.overflow = ''; 
})

