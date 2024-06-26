import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const stripePromise = loadStripe("pk_test_51NSaJVFjDDiJWQdFA1EQlVdWdgpieE8DIPEPmIKR2B5CQlcp9ZRiFQKiqf7QfgxAuHDqHl3I0gRtiqmRCKjgY0wS00Sm7EkmoA");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise} options={options}>
      <App />
    </Elements>
  </React.StrictMode>,
)
