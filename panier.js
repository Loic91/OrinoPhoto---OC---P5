const cart = document.querySelector("#cart"); // Récupère la section du panier
const cartTotal = document.getElementById("cart-total"); //Récupère le h3 pour le prix total
const form = document.querySelector("form"); // Récupère le formulaire

const cartInformation = {
  contact: {},
  products: [],
};
/* Stock le prix total */
let totalPrice = 0;

// Affiche le/les produit(s) du panier.
const displayCart = async function () {
  const cartItems = JSON.parse(localStorage.getItem("panier")); //La méthode JSON.parse() analyse une chaîne de caractère JSON et renvoie un objet JavaScript.https://www.w3schools.com/jsref/jsref_parse_json.asp 
  //La méthode getItem () renvoie la valeur de l'élément d'objet de stockage spécifié. https://www.w3schools.com/JSREF/met_storage_getitem.asp


  if (Object.keys(cartItems).length > 0) { //De la même façon que la boucle "for...in", la méthode Object.keys() renvoie un tableau contenant les noms des propriétés propres à un objet (ici, l'objet est "cartItems". Il a récupéré la valeur du panier en javascript en ligne 14)
    for (let i = 0; i < Object.keys(cartItems).length; i++) {
      // Pour chaque article du panier
      const itemId = Object.keys(cartItems)[i];
      const product = await getItem(itemId); // Récupère les informations du produit
      const camId = product._id; // Stocke l'id du produit
      const camName = product.name; // Stocke le nom du produit
      const camPrice = product.price / 100; // Stocke le prix du produit
      const camImg = product.imageUrl; // Stocke l'image du produit
      const camQuantity = cartItems[itemId].quantity;
      cartInformation.products.push(camId); // Envoie l'ID du produit au tableau "products" de "cartInformation" (ligne 7)
      //La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
      renderCart(camName, camPrice, camImg, camQuantity); // Fourni l'affichage du/des produits du panier

      const remove = document.querySelectorAll(".remove")[i];
      const article = document.querySelectorAll("article")[i];
      const iconLeft = document.querySelectorAll(".fa-arrow-circle-left")[i];
      const iconRight = document.querySelectorAll(".fa-arrow-circle-right")[i];
      iconLeft.style.fontSize = "16px";
      iconRight.style.fontSize = "16px";
      deleteCart(remove, article, itemId);
      decrementItem(iconLeft, article, itemId); // appel de la fonction décrémentation avec la flèche de gauche
      incrementItem(iconRight, article, itemId); // appel de la fonction incrémentation avec la flèche de droite
    }
  } else {
    cart.textContent = "Votre panier est vide.";
    form.classList.add("invisible");
  }
};
// Récupère élément dans localStorage
const getItem = async (productId) => {
  const response = await fetch(
      // "https://oc-p5-api.herokuapp.com/api/cameras/" + productId
    "http://localhost:3000/api/cameras/" + productId
  );
  return await response.json();
};
// Fourni l'affichage du/des produits du panier
function renderCart(productName, productPrice, imgUrl, productQuantity) {
  /* Affiche article(s) du panier */
  const article = document.createElement("article");
  article.innerHTML = `
  <div class="card mb-3">
    <img src="${imgUrl}" class="card-img-top" alt="...">
    <div class="card-body">
    <div class="product-information>
        <p class="product-title">${productName}</p>
        <p class="price">${productPrice}€</p>
        </div>
    </div>
    <p class="quantity"><i class="fas fa-arrow-circle-left">${productQuantity}</i><i class="fas fa-arrow-circle-right"></i></p>
    <p class="remove ">supprimer</p>
    </div>
    `;
  cart.insertBefore(article, cartTotal); // Insère article avant cartTotal
  totalPrice += productPrice * productQuantity; /* Implémente prix */
  cartTotal.textContent = `Total : ${totalPrice}€`; /* Affiche le prix total */
};
/* Supprime élément du panier sur un clique*/
const deleteCart = function(removeElt, container, productId) {
  removeElt.addEventListener("click", async function() {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    // ); /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true); /* Actualise la page dynamiquement */
  });
};


// décrémente et enlève un produit au panier avec la flèche de gauche
const decrementItem = function(iconLeft, container, productId) {
  iconLeft.addEventListener("click", function() {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity > 1) {
      panier[productId].quantity--;
    } else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier)); //La méthode "setItem()", lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage (Ex: storage.setItem(nomClé, valeurClé);) https://developer.mozilla.org/fr/docs/Web/API/Storage/setItem
    //La méthode "JSON.stringify()" (à l'inverse de la méthode "JSON.parse()") convertit une valeur JavaScript en chaîne JSON.

    /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true);
  });
};


