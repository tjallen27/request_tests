// Import Express
const express = require('express');

// Import Body Parser for extracting data from the body
const bodyParser = require('body-parser');

// Set the port number
const port = 5000;

// Initial Express
const app = express();

// Create USERS list
const users = [
  {
    username: 'JohnDoe',
    email: 'john_doe@email.com'
  }
];

// Initialize Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Get route to test
app.get('/api', (req, res) => {
  res.send('Testing with Postman');
});

// Set POST route to append data to USERS
app.post('/api/post', (req,res) => {

  // Check if new User has username and email address
  if(req.body.username && req.body.email){

    // Add the New User to the USERS list
    users.push(req.body);

    // Respond by showing all USERS
    res.send(users);
  }

  // Otherwise, respond with an error
  // res.end prevents 'Cannot set Headers after they are sent...' error message
  res.end('Check your details and try again');
});

// Run the Server
app.listen(5000, console.log('Server listening on: ' + port));
