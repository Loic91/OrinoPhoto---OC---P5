let params = new URLSearchParams(window.location.search);
let id = params.get('produit') //Permet d'extraire l'id de la caméra que nous voulons

const produits = async function(url, id) {
    const response = await fetch(url + id)
    return await response.json();

};

const displayProduct = async function() {
    const data = await produits('http://localhost:3000/api/cameras/', id)

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
    label.setAttribute("for", "lenses-list"); 
    label.textContent = "Lentilles disponibles : ";
    select.id = "lenses-list"; 
  
    parent.appendChild(label).appendChild(select); 
  
    // Crée une balise option pour chaque lentille
    productLenses.forEach (function(optionLense) { 
    //"forEach" execute la fonction callback (optionLense) pour appeler les éléments du tableau. 
      const option = document.createElement("option");
      option.value = optionLense; 
      option.textContent = optionLense; 
      select.appendChild(option);
    });
};
//Ajoute le produit au panier
function addToCart(parent, response) {
    //Crée le bouton d'envoie du produit
    const btn = document.createElement("button");
    const div = document.createElement("div"); 
    btn.textContent = "Ajouter au panier";
    div.classList.add("add-to-cart"); 
    parent.appendChild(div).appendChild(btn); 

    //Assigne la valeur à envoyer à localStorage
    const product = {
        id: response._id,
        name: response.name,
        price: response.price,
        image: response.imageUrl,
        quantity: 1,
    };
    //Envoie la valeur à localStorage après le clique
    btn.addEventListener("click", function() { 
        //Récupère le panier localStorage
        let panier = JSON.parse(localStorage.getItem("panier")); 
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
    localStorage.setItem("panier", JSON.stringify(panier));
    btn.classList.add('invisible');
    div.textContent = "Le produit a été ajouté au panier !"
    });

};

displayProduct();
