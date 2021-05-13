const passport = require('passport');


const ExtractJwt = require('passport-jwt').ExtractJwt;
const StrategyJwt = require('passport-jwt').Strategy;

const db = require('../models');

passport.use(
  new StrategyJwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "@sdJ#kKlj297230@#32",
  }, (jwtPayload, done) => {
    db.User.findOne({ where : { id: jwtPayload.id } }).then((dbModel) => {
      if (dbModel) {
        return done(null, dbModel);
      } else {
        return done(null, false);
      }
    }).catch((err) => {
      return done(err, false);
    })
  })
);