const express = require('express');
const router = new express.Router();
const passport = require('passport');
const model = require('../model/dbConnection');
const model1 = require('../model/dbDIO');

router.get('/', function(req, res){
    // response로 views폴더의 index.ejs를 랜더링해서 보여줌
    res.render('index');
});

// // 로그인 페이지
router.get('/loginPage', function(req, res) {
    res.render('login');
});

//네이버 로그인
router.get('/auth/naver',passport.authenticate('naver'));
router.get('/naver/oauth',passport.authenticate('naver', {
    successRedirect:'/',
    failureRedirect:'/loginPage'
}));

// 페이스북 로그인 라우팅
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/facebook/oauth', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/loginPage'
}));

// 카카오 로그인 라우팅
router.get('/auth/kakao', passport.authenticate('kakao'));
router.get('/kakao/oauth', passport.authenticate('kakao', {
    successRedirect: '/',
    failureRedirect: '/loginPage'
}));

// 로그인 인증 후 세션 생성
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/loginPage'
}));

// 로그아웃 페이지
router.get('/logout', function(req, res){
    // 세션의 값을 지움
    req.session.destroy();
    res.redirect('/');
})

//Board
router.get('/board',function(req, res) {

    var board_name = String(req.query.board_name);
    
    var boardList = {
        "Project"  : "board/project_board",
        "Freetalk"  : "board/board_Freetalk",
        "JS" : "board/board_JavaScript",
        "P"  : "board/board_PHP",
        "H"  : "board/board_Html",
        "CS" : "board/board_CSS",
        "D"  : "board/board_D3",
    }
    
    var page = req.query.page;
    
    var currentBoard = boardList[board_name];

    let db = require('../model/dbConnection'); // 디비 셋팅 

    var sql = "select * from project_board";
    
      
    db.query(sql).then(function (row) {
        res.render(currentBoard, {
            result: row,
            pageNum: page
        });
    });
    
        
        // currentBoard 여기
});

router.get('/test', function(req, res){
    res.render('test');
});

router.get('/membership',function(req, res) {
    let db = require('../model/dbConnection');// 요거 디비 세팅
    //Set Sql
    res.render('membership');
});

router.get('/myProject', function(req, res){
   res.render('myProject/myProject');
});

router.get('/view', function(req, res) {
    
    var board_name = String(req.query.board);
    
    var boardList = {
        "Project"  : "board/project_view",
        "Freetalk"  : "board/freetalk_view",
        "JS" : "board/JavaScript_view",
        "P"  : "board/PHP_view",
        "H"  : "board/Html_view",
        "CS" : "board/CSS_view",
        "D"  : "board/D3_view",
    }
    
    var views = boardList[board_name];
    var project_board_id = req.query.num;
    
    let db = require('../model/dbConnection'); // 디비 셋팅 

    var sql = "select * from project_board where project_board_id="+project_board_id;
     
    db.query(sql).then(function (row) {
        res.render(views, {
            result: row
        });
    });
        
})

router.post('/comment', function(req, res) {
    
    var comment = req.body.comment;
    let sql = "";
    let name = req.session.passport.user.username;
    
    let db = require('../model/dbConnection'); // 디비 셋팅 
    
    if (req.session.passport.user.provider == "beedback") {
        sql = "select nickname from user where user_id="+req.session.passport.user.username;
        db.query(sql).then(function (row) {
            name = row[0].nickname;
        });
    }
    
    sql = "insert into project_board_comment(board_id, comment)"
    
    
    
});

module.exports = router;