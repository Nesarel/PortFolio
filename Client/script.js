/*----------------------------------------------------------------------------*/
/*--------------------------METHODE DE BASE-----------------------------------*/
/*----------------------------------------------------------------------------*/


// fetch('http://localhost:3000/')
// .then(res => res.json())
// .then(data => console.log(data))


// async function test(url){
//     const response = await getAPI(url);
//     const idUser = [];
//     for (const user of response) {

//         idUser.push(user.user_id);

//     }
//     console.log(idUser);
// }

// function postData (data, user_id){

//     fetch('http://localhost:3000', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'  
         
//     },
//     body: JSON.stringify({id: "10", data: "test", user_id: "TEST"})
//     })
//     .then(res => res.json())
//     .then(res => console.log(res));
// }

/*----------------------------------------------------------------------------*/
/*--------------------------------TEST----------------------------------------*/
/*----------------------------------------------------------------------------*/


// async function postData (data, user_id, url){
//     const res = await getAPI(url);

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'  
         
//       },
//       body: JSON.stringify({data: data, user_id: user_id})
//     })

//     console.log(res);

// }


/*----------------------------------------------------------------------------*/
/*--------------------------MA METHODE DE FETCH-------------------------------*/
/*----------------------------------------------------------------------------*/


const api = 'http://localhost:3000/template';
const list = document.querySelector('ul');
const buttonAdd = document.getElementById('post_add_btn');
let tabTemplate = [];


/**
 * getApi permet de récuperer les données d'une BDD et de la retourner en .json(API)
 * 
 * @param {string} url 
 * @returns api.json
 */
async function getAPI(url) {
    const res = await fetch(url);
    const data = await res.json();
    tabTemplate = data;
    displayData(tabTemplate);
}

function displayData(tabData){
    console.log(tabData);
}

getAPI(api);

/**
 * postData permet d'effectuer un post avec un contenu dans un body pour l'insérer dans la BDD
 * 
 * @param {string} title 
 * @param {string} data 
 * @param {string} user_id 
 * @param {string} token
 */
function postData (title, data, user_id, token){
    body: JSON.stringify({title: title, data: data, user_id: user_id, token: token})
}

/* Effectue une action en fonction de l'élément qu'on à cliqué dans la fenêtre du navigateur ! */
window.onclick = async e => {


    /* Si l'élément cliqué possède la class add, alors faire action ci-dessou */
    if(e.target.classList.contains('add')){

        // Execute la fonction addTemplate
        addTemplate();

    }

    /* Si l'élément cliqué possède la class save, alors faire action ci-dessou */
    if(e.target.classList.contains('save')){
        const li = e.target.parentElement
        // const title = li.querySelector('h3').innerText
        // const template = {title, body}
        // tabTemplate = [template,...template]
        // window.localStorage.setItem('posts', JSON.stringify(posts))

        // Retire l'attribut contentEditable qui permet de  modifier le titre
        li.querySelector('h3').removeAttribute('contentEditable')

        // efface le bouton save
        e.target.remove()
    }

    /* Si l'élément cliqué possède la class delete, alors faire action ci-dessou */
    if(e.target.classList.contains('delete')){

        // Supprime le <li> est son contenu
        e.target.parentElement.remove();

        /*posts = posts.filter(function( obj ) {
            const li = e.target.parentElement;
        
            return obj.title !=  li.querySelector('h2').innerHTML;
        });
        window.localStorage.setItem('posts', JSON.stringify(posts));*/
    }

    // try {     
    //     const response = await fetch(api, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'     
    //         },
    //         // postData();
    //         body: JSON.stringify({data: "thirdTest", user_id: "thirdTest"})
    //     });
    //     console.log('Completed!', response);
    // } 
    // catch(err) {
    //     console.error(`Error: ${err}`);
    // }
};

/**
 * Créer un template dans le navigateur.
 * 
 * Possède un titre qui peut être modifier
 * Possède une image ou icone
 * Possède un bouton remove
 * Possède un bouton save 
 */
function addTemplate (){
    list.innerHTML = `
    <li><h3 contentEditable>title</h3>
    <img src="https://picsum.photos/200">

    <button class='delete btn'>Remove</button>
    <button class='save btn'>💾</button></li>` +  list.innerHTML
}

function postTemplate(title, UID){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "title": title,
    "data": "@",
    "user_id": UID,
    "token": "1342dzqzd34232342678987654"
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3000/template", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function generateUIDToken(){
    const UID = Math.random();
    window.localStorage.setItem("idMachine", UID)
}

// generateUIDToken();
const idMachine = window.localStorage.getItem("idMachine");
postTemplate("Titre", idMachine);