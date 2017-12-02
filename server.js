const express = require('express');                             // express 라우팅 패키지 import
const app = express();
const path = require('path');
const bodyParser = require("body-parser");                      // html form 메소드 파서
const session = require("express-session");                     // express 세션 플러그인
const cookieParser = require('cookie-parser');
const passport = require('./router/passport');                  // passport 로그인 인증
const router = require('./router/main');                        // 라우터 파일
const dbRouter = require('./router/db');
const nodeadmin = require('nodeadmin');                         // mysql GUI
const MySQLstore = require('express-mysql-session')(session);   // mysql 기반 세션
app.use(passport.initialize());
app.use(passport.session());
app.use(nodeadmin(app));

// view 파일 경로 설정
app.set('views', __dirname + '/views');
// view 렌더링 엔진 ejs로 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// req.body 사용 가능 ㅋ...!!
app.use(bodyParser.urlencoded({extended: false}));

// 정적 파일(css, img파일) 가져올 경로를 views로 지정
app.use(express.static('views'));

// // // cookie 활성화
app.use(cookieParser(/*암호화 키*/'beedback;yjcJ20171018teambeedback'));
// // session 활성화
app.use(session({
    key: 'sid',                                     //  세션 아이디값
    secret: 'beedback;yjcJ20171018teambeedback',    //  암호화 키
    //세션의 저장 방식 
    resave: false,
    //세션 저장시 초기화 설정 
    saveUninitialized: false,
    // 메모리 세션은 서버가 재 시작되면 사라짐
    // -> 디비 기반 세션으로 서버 재 시작 시에도 세션 유지
    store: new MySQLstore({
        host:       'localhost',
        user:       'beedback',
        password:   'beedback',
        database:   'session'       // 세션이 저장되는 db
    }),
    //쿠키 설정
    cookie: {
        maxAge: 1000 * 60 * 60,  // 쿠키 유효기간 1시간
        httpOnly : true
    },
    rolling : true
}));

// 세션을 글로벌 화(view파일 어디서든 session.***으로 사용 가능)
var localSession = function(req, res, next){
    res.locals.session = req.session;
    next(null, req, res);
}
app.use(localSession);

// 라우터 파일 활성화
app.use('/', router);
app.use('/', dbRouter);

// 서버 가동 시작
var server = app.listen(/*cloud9 지정 포트*/process.env.PORT, /*cloud9 지정 IP*/process.env.IP, function(){
    console.log("Express server has started on port 3000");
});
