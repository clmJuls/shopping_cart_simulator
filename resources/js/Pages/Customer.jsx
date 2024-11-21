import React, { useState, useEffect } from "react";
import Modal from "./Components/modal";
import { Inertia } from "@inertiajs/inertia";

const Customer = ({ items, cashierId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch("/customers");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchCustomers();
    }, []);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        setQuantity(1);
    };

    const confirmAddToCart = () => {
        setCart([...cart, { ...selectedItem, quantity }]);
        console.log(`Added ${quantity} of ${selectedItem.name} to cart`);
        closeModal();
    };

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    const openOrderModal = () => {
        setIsOrderModalOpen(true);
    };

    const closeOrderModal = () => {
        setIsOrderModalOpen(false);
    };

    const confirmOrder = () => {
        const customerId = customers.length > 0 ? customers[0].id : null;

        if (!customerId) {
            console.error('No customer selected');
            return;
        }

        const cashierId = Math.random() < 0.5 ? 1 : 2;

        const order = {
            customer_id: customerId,
            cashier_id: cashierId,
            order_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            total_amount: cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            ),
            items: cart.map(item => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price,
                sub_total: item.price * item.quantity,
            })),
        };

        console.log('Order to be sent:', order);

        Inertia.post('/orders', order, {
            onSuccess: () => {
                closeOrderModal();
                setCart([]); // Clear cart after order is placed
            },
        });
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen relative">
            <div className="bg-white p-6 rounded shadow-lg mb-6">
                <h2 className="text-xl font-bold mb-2">Customer Information</h2>
                <ul>
                    {customers.map((customer) => (
                        <li key={customer.id}>
                            <strong>Name:</strong> {customer.name}
                            <br />
                            <strong>Address:</strong> {customer.address}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Display Items */}
            <h1 className="text-2xl font-bold mb-4">Customer Page</h1>

            <ul className="space-y-4">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center p-4 bg-white shadow rounded"
                    >
                        <span className="text-lg">
                            {item.name} - ${item.price}
                        </span>
                        <button
                            onClick={() => openModal(item)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add to Cart
                        </button>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">
                            Add {selectedItem.name} to Cart
                        </h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                min="1"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAddToCart}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Icon and Orders Button */}
            <div className="absolute top-8 right-8 flex flex-col items-end">
                <button
                    onClick={toggleCartVisibility}
                    className="text-5xl mb-2"
                >
                    🛒
                </button>
                {/* Orders Button */}
                <button
                    onClick={openOrderModal}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-2"
                >
                    Orders
                </button>
            </div>

            {/* Cart Details */}
            {isCartVisible && (
                <div className="absolute top-20 right-16 bg-gray-300 p-4 rounded shadow-lg w-64">
                    <h3 className="text-lg font-bold mb-2">Cart</h3>
                    {cart.length > 0 ? (
                        <ul>
                            {cart.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between"
                                >
                                    <span>
                                        {item.name} x {item.quantity}
                                    </span>
                                    <span>${item.price * item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">
                            Your cart is empty.
                        </p>
                    )}
                </div>
            )}

            {/* Order Modal */}
            <Modal
                isOpen={isOrderModalOpen}
                onClose={closeOrderModal}
                onConfirm={confirmOrder}
                isOrder={true}
                cartItems={cart}
            />
        </div>
    );
};

export default Customer;
