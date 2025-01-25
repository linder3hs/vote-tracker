const btnRegisterVote = document.querySelector("#btn-register-vote");
const voteForm = document.getElementById("vote-form");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const productsContainer = document.getElementById("products-container");
const btnRefresh = document.getElementById("btn-refresh");
let selectedItem = null;

function getRandomProducts(count = 3) {
  // ...productsList => creando una copia de la lista
  const shuffled = [...productsList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function setToolTip() {
  const products = document.querySelectorAll(".product");
  for (let product of products) {
    // agregamos un tooltip a cada div
    addTooltipToDiv(product);

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
}

function renderProducts() {
  // esta funcion retorna 3 productos al azar
  const randomProducts = getRandomProducts();
  productsContainer.innerHTML = "";
  // iteramos la lista de productos
  for (let randomProduct of randomProducts) {
    // luego creamos la ui
    const productContainer = document.createElement("div");
    productContainer.classList.add("product");
    productContainer.dataset.item = randomProduct.name; // data-item
    productContainer.dataset.title = randomProduct.name;
    productContainer.dataset.description = randomProduct.description;

    const productImage = document.createElement("img");
    productImage.alt = randomProduct.name;
    productImage.src = "./images/" + randomProduct.image_file;

    productContainer.appendChild(productImage);
    productsContainer.appendChild(productContainer);
  }
  setToolTip();
}

renderProducts();

btnRefresh.addEventListener("click", renderProducts);
function addTooltipToDiv(product) {
  const description = product.dataset.description;
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = description;

  product.appendChild(tooltip);
}

function getCurrentSelectedProduct() {
  const products = document.querySelectorAll(".product");

  for (let product of products) {
    if (product.classList.contains("selected")) {
      return product;
    }
  }
  return null;
}

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function createContentModal(product) {
  // esto sirve para limpiar el contenido dentro del modal y evitar duplicados
  modal.innerHTML = "";
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalImg = document.createElement("img");
  modalImg.src = product.image;

  const title = document.createElement("h2");
  title.textContent = product.title;

  const description = document.createElement("p");
  description.textContent = product.description;

  const voteQty = document.createElement("p");
  voteQty.textContent = "Cantidad de votos: 0";
  voteQty.classList.add("text-quantity");

  const btnContinue = document.createElement("button");
  btnContinue.textContent = "Continuar";
  btnContinue.classList.add("btn-modal");
  btnContinue.addEventListener("click", continueVote);

  const btnClose = document.createElement("button");
  btnClose.textContent = "Cerrar";
  btnClose.classList.add("btn-modal");

  btnClose.addEventListener("click", closeModal);

  modalContent.appendChild(modalImg);
  modalContent.appendChild(title);
  modalContent.appendChild(description);
  modalContent.appendChild(voteQty);
  modalContent.appendChild(btnClose);
  modalContent.appendChild(btnContinue);

  modal.appendChild(modalContent);
}

function continueVote() {
  closeModal();
  renderProducts();
}

voteForm.addEventListener("submit", function (event) {
  // Paso1: es evitar que el formulario recargue la pagina
  event.preventDefault();

  const currentSelectedProduct = getCurrentSelectedProduct();
  const title = currentSelectedProduct.dataset.title;

  const searchedProduct = productsList.find(
    (product) => product.name === title
  );

  /**
   * Primero vamos a verificar que el producto no exista en la lista de productos que es la variable voteProducts
   */
  const searchProductInVoteProducts = voteProducts.find(
    (voteProduct) => voteProduct.name === title
  );

  openModal();

  createContentModal({
    image: "./images/" + searchedProduct.image_file,
    title: title,
    description: currentSelectedProduct.dataset.description,
  });

  const textQueantity = document.querySelector(".text-quantity");

  // si la condicion se cumple la funcion find nos retorna un elemento, pero si no retorna undefined
  // undefined -> creamos el producto en localStorage
  // object -> actualizamos la cantidad de votos
  if (searchProductInVoteProducts) {
    // actualizamos el elemento
    searchProductInVoteProducts.vote_quantity++;
    // vamos a buscar ese elemento y cambiarle el texto
    textQueantity.textContent =
      "Cantidad de votos: " + searchProductInVoteProducts.vote_quantity;
  } else {
    // debemos crear el producto
    const newProduct = new Product(
      searchedProduct.name,
      searchedProduct.year,
      searchedProduct.description,
      searchedProduct.image_file,
      1
    );
    // vamos a buscar ese elemento y cambiarle el texto
    voteProducts.push(newProduct);
    textQueantity.textContent = "Cantidad de votos: 1";
  }
  localStorage.setItem("products", JSON.stringify(voteProducts));
});
