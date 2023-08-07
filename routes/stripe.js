const router = require('express').Router();
const Stripe = require('stripe');

const stripe = Stripe('sk_test_51NWKreSE7uy5ZH2vYwb8Pv6TzjUpt6PQhIOs3nOeGXGWdIhuffFiF7cZNOcDEOC2luUDmsWXOKihPVrXhAVRGiJn00fzsPYzie')

router.post('/payment', (req, res) => {
    console.log("stripe route", process.env.STRIPE_KEY, req.body.tokenId, "---------", stripe.charges.create)
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "USD",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                // res.status(500).json(stripeErr)  // To be used when everything will work
                res.status(200).json(req.body.tokenId) // pseudo working code
            } else {
                res.status(200).json(stripeRes)
            }
        }
    );
});

module.exports = router;