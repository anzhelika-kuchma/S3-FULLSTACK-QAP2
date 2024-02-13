const http = require('http');
const routes = require('./routes.js')
 
global.DEBUG = true;
 
const server = http.createServer((req, res) =>{
    if(DEBUG) console.log(req.method+", "+req.url)

    

    let path = './views/'
    if(req.method === 'POST'){
 
    }else{
        switch(req.url){
            case '/':
                path += 'index.html';
                routes.indexPage(path, res);
                break;
            case '/about':
                path += 'about.html';
                routes.aboutPage(path, res);
                break;
            case '/contacts':
                path += 'contacts.html';
                routes.constactsPage(path, res);
                break;
            case '/products':
                path += 'products.html';
                routes.productsPage(path, res);
                break;
            case '/subscribe':
                path += 'subscribe.html';
                routes.subscribePage(path, res);
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