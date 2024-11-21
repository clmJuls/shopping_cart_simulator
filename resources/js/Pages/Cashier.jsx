import React, { useState, useEffect } from 'react';

function CustomerOrders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/orders') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched orders:', data);
                // Fetch orderItems for each order
                const ordersWithItems = data.map(order => {
                    return fetch(`/orders/${order.id}/items`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to fetch order items');
                            }
                            return response.json();
                        })
                        .then(items => {
                            console.log(`Fetched items for order ${order.id}:`, items);
                            return { ...order, orderItems: items };
                        })
                        .catch(error => {
                            console.error(`Error fetching items for order ${order.id}:`, error);
                            return { ...order, orderItems: [] }; // Return order with empty items on error
                        });
                });

                // Wait for all orderItems fetches to complete
                Promise.all(ordersWithItems).then(completeOrders => {
                    setOrders(completeOrders);
                });
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setError(error);
            });
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Customer Orders</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orders.map(order => (
                    <div className="bg-white shadow-md rounded-lg p-4" key={order.id}>
                        <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                        <p className="text-gray-700">Customer: {order.customer ? order.customer.name : 'Unknown'}</p>
                        <p className="text-gray-700">Cashier: {order.cashier ? order.cashier.name : 'Unknown'}</p>
                        <p className="text-gray-700">Cashier ID: {order.cashier ? order.cashier.id : 'Unknown'}</p>
                        <p className="text-gray-700">Items:</p>
                        <ul className="list-disc list-inside">
                            {order.orderItems && order.orderItems.length > 0 ? (
                                order.orderItems.map(orderItem => (
                                    <li key={orderItem.id} className="text-gray-600">
                                        {orderItem.item ? orderItem.item.name : 'Unknown Item'}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-600">No items found</li>
                            )}
                        </ul>
                        <p className="text-gray-700 font-bold">Total: ${order.total_amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default CustomerOrders;
