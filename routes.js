const fs = require('fs');

function indexPage(path, res){
    fetchFile(path, res);
}

function aboutPage(path, res){
    fetchFile(path, res);
}

function constactsPage(path, res){
    fetchFile(path, res);
}

function productsPage(path, res){
    fetchFile(path, res);
}

function subscribePage(path, res){
    fetchFile(path, res);
}

function fetchFile(fileName, res){
    fs.readFile(fileName, (err, data) => {
        if (err){
            res.writeHead(500, {'Content-Type':'text/plain'});
            res.end('500 Internal Server Error');
        } else {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data, 'utf-8');
        }
    });
};

module.exports = {
    indexPage,
    aboutPage,
    constactsPage,
    productsPage,
    subscribePage,
}

