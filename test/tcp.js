const TCPClient = require('../tcp/client');
const fs = require('fs');
let text = fs.readFileSync(__dirname+'\\..\\test\\test.txt', {encoding:'utf-8'});
let json = fs.readFileSync(__dirname+'\\..\\test\\test.json', {encoding:'utf-8'});
let xml = fs.readFileSync(__dirname+'\\..\\test\\test.xml', {encoding:'utf-8'});

let tcp = new TCPClient();

tcp.send(text).then((data) => {
    console.log(Buffer.concat(data).toString());
});
tcp = new TCPClient();
tcp.send(json).then((data) => {
    console.log(Buffer.concat(data).toString());
});
tcp = new TCPClient();
tcp.send(xml).then((data) => {
    console.log(Buffer.concat(data).toString());
})
