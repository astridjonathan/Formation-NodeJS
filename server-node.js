/**
 * Importer le module HTTP:
 *
 * Permet de gérer les opérations HTTP
 * @type{module:http}
 * on va sur requite on tape ALT+Enter
 **/

const http = require('http');

/**
 * Déclarer notre hOTE (url du serveur web)
 *et son port (port: http)
 **/
const hostname = '127.0.0.1';
const port = 3000;

/** Permet d'importer le module 'url'
 * qui permet de lire l'url et ses données
* @type{module:url}
*
**/
const url = require('url');

/** Importe le module 'fs'
 * qui permet d'accéder au système de fichier du pc
 * @type{module:fs}
 *
 **/
const fs = require ('fs');

/**
 * http.createServer([options][, requestlistener = request and response])
 * statusCode = 200 => code de succes
 * */
const server = http.createServer((req, res) => {
    let path=url.parse(req.url).pathname;
    console.log(path);
    console.log(__dirname);

    switch (path)
        {
            case ('/') :
                {
                    fs.readFile(__dirname + '/views/html/index.html', (err , data)=>{
                        /**
                         * le contenu de ma fonciton ne sera exécuté que lorque nodeJS aura fini
                         * la lecture de mon fichier
                         *
                         * data contient des données de ma page html
                         * */
                        // En cas d'erreur je l'affiche dans ma console
                        if (err) console.log(err);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html; charset="utf-8');
                        res.end(data);
                    }); // de fs.readFile



                    break;
                }
            case ('/contacts'):
                {
                    fs.readFile(__dirname + '/views/html/contacts.html', (err , data)=>{


                        if (err) console.log(err);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html; charset="utf-8');
                        res.end(data);
                    }); // de fs.readFile
                    break;
                }
            case ('/contact'):
            {
                let params= url.parse(req.url, true).query;
                let firstname = params.firstname || 'Anonymous';
                let lastname = params.lastname || '';

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html; charset="utf-8');
                res.end(`
                    <html><body><h1>Mon contact : </h1></body></html>
                    `);
                break;
            }
            default :
                {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset="utf-8');
                    res.end(`
                    <html><body><h1>Oupsss Erreur 404</h1></body></html>
                    `);
                    break;
                }
        }

});
/***
 *
 * **/
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log('Press CTRL-C to stop\n');
});
