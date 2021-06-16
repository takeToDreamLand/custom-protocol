/* 引入net模块 */
const net = require("net");
const {TCP_PORT, TCP_IP} = require('../config')
/* 创建TCP客户端 */
class TCPClients{
    constructor(ip, port){
        this.client = net.Socket();
        this.port = port?port:TCP_PORT;
        this.ip = ip?ip:TCP_IP;
        this.messege = [];

    }
    async send(msg){
        /* 设置连接的服务器 */
        return new Promise((resolve, reject) =>{
            this.client.connect(this.port, this.ip, ()=>{
                console.log("connect the server");
                /* 向服务器发送数据 */
                this.client.end(msg);
            })
            this.client.on('data', (data) =>{
                this.messege.push(data);
            });
            this.client.on('end', (err) => {
                if(err){
                    reject(err);
                }else{
                    resolve(this.messege);
                }
            })
            this.client.on("error", function (error) {
                reject(error);
            })
        })
        
    }
}
module.exports = TCPClients;