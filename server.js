const http = require('http');
const path = require('path');
const fs = require('fs');

const routes = require('./routes.js');

const EventEmitter = require('events');
const myEmitter = new EventEmitter();
const statusCodeEmitter = new EventEmitter();

global.DEBUG = true;

// Event listener to capture HTTP status codes and write messages to the console
statusCodeEmitter.on('statusCode', (statusCode) => {
    console.log(`HTTP Status Code: ${statusCode}`);
});

/* This event listener serves as a crucial component in a web application's logging system. 
Whenever a route event occurs, such as a user navigating to a specific page or endpoint 
within the application, this listener captures that event and generates a log entry. 
These log entries are then stored in a log file, providing a comprehensive record of 
which routes have been accessed and when.*/
myEmitter.on('route', (url, statusCode) => {
    const d = new Date();
    if (DEBUG) console.log(`Route Event on: ${url} at ${d}`);
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
        fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', 'route.log'), `Route Event on: ${url} at ${d}\n`, (error) => {
        if (error) throw error;
    });

    // Emit custom event to capture HTTP status codes
    statusCodeEmitter.emit('statusCode', statusCode);
});

const server = http.createServer((req, res) => {
    if (DEBUG) console.log('Request Url: ', req.url);
    let filePath = './views/';
    let statusCode = 200;

    if (req.method === 'POST') {

    } else {
        switch (req.url) {
            case '/':
                filePath += 'index.html';
                routes.indexPage(filePath, res);
                break;
            case '/about':
                filePath += 'about.html';
                routes.aboutPage(filePath, res);
                break;
            case '/contacts':
                filePath += 'contacts.html';
                routes.contactsPage(filePath, res);
                break;
            case '/products':
                filePath += 'products.html';
                routes.productsPage(filePath, res);
                break;
            case '/subscribe':
                filePath += 'subscribe.html';
                routes.subscribePage(filePath, res);
                break;
            default:
                console.log('404 Not Found');
                statusCode = 404;
                break;
        }
    }

    myEmitter.emit('route', req.url, statusCode);
});

server.listen(3000, () => {
    console.log('Server is running...');
});
