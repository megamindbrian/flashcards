const functions = require('firebase-functions'),
    admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

module.exports.processPayment = require('./stripe_checkout.js').processPayment;
module.exports.sendgridEmail = require('./sendgrid.js').sendgridEmail;
module.exports.fb = require('./fb.js').fb;


