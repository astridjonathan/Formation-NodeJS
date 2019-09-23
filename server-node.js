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
/**
 * http.createServer([options][, requestlistener = request and response])
 * statusCode = 200 => code de succes
 * */
const server = http.createServer((req, res) => {
    res.statusCode= 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World 4.0 !\n');
});
/***
 *
 * **/
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log('Press CTRL-C to stop\n');
});
