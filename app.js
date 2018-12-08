// Import Express
const express = require('express');

// Import Body Parser for extracting data from the body
const bodyParser = require('body-parser');

// Import jsonwebtoken
const jwt = require('jsonwebtoken');

// Set the port number
const port = 5000;

// Initial Express
const app = express();

// Initialize Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Get route to test
app.get('/api', (req, res) => {
  res.send(req.body);
});


// Set POST route to append data to USERS
app.post('/api/post', verifyToken, (req,res) => {

  // Verify the JWT with the Token, the Secret Key, and a CallBack to respond
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err){
      res.sendStatus(403);
    } else {
      // Check if new User has username and email address
      res.send(authData);
    }
  });
});


// Post to Login route with JWT Authentication
app.post('/api/login', (req, res) => {

  // Create mock user
  const AdminUser = {
    id: 1,
    username: 'Thomas',
    email: 'tjallen91@hotmail.co.uk'
  };

  // JWT Sign with the params: payload -> secret key -> callBack(error, token)
  jwt.sign({AdminUser}, 'secretKey', (err, token) => {
    // Respond with the token
    res.json({
      token
    }
    );
  });
});

// Verify token
function verifyToken(req, res, next){

  // Get Auth Header Value
  const bearerHeader = req.headers['authorization'];

  // check if bearer is undefined
  if(typeof bearerHeader !== 'undefined'){

    // Split token after bearer
    const bearer = bearerHeader.split(' ');

    // Get token from array
    const bearerToken = bearer[1];
    
    // Set token to be the bearerToken
    req.token = bearerToken;

    // Call next() nmiddleware
    next();

  } else {
    // Set as Forbidden
    res.sendStatus(403);
  }
}

// Run the Server
app.listen(5000, console.log('Server listening on: ' + port));
