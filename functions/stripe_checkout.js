// Raw version of this file: https://raw.githubusercontent.com/auth0/webtask-scripts/master/stripe/stripe_charge.js
const functions = require('firebase-functions'),
    admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.token),
    currency = functions.config().stripe.currency || 'USD';

exports.processPayment = functions.https.onRequest((req, res) => {
    // This onWrite will trigger whenever anything is written to the path, so
    // Look up the Stripe customer id written in createStripeCustomer
    var data = JSON.parse(req.body);
    const emailKey = data.email.toLowerCase()
        .replace('.', '_').replace('$', '_').replace('/', '_').replace('#', '_')
        .replace('[', '_').replace(']', '_');
    return admin.database().ref(`/users/${emailKey}/payments`).once('value').then(snapshot => {
        return snapshot.val();
    }).then(customer => {
        // Create a charge using the pushId as the idempotency $key, protecting against double charges
        let amount = 0;
        switch (data.plan) {
            case 'Monthly (Trial)':
                amount = 1299;
                break;
            case 'Yearly':
                amount = 9588;
                break;
            case '2 Year':
                amount = 11976;
                break;
            default:
                throw new Error('plan not recognized');
        }
        let charge = {amount, currency, customer, source: data.token};
        return stripe.charges.create(charge);
    }).then(response => {
        // If the result is seccessful, write it back to the database
        return admin.database().ref(`/users/${emailKey}/payments${(new Date).getTime()}`).set(response);
    }).then(() => {
        if (data.return_url) {
            res.headers.append('Access-Control-Allow-Origin', data.return_url);
        }
        res.status(200);
        res.send(' ');
    }).catch(error => {
        throw new Error(error);
    });
});
