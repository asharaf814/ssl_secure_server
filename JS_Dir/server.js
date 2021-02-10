"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var https = require("https");
var http = require("http");
var path = require("path");
var fs = require("fs");
var app = express();
var basePath = path.join(__dirname, '../certs/');
var keyOne = fs.readFileSync(basePath + "/server.key");
var certOne = fs.readFileSync(basePath + "/server.crt");
var httpsBaseUrl = 'https://localhost:';
var serverType = 'http';
var port = 3000;
var options;
{ }
process.argv.forEach(function (args) {
    var argument = parseInt(args);
    if (argument) {
        port = parseInt(args);
        console.log('port set at', port);
    }
    if (args === 'https' || args === 'http') {
        serverType = args;
    }
});
app.get('/', function (req, res) {
    if (JSON.stringify(options)) {
        res.send("Your connection is Secured Using SSL \n Please Reach to https://localhost:" + port + "/download to download the Cert \n Please reach at https://localhost:4000/listCertDetails for Cert Details");
    }
    else {
        res.send("your connection is insecure!!!!");
    }
});
app.get('/listCertDetails', function (req, res) {
    listCertDetails(req, res);
});
app.get('/download/:fileName', function (req, res) {
    download(req, res);
});
if (serverType === 'https') {
    options = {
        "key": [keyOne],
        "cert": [certOne]
    };
    https.createServer(options, app).listen(port, function () {
        console.log("Secured Server is running at " + httpsBaseUrl + port);
    });
}
else {
    http.createServer(app).listen(port, function () {
        console.log("Server is running at http://localhost:" + port);
    });
}
var download = function (req, res) {
    if (JSON.stringify(options)) {
        console.log("File Downloading", req.params.fileName);
        var filePath = basePath;
        var fileName = req.params.fileName;
        console.log(filePath + fileName);
        res.download(filePath + fileName, fileName);
    }
    else {
        res.status(403).send('you cannot acces the file');
    }
};
var listCertDetails = function (req, res) {
    if (JSON.stringify(options)) {
        fs.readdir(basePath, function (err, certFiles) {
            var certFilesArray = [];
            certFiles.forEach(function (certFle) {
                certFilesArray.push({
                    name: certFle,
                    downloadLink: "" + httpsBaseUrl + port + "/download/" + certFle,
                });
            });
            res.send(certFilesArray);
        });
    }
    else {
        res.status(403).send('you cannot acces the endpoint');
    }
};
