// Vamos a crear una lista vacia donde vamos a almacenar la data guardada
const dataFromLocalStorage = localStorage.getItem("products");
// operador ternario valor = condicion ? true : false
const voteProducts =
  dataFromLocalStorage === null ? [] : JSON.parse(dataFromLocalStorage);

// Function constructora
function Product(name, year, description, image_file, vote_quantity = 0) {
  this.name = name;
  this.year = year;
  this.description = description;
  this.image_file = image_file;
  this.vote_quantity = vote_quantity;
}

// para aumentar en 1 la cantidad
Product.prototype.addQuantity = function () {
  this.vote_quantity++;
};
