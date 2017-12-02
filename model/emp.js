class DB{
    constructor(table){
        this.conn = require('./dbConnection');
        this.tableSchema = [];
        
        this.conn.query('desc '+table)
        .then(result => {
            for(let i in result){
                this.tableSchema[i] = result[i].Field;
            }
        });
    }
    select(table, values){
        
    }
    insert(table, values){
        console.log(this.tableSchema);
    }
}
var a = new DB('user');
a.insert();