// 외부로 모듈 출력
// 외부에서 파일 import 시키기
// require("파일이/있는/경로/파일명.js")
const mysql = require('mysql');
    
//DB 세팅 객체 생성
class Database{
    constructor(config){
        this.connection = mysql.createConnection(config);
    }
    query(sql, args){
        return new Promise( (resolve, reject) =>{
            this.connection.query(sql, args, (err, rows)=>{
                if( err )
                    return reject(err);
                resolve(rows);
            });
        });
    }
    // db 종료 
    end(){
                            //반환 성공 / 실패 
        return new Promise( (resolve, reject) => {
           this.connection.end(err => {
                if( err )
                    return reject(err);
                resolve();
           });
        });
    }
}
const beedbackDB = new Database({
    host        : 'localhost',
    user        : 'beedback',
    password    : 'beedback',
    database    : 'beedback',
    dateStrings: true
});
module.exports = beedbackDB;