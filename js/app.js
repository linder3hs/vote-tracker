const products = document.querySelectorAll(".product");
const btnRegisterVote = document.querySelector("#btn-register-vote");

let selectedItem = null;

for (let product of products) {
  product.addEventListener("click", function () {
    // primero debemos reiniciar los botones, es decir quitarle el border
    for (let item of products) {
      // va a buscar y eliminar la clase selected del div
      item.classList.remove("selected");
    }

    // va a agregar la clase selected al div
    product.classList.add("selected");

    selectedItem = product.dataset.item;

    btnRegisterVote.classList.remove("disabled");
  });
}
