const express = require('express'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes/index.js');  
const passport = require('passport') 
require('./handlers/authenticate.js'); 
const session = require('express-session') 
// const User = require('./models/User')



require('./db.js');

const server = express();       

server.use(session({
  secret: 'mysecret',
  resave: false, 
  saveUninitialized: true, 
  cookie: {secure:false}
})) 




server.name = 'API';

// Middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));    
server.use(express.json()) 
server.use(express.urlencoded({ extended: false}))
server.use(passport.initialize()) 
server.use(passport.session())




server.get('/auth/google',passport.authenticate('google',  {scope: ['profile', 'email']}))

server.get('/auth/google/create', passport.authenticate('google', { failureRedirect: '/login'}), async (req, res) =>{
  // res.redirect('/') 
  res.end('logget in!') 
  //  Datos del usuario desde Google 
  // const googleId = req.user.id;
  // const email = req.user.emails[0].value;
  // const name = req.user.displayName;

  //  try {
  //   // Guardar en la base de datos utilizando el modelo User
  //   const user = await User.create({
  //     googleId,
  //     email, 
  //     name
  //   });
  //   console.log('Usuario guardado en la base de datos:',  user);
  //   res.redirect('/');
  // } catch (error) {
  //   console.error('Error al guardar en la base de datos:', error);
  //   res.redirect('/');
  // }
});

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', router);   



// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
