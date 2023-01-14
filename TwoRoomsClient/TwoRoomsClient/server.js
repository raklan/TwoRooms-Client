var http = require('http');
const url = require('url');
const fs = require('fs');
const lookup = require('mime-types').lookup;
var port = 4000;

const server = http.createServer(function (req, res) {
    let parsedUrl = url.parse(req.url, true);

    let path = parsedUrl.path.replace(/^\/+|\/+$/g, "");

    if (path === "") {
        path = "index.html";
    }

    console.log(`Requesting path ${path}`);

    let file = __dirname + "/src/" + path;

    fs.readFile(file, function (err, content) {
        if (err) {
            console.log(`File Not Found: ${file}`);
            res.writeHead(404);
            res.end();
        }
        else {
            console.log(`Returning ${path}`);

            res.setHeader("X-Content-Type-Options", "nosniff");

            //Determine file type and put it in the header
            let mimeType = lookup(path);
            res.writeHead(200, { 'Content-Type': mimeType });

            res.end(content);
        }
    });
});

server.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});