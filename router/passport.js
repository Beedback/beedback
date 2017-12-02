var     passport            = require('passport'),
        LocalStrategy       = require('passport-local').Strategy,
        kakaoStrategy       = require('passport-kakao').Strategy,
        FacebookStrategy    = require('passport-facebook').Strategy,
        NaverStrategy       = require('passport-naver').Strategy,
        db                  = require('../model/dbConnection');
        
passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

// 로컬 로그인 정책
passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'passwd',
    passReqToCallback: true,
},
function(req, id, passwd, done){
    //Set Sql
    var sql  = "SELECT * FROM user WHERE user_id='"+ id +"' AND user_passwd=password('"+ passwd +"')";
    
    // DB Connecting
    db.query(sql, function(err, row){
        if(err){ //Query Error
            done(err);
            throw err;
        } else if ( row.length > 0){ // Success login
            // passport userprofile 양식
            let passport = {
                provider: 'local',
                id: null,
                displayName: row[0].user_id,
                username: row[0].user_id
            }
            done(null, passport);
        } else { // id/pwd Error
            console.error("Id / Pwd Error");
            done(err);
        }
    });
}));
    
// 네이버 로그인 정책
passport.use(new NaverStrategy({
    clientID: 'jBoO3XEwwCuIqVtDtcC7',
    clientSecret: 'tJOkolxh2M',
    callbackURL: 'https://beedback-bskwon.c9users.io/naver/oauth',
    passReqToCallback: true
},
//CallBack Value
function(req, accessToken, refreshToken, profile, done){
    var _profile = profile._json;
    // req.session.naver = profile
    done(null, profile);
}));

// 페이스북 로그인 정책
passport.use(new FacebookStrategy({
    clientID: '307767342965569',
    clientSecret: '0350c72e1e255b5d74c775fc78b7a42e',
    callbackURL: "http://beedback-bskwon.c9users.io/facebook/oauth",
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    var _profile = profile._json;
    // req.session.facebook = profile;
    done(null, profile);
  }
));

// 카카오 로그인 정책
passport.use(new kakaoStrategy({
    clientID: 'deeb0786faadb779a2b4888c7bb6baaa',
    callbackURL: 'http://beedback-bskwon.c9users.io/kakao/oauth',
    passReqToCallback: true
},
function(req, accessToken, refreshToken, params, profile, done){
    var _profile = profile._json;
    // req.session.profile = profile;
    done(null, profile);
}));

module.exports = passport;