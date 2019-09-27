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
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/****
 * Importer le package Vcard
 * ***/
const vCardJS = require('vcards-js');
/****
 * Importer le package qrCode
 * ***/
const qrCode = require('qrcode');

/**
 * Permet la génération des vCards
 * @type {{generate: (function(*): {birthday, lastName, note, role, gender, workEmail, formattedName, nameSuffix, source, title, uid, getFormattedString, getMajorVersion, saveToFile, namePrefix, nickname, logo, email, homeFax, homeAddress, homePhone, photo, workFax, workAddress, version, url, firstName, pagerPhone, organization, workUrl, middleName, workPhone, socialUrls, cellPhone})}}
 */



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
app.get('/contact/:id', (req, res) => {
    /***
     * Récupérer le contact ayant l'id passé dans l'url
     ***/
    const contact = db
        .get('contacts')
        .find({ id: req.params.id })
        .value();


    /***
     * Générer une vcard pour le contact
     * puis à partir ce cette vcard un qrcode
     ***/

            const vCard = vCardJS();
            vCard.firstName = contact.prenom;
            vCard.lastName = contact.nom;
            vCard.email = contact.email;
            vCard.cellPhone = contact.tel;

    /***
     * Généreration du qrcode
     ***/
    qrCode.toDataURL(vCard.getFormattedString(), (err, url) => {
        res.render('html/contact.html', {
            contact: contact,
            'qrCodeUrl' : url
        });
    })


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
    contact.id = Date.now().toString();

    //on ajoute le nouveau contact dans le fichier json
    db.get('contacts')
       .push(contact)
       .write();
    //on redirige l'utilisateur sur les contacts
    res.redirect('/contact/' + contact.id );

});


/**
 * On supprime le contact dans le fichier json
 * */
app.get('/contact/:id/delete', (req, res) => {
    db.get('contacts')
        .remove({ id: req.params.id })
        .write();

    res.redirect("/contacts");
});

/**
 * Création d'une api
 * */
app.get('/api/contacts', (req, res) => {
    const contacts = db.get('contacts').value();
    res.status(200).json({
        status: 200,
        method: req.method,
        data: contacts
    });
});


/**
 * Démarrer l'écoute des connexions sur le port 3000
 */
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

