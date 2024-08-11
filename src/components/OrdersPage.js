import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PriceChart from './PriceChart';

function OrdersPage() {
    const [orders, setOrders] = useState({ pendingOrders: [], completedOrders: [] });
    const { authToken, logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('https://stakehubs-backend.onrender.com/api/orders', {
                headers: { 'Authorization': `Bearer ${authToken}` },
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else if (response.status === 403 || response.status === 401) {
                logout();
            }
        };

        fetchOrders();
    }, [authToken, logout]);

    return (
        <div className="mt-5">
            <PriceChart data={orders.completedOrders} />
            <h2 className='mt-4'>Pending Orders</h2>
            <ul className="list-group mb-3">
                {orders.pendingOrders.map(order => (
                    <li key={order.id} className="list-group-item">
                        Buyer Qty: {order.buyer_qty}, Buyer Price: {order.buyer_price}, Seller Price: {order.seller_price}, Seller Qty: {order.seller_qty}
                    </li>
                ))}
            </ul>
            <h2>Completed Orders</h2>
            <ul className="list-group mb-3">
                {orders.completedOrders.map(order => (
                    <li key={order.id} className="list-group-item">
                        Price: {order.price}, Qty: {order.qty}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrdersPage;
