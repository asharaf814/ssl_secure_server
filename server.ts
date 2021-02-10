import * as express from "express";
import * as https from 'https';
import * as http from 'http';
import * as path from 'path';
import * as fs  from 'fs';
import * as certGen from './certProcess'

const app = express(); 
const basePath = path.join(__dirname, '../certs/');

const keyOne = fs.readFileSync(`${basePath}/server.key` );
const certOne = fs.readFileSync(`${basePath}/server.crt`);
const httpsBaseUrl: string = 'https://localhost:'

let serverType: string = 'http'; 
let port: Number = 3000; 
let options: any ; {}

process.argv.forEach((args) => {
    let argument : number = parseInt(args);
    if(argument)
        {
            port = parseInt(args);
            console.log('port set at', port)
        }
    if(args === 'https' || args === 'http')
        {
            serverType = args;
        }    
})


app.get('/', (req: express.Request, res: express.Response) => {

    if(JSON.stringify(options)){
        res.send(`Your connection is Secured Using SSL \n Please Reach to https://localhost:${port}/download to download the Cert \n Please reach at https://localhost:4000/listCertDetails for Cert Details`);
    }else {
        res.send("your connection is insecure!!!!")
    }
});

app.get('/listCertDetails', (req: express.Request, res: express.Response) => {
        listCertDetails(req,res);
});

app.get('/download/:fileName', (req: express.Request, res: express.Response) => {
        download(req,res);
   });

if(serverType=== 'https'){
    options = {
        "key": [keyOne],
        "cert": [certOne]
    }
    https.createServer(options, app).listen(port, () =>{
        console.log(`Secured Server is running at ${httpsBaseUrl}${port}`)
    });
} else {

    http.createServer(app).listen(port,() => {
        console.log(`Server is running at http://localhost:${port}`)
    })
}


const download = (req: express.Request,res: express.Response) => {

    if(JSON.stringify(options)){
       
        console.log("File Downloading" ,req.params.fileName);
        var filePath = basePath; 
        var fileName = req.params.fileName; 
        console.log(filePath+fileName);
        res.download(filePath+fileName, fileName);  
        }
        else {
            res.status(403).send('you cannot acces the file');
        }

}

const listCertDetails = (req: express.Request,res: express.Response) => {
    if(JSON.stringify(options)){
     fs.readdir(basePath, (err, certFiles) => {
         let certFilesArray = [];
         certFiles.forEach((certFle) => {
            certFilesArray.push({
                name: certFle,
                downloadLink: `${httpsBaseUrl}${port}/download/${certFle}`,
            }); 
         });
         res.send(certFilesArray);
     });
    } else {
        res.status(403).send('you cannot acces the endpoint');
    }
}