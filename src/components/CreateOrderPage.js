import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function CreateOrderPage() {
    const [buyerQty, setBuyerQty] = useState('');
    const [buyerPrice, setBuyerPrice] = useState('');
    const [sellerPrice, setSellerPrice] = useState('');
    const [sellerQty, setSellerQty] = useState('');
    const [message, setMessage] = useState('');
    const { authToken } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const response = await fetch('https://stakehubs-backend.onrender.com/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ buyer_qty: buyerQty, buyer_price: buyerPrice, seller_price: sellerPrice, seller_qty: sellerQty })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setMessage(`Order created successfully.`);
        } else {
            setMessage('Failed to create order');
        }
    };

    return (
        <div className="mt-5">
            <h2>Create Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Buyer Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        value={buyerQty}
                        onChange={(e) => setBuyerQty(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Buyer Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={buyerPrice}
                        onChange={(e) => setBuyerPrice(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Seller Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={sellerPrice}
                        onChange={(e) => setSellerPrice(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Seller Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        value={sellerQty}
                        onChange={(e) => setSellerQty(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Order</button>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </form>
        </div>
    );
}

export default CreateOrderPage;
