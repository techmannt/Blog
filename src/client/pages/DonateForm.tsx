import * as React from 'react';
import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const DonateForm: React.FC<DonateFormProps> = props => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const elements = useElements();
  const stripe = useStripe();
  const chargeIt = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let cardElement = elements.getElement(CardElement);
    let { token: {id} } = await stripe.createToken(cardElement, { name });
    console.log({ name, amount });
  };

  return (
    <main className="container">
      <h1>test</h1>
      <section className="row justify-content-center my-2">
        <div className="col-md-8">
          <form className="form-group p-3 border rounded shadow">
            <div className="row">
              <div className="col-6">
                <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control my-1" />
              </div>
              <div className="col-6">
                <input onChange={e => setName(e.target.value)} value={amount} type="text" className="form-control my-1" />
              </div>
            </div>
            <CardElement className="form-control my-1" />
            <button className="btn btn-primary btn-block w-75 mx-auto shadow mt-3">Charge IT!</button>
          </form>
        </div>
      </section>
    </main>
  );
};

interface DonateFormProps { }

export default DonateForm;