// incremente et rajoute un produit au panier avec la flèche de droite
const incrementItem = function(iconRight, container, productId) {
  iconRight.addEventListener("click", function() {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity >= 1) {
      panier[productId].quantity++;
    } else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    // ); /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true);
  });
};

displayCart();

const containNumber = /[0-9]/;
const regexEmail = /.+@.+\..+/;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;

const isNotEmpty = (function (value) {return value !== "" ? true : false}); // Vérifie que la valeur donnée ne soit pas vide
const isLongEnough = (function (value) {return value.length >= 2 ? true : false}); // Vérifie que la valeur donnée ait assez de caractère
const doNotContainNumber = (function (value) {return !value.match(containNumber) ? true : false}); // Vérifie que la valeur donnée ne possède pas de chiffre
const doNotContainSpecialCharacter = (function (value) {return !value.match(specialCharacter) ? true : false}); // Vérifie que la valeur donnée ne possède pas de symbole
const isValidEmail = (function (value) {return value.match(regexEmail) ? true : false}); // Vérifie que la valeur donnée soit bien dans le format email

const isValidInput = (value) =>
  isNotEmpty(value) &&
  isLongEnough(value) &&
  doNotContainNumber(value) &&
  doNotContainSpecialCharacter(value); // renvoie true si toutes les conditions sont vérifiées

// Récupère les éléments du formulaire
const firstName = form.elements.firstName;
const lastName = form.elements.lastName;
const address = form.elements.address;
const city = form.elements.city;
const email = form.elements.email;
const btn = document.getElementById("submit");

const firstNameErrorMessage = document.getElementById("firstNameErrorMessage");
const lastNameErrorMessage = document.getElementById("lastNameErrorMessage");
const addressErrorMessage = document.getElementById("addressErrorMessage");
const cityErrorMessage = document.getElementById("cityErrorMessage");
const emailErrorMessage = document.getElementById("emailErrorMessage");

//Permet de vérifier les saisies utilisateurs
const formValidate = () => {
  if (isValidInput(firstName.value)) { //La propriété "value" définit ou renvoie la valeur de l'option (la valeur à envoyer au serveur lorsque le formulaire est soumis).
    firstNameErrorMessage.textContent = "";

    if (isValidInput(lastName.value)) {
      lastNameErrorMessage.textContent = "";

      if (isNotEmpty(address.value) && isLongEnough(address.value)) {
        addressErrorMessage.textContent = "";

        if (isValidInput(city.value)) {
          cityErrorMessage.textContent = "";

          if (isValidEmail(email.value)) {
            emailErrorMessage.textContent = "";

            return (cartInformation.contact = {
              // Si toutes les inputs saisies sont valides, renvoie l'objet contact à cartInformation.
              firstName: firstName.value,
              lastName: lastName.value,
              address: address.value,
              city: city.value,
              email: email.value,
            });
          } else {
            emailErrorMessage.textContent =
              "Merci de renseigner votre adresse mail !";
            email.focus(); //La méthode "focus()" est utilisée pour donner le focus à un élément.
            return false;
          }
        } else {
          cityErrorMessage.textContent = "Merci de renseigner votre ville !";
          city.focus();
          return false;
        }
      } else {
        addressErrorMessage.textContent = "Merci de renseigner votre adresse !";
        address.focus();
        return false;
      }
    } else {
      lastNameErrorMessage.textContent = " Merci de renseigner votre nom !";
      lastName.focus();
      return false;
    }
  } else {
    firstNameErrorMessage.textContent = "Merci de renseigner votre prénom !";
    firstName.focus();
    return false;
  }
};
// Envoie données à l'api
const postData = async function(method, url, data) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(data),
  });
  return await response.json();
};

btn.addEventListener("click", async function(e) {
  e.preventDefault();
  console.log("coucou")

  const validForm = formValidate(); // Valide le formulaire
  if (validForm !== false) {
    const response = await postData(
      "POST",
      // "https://oc-p5-api.herokuapp.com/api/cameras/order",/*  */
      "http://localhost:3000/api/cameras/order",
      cartInformation
    ); 
    // Envoie données au serveur
    window.location = `./confirmation.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; // Redirige vers la page de confirmation de commande, et...
    localStorage.removeItem("panier"); //...vide le panier
  }
});

if (!localStorage.getItem("panier")) { 
  // vérifie que la localstorage est vide, si il est vide on cache le formulaire et on insère le texte.
  //Ici on utilise l'opérateur de négation "!", pour vérifier si le navigateur possède bien une donnée enregistrée appelée "panier". Si la donnée existe on la récupère avec "getItem" et on défini le contenu de "textContent".
  cart.textContent = "Votre panier est vide.";
  form.classList.add("invisible");
}
