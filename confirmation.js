const orderInformation = window.location.search.substring(1).split("&"); //"window.location.search" contient la chaîne des paramètres de l'url qu'on lui a passé en ligne 242 de la page panier.js. Il permet d'envoyer une chaine de données au serveur.https://developer.mozilla.org/fr/docs/Web/API/window/location
//La méthode "substring()" extrait des caractères de la chaîne courante à partir d'un indiceA jusqu'à indiceB. Si indiceB est omis, "substring" effectuera l'extraction des caractères jusqu'à la fin de la chaîne. (comme c'est le cas ici).https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/substring
//La méthode "split()" est utilisée pour diviser une chaîne en un tableau de sous-chaînes et renvoie le nouveau tableau. https://www.w3schools.com/jsref/jsref_split.asp
//Le fait d'ajouter un "ET binaire (&)" à la méthode "split()" permet de rendre visible les valeurs du tableau après le fractionnement. https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_split
const orderId = orderInformation[0].replace("id=", ""); //La méthode "replace()" recherche dans une chaîne une valeur spécifiée, ou une expression régulière, et renvoie une nouvelle chaîne dans laquelle les valeurs spécifiées sont remplacées.
//Dans notre cas, ici nous voulons retirer l'affichage des caractères "id=", "price=" et "user=". Nous les remplaçons par du texte vide.
const totalPrice = orderInformation[1].replace("price=", "");
const userName = orderInformation[2].replace("user=", "");

console.log((document.querySelector(".user").textContent += " " + userName));

document.querySelector(".order-id").textContent += " " + orderId;
document.querySelector(".price").textContent += " " + totalPrice;