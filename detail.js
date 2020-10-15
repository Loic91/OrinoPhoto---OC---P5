let params = new URLSearchParams(window.location.search);
let id = params.get('produit') //Permet d'extraire l'id de la caméra que nous voulons

const produits = async function(url, id) {
    const response = await fetch(url + id)
    return await response.json();

};

const displayProduct = async function() {
    const data = await produits('http://localhost:3000/api/cameras/', id)
    // const data = await produits('https://oc-p5-api.herokuapp.com/api/cameras/', id)

    const article = document.querySelector("article");
    chooseLense(article, data.lenses);
    addToCart(article, data);
    

    affichage(data); //La fonction "affichage" est appelée avec "data" en paramètre 

    console.log(data)
};

function affichage(response) {
    const image = response.imageUrl;
    const name = response.name;
    const description = response.description;
    const price = response.price;
            
    const detail = document.querySelector('.container')
    detail.innerHTML = 
    `
        <div class="card mb-3">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text"><small class="text-muted">${price / 100}€</small></p>
            </div>
        </div>
    `
}

    //Personnalisation du produit
    function chooseLense(parent, productLenses) {
    // Crée liste déroulante
    const label = document.getElementById('label');
    const select = document.getElementById('select');  
    label.setAttribute("for", "lenses-list"); //La méthode "setAttribute()" ajoute l'attribut spécifié (element) à un élément (lenses-list) et lui donne la valeur spécifiée. https://www.w3schools.com/jsref/met_element_setattribute.asp
    label.textContent = "Lentilles disponibles : ";
    select.id = "lenses-list"; //"Element.id" est un string. La propriété "Element.id" représente l'identifiant de l'élément, reflétant l'idée global de l'attribut. Ici, "lenses-list" devient l'identifiant de l'élément "select". 
  
    parent.appendChild(label).appendChild(select); 
    
    // Ici on ajoute "label" et "select" comme nouveaux fils de "parent". 
  
    // Crée une balise option pour chaque lentille
    productLenses.forEach (function(optionLense) {  //"forEach" execute la fonction callback (optionLense) pour appeler les éléments du tableau. 
      const option = document.createElement("option");
      option.value = optionLense; //La propriété "value" définit ou renvoie la valeur de l'attribut "value" d'un champ de texte. La propriété "value" contient la valeur par défaut OU la valeur saisie par un utilisateur (ou une valeur définie par un script). https://www.w3schools.com/jsref/prop_text_value.asp
      option.textContent = optionLense; //Ici "textContent" représente le contenu des éléments du tableau en format texte.   
      select.appendChild(option); //On ajoute "option" comme fils de "select"
    });
};
//Ajoute le produit au panier
function addToCart(parent, response) {
    //Crée le bouton d'envoie du produit
    const btn = document.createElement("button");
    const div = document.createElement("div"); 
    btn.textContent = "Ajouter au panier";
    div.classList.add("add-to-cart"); //"classList" permet, grâce à "add", de nommer la "div" nouvellement créée en classe CSS "add-to-cart" pour contenir "button". https://www.w3schools.com/jsref/prop_element_classlist.asp
    parent.appendChild(div).appendChild(btn); //On ajoute "div" et "btn" comme nouveau fils de "parent"

    //Assigne la valeur à envoyer à localStorage
    const product = {
        id: response._id,
        name: response.name,
        price: response.price,
        image: response.imageUrl,
        quantity: 1,
    };
    //Envoie la valeur à localStorage après le clique
    btn.addEventListener("click", function() { //Ici on passe une fonction anonyme au gestionnaire d'événement "addEventListener" qui va l'exécuter dès le déclenchement de l'évènement. 
    //A SAVOIR : On utilise les fonctions anonymes lorsqu’on n’a pas besoin d’appeler notre fonction par son nom c’est-à-dire lorsque le code de notre fonction n’est appelé qu’à un endroit dans notre script et n’est pas réutilisé. https://www.pierre-giraud.com/javascript-apprendre-coder-cours/fonction-anonyme-auto-invoquee-recursive/
        //Récupère le panier localStorage
        let panier = JSON.parse(localStorage.getItem("panier")); //La méthode JSON.parse() analyse une chaîne de caractère JSON et renvoie un objet JavaScript.https://www.w3schools.com/jsref/jsref_parse_json.asp 
        //La méthode getItem () renvoie la valeur de l'élément d'objet de stockage spécifié. https://www.w3schools.com/JSREF/met_storage_getitem.asp
        if (panier === null){
        panier = {};
    }
    //Ajoute le produit au panier
    if (panier[product.id] !== undefined) {
        panier[product.id].quantity += 1;
    }else{
        panier[product.id] = product;
    }
    //Met à jour le panier localStorage
    localStorage.setItem("panier", JSON.stringify(panier)); //La méthode "setItem()", lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage (Ex: storage.setItem(nomClé, valeurClé);) https://developer.mozilla.org/fr/docs/Web/API/Storage/setItem
    //La méthode "JSON.stringify()" (à l'inverse de la méthode "JSON.parse()") convertit une valeur JavaScript en chaîne JSON.
    btn.classList.add('invisible');
    div.textContent = "Le produit a été ajouté au panier !"
    });

};
displayProduct();


