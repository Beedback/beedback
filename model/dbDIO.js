//dbconnection object 
let conn = require("./dbConnection");

/*
    DB 관리 객체 
    필요한 메서드는 각자 정의해서 사용 할 것
    get(set)_info_(all)
*/
module.export = class DbDio{
    constructor(){
        return this;
    }
    get_user_id(board_id) {
        var returnVal;
        let sql = "SELECT * FROM project_board WHERE project_board_id="+board_id;
        conn.query(sql)
        .then(result => {
            returnVal = result;
        });
        return returnVal;
    }
}