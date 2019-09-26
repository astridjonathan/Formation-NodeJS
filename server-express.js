/**
 * Mise en Place de notre serveur
 * NodeJS grâce au Framework Express.
 * @type {createApplication}
 */
const express = require('express');
const app = express();
const port = 3000;
/**
 * Importer le package 'nunjucks'
 * https://mozilla.github.io/nunjucks/getting-started.html
 * */
const nunjucks = require('nunjucks');

nunjucks.configure('views/', {
    autoescape: true,
    express: app
});

/**
 * Importer le package 'lowdb'
 * https://www.npmjs.com/package/lowdb
 *-------------------------------------------
 * Il nous permettra de stocketr et manipuler des données dans un fichier au format json
 */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db/contacts.json');
const db = low(adapter);

/**
 * Importer le package 'body-parser'
 * https://www.npmjs.com/package/body-parser
 *-------------------------------------------
 *Pour récupérer les données POST ce qui nous permettra de manipuler
 * les données POST de la requete
 */
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    //res.sendFile(__dirname('/views/html/index.html'));
    res.render('html/index.html');
});
app.get('/contacts', (req, res) => {

    //Récupérer la liste des contacts
    const contactsDb = db.get('contacts').value();

    res.render('html/contacts.html', {
        contacts: contactsDb
    });
});
app.get('/contact', (req, res) => {
    res.render('html/contact.html');
});
app.get('/ajouterUnContact', (req, res) => {
    res.render('html/ajouterUnContact.html');
});

app.post('/ajouterUnContact', (req, res) => {
    /**
     * Lors de la soumission du formulaire avec ma
     * methode POST, c'est cette fonction qui sera
     * exécutée
     * **/

    const contact = req.body;
    //on ajoute le nouveau contact dans le fichier json
    db.get('contacts')
       .push(contact)
       .write();
    //on redirige l'utilisateur sur les contacts
    res.redirect('/contact');

});
app.get('/login', (req, res) => {
    res.render('html/login.html');
});

/**
 * Démarrer l'écoute des connexions sur le port 3000
 */
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

