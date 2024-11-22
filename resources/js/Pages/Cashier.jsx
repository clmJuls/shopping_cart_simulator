import React, { useState, useEffect } from "react";

function CustomerOrders() {
    const [orders, setOrders] = useState([]);
    const [paidOrders, setPaidOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPaidModalOpen, setIsPaidModalOpen] = useState(false);
    const [isCashoutModalOpen, setIsCashoutModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        fetch("/orders")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const ordersWithItems = data.map((order) => {
                    return fetch(`/orders/${order.id}/items`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Failed to fetch order items");
                            }
                            return response.json();
                        })
                        .then((items) => {
                            return { ...order, orderItems: items };
                        })
                        .catch((error) => {
                            console.error(
                                `Error fetching items for order ${order.id}:`,
                                error
                            );
                            return { ...order, orderItems: [] };
                        });
                });

                Promise.all(ordersWithItems).then((completeOrders) => {
                    setOrders(completeOrders);
                    setLoading(false);
                });
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setError(error);
                setLoading(false);
            });
    };

    const deleteOrder = (orderId) => {
        fetch(`/orders/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    console.error(
                        `Failed to delete order: ${response.status} ${response.statusText}`
                    );
                    throw new Error("Failed to delete order");
                }
                // Remove the deleted order from the state
                setOrders(orders.filter((order) => order.id !== orderId));
            })
            .catch((error) => {
                console.error("Error deleting order:", error);
                setError(error);
            });
    };

    const togglePaidModal = () => {
        setIsPaidModalOpen(!isPaidModalOpen);
    };

    const toggleCashoutModal = (order) => {
        setSelectedOrder(order);
        setIsCashoutModalOpen(!isCashoutModalOpen);
    };

    const confirmCashout = () => {
        setPaidOrders([...paidOrders, selectedOrder]);
        setOrders(orders.filter((order) => order.id !== selectedOrder.id));
        setIsCashoutModalOpen(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <img src="/assets/loading.gif" alt="Loading..." />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen items-center">
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <a href="/store">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
                            Store
                        </button>
                    </a>
                    <h1 className="text-2xl font-bold text-white">
                        Customer Orders
                    </h1>
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                        onClick={togglePaidModal}
                    >
                        Orders Paid
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
                    {orders.map((order) => (
                        <div
                            className="relative bg-gray-900 text-white shadow-md rounded-lg p-6 h-full flex flex-col justify-between fade-in card"
                            key={order.id}
                        >
                            <button
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl p-2"
                                aria-label="Delete Order"
                                onClick={() => deleteOrder(order.id)}
                            >
                                &times;
                            </button>
                            <div>
                                <h2 className="text-lg font-semibold mb-2">
                                    Order #{order.id}
                                </h2>
                                <p className="text-3xl font-bold mb-2">
                                    ${order.total_amount}
                                </p>
                                
                                <hr className="border-gray-700 mb-4" />
                                <p className="font-bold mb-2">Items:</p>
                                <ul className="list-disc list-inside mb-4">
                                    {order.orderItems &&
                                    order.orderItems.length > 0 ? (
                                        order.orderItems.map((orderItem) => (
                                            <li
                                                key={orderItem.id}
                                                className="text-gray-300"
                                            >
                                                {orderItem.item
                                                    ? orderItem.item.name
                                                    : "Unknown Item"}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-300">
                                            No items found
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
                                    onClick={() => toggleCashoutModal(order)}
                                >
                                    Cashout
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isPaidModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
                    <div className="min-h-80 relative bg-white p-8 rounded-lg shadow-2xl transform transition-transform duration-300 ease-in-out scale-95 max-w-md w-full">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
                            onClick={togglePaidModal}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                            Paid Orders
                        </h2>
                        <div className="overflow-y-auto">
                            {paidOrders.length > 0 ? (
                                <ul className="space-y-4">
                                    {paidOrders.map((order) => (
                                        <li
                                            key={order.id}
                                            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
                                        >
                                            <span className="text-gray-800">
                                                Order #{order.id}
                                            </span>
                                            <span className="text-green-600 font-semibold">
                                                Paid
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500">
                                    No orders paid.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {isCashoutModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
                    <div className="bg-white p-8 rounded-lg shadow-2xl transform transition-transform duration-300 ease-in-out scale-95 max-w-md w-full">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
                            onClick={() => setIsCashoutModalOpen(false)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                            Confirm Cashout
                        </h2>
                        <p className="text-center text-gray-600 mb-4">
                            Are you sure you want to cashout <br />
                            ORDER #{selectedOrder?.id}?
                        </p>
                        <div className="flex justify-end mt-4 pt-10">
                            <button
                                className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 mr-2 transition-colors duration-200"
                                onClick={() => setIsCashoutModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition-colors duration-200"
                                onClick={confirmCashout}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerOrders;
