const http = require('http'),
    url = require('url'),
    fs = require ('fs');

http.createServer((request, response) =>{
    let addr = request.url,
    q = new URL(addr, 'http://localhost:8080' );

    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ', + new Date() + '\n\n', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Added to log!')
        }
    })

    if (q.pathname.includes('documentation.html')) {
        filePath = (__dirname + '/documentation.html');
    } else {
        filePath = 'index.html';
    }

}).listen(8080);
console.log("It\'s working! It\'s working!")

