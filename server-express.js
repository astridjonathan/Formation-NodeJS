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
 *
 */
app.get('/', (req, res) => {
    //res.sendFile(__dirname('/views/html/index.html'));
    res.render('html/index.html');
});
app.get('/contacts', (req, res) => {
    res.render('html/contacts.html');
});
app.get('/contact', (req, res) => {
    res.render('html/contact.html');


});

/**
 * Démarrer l'écoute des connexions sur le port 3000
 */
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

