const http = require('http');
const path = require('path');
const fs = require('fs');

const routes = require('./routes.js');

const EventEmitter = require('events');
const myEmitter = new EventEmitter();
 
global.DEBUG = true;

/* This event listener serves as a crucial component in a web application's logging system. 
Whenever a route event occurs, such as a user navigating to a specific page or endpoint 
within the application, this listener captures that event and generates a log entry. 
These log entries are then stored in a log file, providing a comprehensive record of 
which routes have been accessed and when.*/

myEmitter.on('route', (url) => {
    const d = new Date();
    if(DEBUG) console.log(`Route Event on: ${url} at ${d}`);
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', 'route.log'), `Route Event on: ${url} at ${d}\n`, (error) => {
      if(error) throw error;
    });
});
 
const server = http.createServer((req, res) =>{
    if(DEBUG) console.log('Request Url: ', req.url);
    let path = './views/';
    if(req.method === 'POST'){
 
    }else{
        switch(req.url){
            case '/':
                path += 'index.html';
                routes.indexPage(path, res);
                myEmitter.emit('route', path);
                break;
            case '/about':
                path += 'about.html';
                routes.aboutPage(path, res);
                myEmitter.emit('route', path);
                break;
            case '/contacts':
                path += 'contacts.html';
                routes.constactsPage(path, res);
                myEmitter.emit('route', path);
                break;
            case '/products':
                path += 'products.html';
                routes.productsPage(path, res);
                myEmitter.emit('route', path);
                break;
            case '/subscribe':
                path += 'subscribe.html';
                routes.subscribePage(path, res);
                myEmitter.emit('route', path);
                break;
            default:
                console.log('404 Not Found');
                break;
        }
    }

});

server.listen(3000, () => {
    console.log('Server is running...');
});