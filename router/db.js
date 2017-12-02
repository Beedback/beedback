const express = require('express');
const router = express.Router();
const conn = require('../model/dbConnection');

// 요기 문법 참고해서 라우터 설정해주세용
/*  router.get      = SELECT
    router.put      = INSERT / UPDATE
    router.delete   = DELETE
*/ 
// 유저id를 요청 (유저 id = name)
router.get('/userid/:name', (req, res) => {
    let name = req.params.name;
    conn.query("SELECT user_id FROM user WHERE user_id = '" + name + "'")
    .then(rows => {
        // 유저가 있을때 data[0].user_id로 유저 id반환
        // 유저가 없으면 빈 배열 반환.
        res.json(rows);
    });
});

router.get('/nickname/:nickname', (req, res) => {
    let name = req.params.nickname;
    conn.query("SELECT user_id FROM user WHERE nickname = '" + name + "'")
    .then(rows => {
        // 유저가 있을때 data[0].user_id로 유저 id반환
        // 유저가 없으면 빈 배열 반환.
        res.json(rows);
    });
});

// DB SELECT 쿼리
router.get('/board/userid', (req, res) => {
    let board_id = req.headers.boardid;
    console.log(req.body);
    conn.query('SELECT * FROM project_board WHERE project_board_id = "'+board_id+'"')
    .then(rows => {
        res.json(rows);
    });
});

// DB INSERT 쿼리
router.put('/put/', (req, res)=>{
    let table
});

// DB DELETE 쿼리
router.delete('/del/user', (req, res)=>{
    
});

module.exports = router;