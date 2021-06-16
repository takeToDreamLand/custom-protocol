const fs = require('fs');
const path = require('path')
class DB{
    dbfile = 'Mockdb.json';

    opendb(){
        return JSON.parse(fs.readFileSync(this.dbfile, {encoding:'utf-8'}));
    }
    savedb(jsoninput){
        fs.writeFileSync(this.dbfile, JSON.stringify(jsoninput, null, '\t'));
    }
}
module.exports = new DB();