const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, 'tcp.log')
var net = require('net');
const {TCP_PORT} = require('../config');
const {genTimestamp} = require('../lib/utils')
var server = net.createServer(function (socket) {
    socket.on('listening', ()=>{
        appendLog("Socket is listening.")
        // socket.write("Socket is listening.")
    })
    socket.on('connection', ()=>{
        appendLog("Socket is connected.")
        // socket.write("Socket is connected.")
    })
    socket.on('error', (err)=>{
        appendLog("Socket happen error.\n"+err.stack)
        // socket.write("Socket happen error.\n"+err)
    })
    
    let readSize = 0
    let readStream = []
    let currentLine = []
    socket.on('data', (data) => {
        readStream.push(data);
        currentLine.push(data);
        readSize = socket.bytesRead>>10;
        // socket.write(data.toString())
        // console.log(data.toString())
        // console.log(readSize/1024+'KB');
        appendLog(data.toString())
        socket.write(data.toString())
        if(readSize%1024 < 1){
            console.log(readSize+'KB');
            // appendLog("Messege block:"+Buffer.concat(readStream).toString())
        }
        // if(data.toString()==='\r\n'){
        // if(data.toString().match(new RegExp(/\r*\n/))){
        //     socket.write(Buffer.concat(currentLine).toString())
        //     appendLog(Buffer.concat(currentLine).toString())
        //     appendLog("the size of data is "+readSize);
        //     currentLine = [];
        // }
    })
    socket.on('end', (err)=>{
        let message = `Receive complete. Size ${readSize}KB`;
        console.log(message);
        appendLog(message);
        socket.write(message)
        let block = Buffer.concat(readStream);
        fs.writeFileSync(path.join(__dirname, `test${genTimestamp()}.txt`), block)
        readSize = 0
        readStream = []
        currentLine = []
    })
    socket.write('Socket connected (This message created by write).')
})

server.listen(TCP_PORT, function () {
    appendLog(`Socket server start on port ${TCP_PORT}.`)
    appendLog(server.address());
})

function appendLog(msg){
    let timeString = new Date().toLocaleString()
    if(typeof msg === 'object'){
        try{
            msg = JSON.stringify(msg);
        }catch(err){

        }
    }
    fs.writeFileSync(logFile, `[${timeString}]: ${msg}\n`, {flag:'a'})
}
