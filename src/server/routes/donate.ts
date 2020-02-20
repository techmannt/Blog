import * as express from 'express';
import { secretkey } from '../config/';
import Stripe from 'stripe';
const router = express.Router();

const stripe = new Stripe(secretkey, {
  apiVersion: '2019-12-03',
});

const createCustomer = async () => {
  const params: Stripe.CustomerCreateParams = {
    description: 'test customer',
  };

  const customer: Stripe.Customer = await stripe.customers.create(params);

  console.log(customer.id);
};
createCustomer();

const charge = (token: string, amt: number) => {
    return stripe.charges.create({
        amount: amt * 100,
        currency: 'usd',
        source: token,
        description: 'donations'
    })
}

router.post('/', async (req, res, next) => {
    try {
        let data = await charge(req.body.token.id, req.body.amount)
        console.log(data);
        res.json('Charged!')
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})


export default router;
