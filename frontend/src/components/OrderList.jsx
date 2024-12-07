import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../services/orderService';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getMyOrders();
                setOrders(data);
            } catch (error) {
                setError('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    if (error) {
        return <p className="has-text-danger">{error}</p>;
    }

    return (
        <div className="container mt-5">
            <h1 className="title">Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>
                                    {order.isDelivered
                                        ? 'Delivered'
                                        : order.isPaid
                                        ? 'Paid'
                                        : 'Pending'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderList;
