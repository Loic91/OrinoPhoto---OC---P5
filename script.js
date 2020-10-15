//https://levelup.gitconnected.com/combining-api-calls-with-javascript-try-catch-ba1b7b9303a5

const getCams = async function(){ //La fonction "getCams" récupère les données et définit ensuite les informations à afficher dans le "innerHTML".
    try {
        const response = await fetch('http://localhost:3000/api/cameras/')
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        const container = document.querySelector('.container')
        container.innerHTML += `Désolé une erreur s'est produite, veuillez réessayer plus tard !`
     return []   
    }
};

getCams()
.then(function(result) { //On exécute ici, la fonction "getCams" avec le résultat de la promesse et on fait un console.log pour renvoyer les données en toute sécurité.
    // console.log(result);

    for (let i = 0; i < result.length; i++) {    
        const image = result[i].imageUrl;
        const name = result[i].name;
        const description = result[i].description;
        const id = result[i]._id;
        const price = result[i].price;

        const container = document.querySelector('.container')
        container.innerHTML += 
            `
            <div class="card mb-3" /*style="max-width: 940px*/;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <a href="detail.html?produit=${id}"><img src="${image}" class="card-img" alt="..."></a>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <a href="detail.html?produit=${id}"><h5 class="card-title">${name}</h5></a>
                            <p class="card-text">${description}</p>
                            <p class="card-text"><small class="text-muted"><strong>${price / 100}€</strong></small></p>
                            <a class="btn btn-outline-dark" href="detail.html?produit=${id}" role="button">En savoir plus</a>
                        </div>
                    </div>
                </div>
            </div>
            `
    }
})

