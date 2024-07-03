import React, { useState } from 'react';

const CheckoutForm = ({ handleCheckout }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCheckout({ name, address, cardNumber });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-4 py-2" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Address</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border px-4 py-2" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Card Number</label>
        <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full border px-4 py-2" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Checkout</button>
    </form>
  );
};

export default CheckoutForm;
