const node_openssl = require('node-openssl-cert');
const openssl = new node_openssl();

var privKey; 
var a = '3000';
console.log(parseInt(a));

generateRSAPrivateKey = function(){
    let promise = new Promise((resolve, reject) => {
        openssl.generateRSAPrivateKey({}, function(err, key, cmd) {
            console.log(cmd);
            console.log(key);
            privKey = key;
            resolve();
        });
    })
    return promise;
} 
gen = async function () {
    let crt = await generateRSAPrivateKey();
    console.log('got',crt,privKey) 
    return privKey;
}


module.exports = async function () {
    let crt = await generateRSAPrivateKey();
    console.log('got',crt,privKey) 
    return privKey;   
}