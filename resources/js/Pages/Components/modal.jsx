import React, { useState, useEffect } from "react";

export default function Modal({
    isOpen,
    onClose,
    onConfirm,
    item,
    isEdit,
    isOrder,
    cartItems = [],
}) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {
        if (item) {
            setName(item.name);
            setPrice(item.price);
            setStock(item.stock);
        }
    }, [item]);

    if (!isOpen) return null;

    const handleEditSubmit = () => {
        if (item) {
            onConfirm({ id: item.id, name, price, stock });
        }
    };

    const handleOrderSubmit = () => {
        onConfirm();
    };

    const handleDeleteSubmit = () => {
        if (item) {
            onConfirm(item.id);
        }
    };

    const totalAmount = cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">
                    {isEdit
                        ? "Edit Item"
                        : isOrder
                        ? "Order Summary"
                        : "Confirm Deletion"}
                </h2>
                {isEdit ? (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Stock</label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </>
                ) : isOrder ? (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            Cart Items
                        </h3>
                        <ul className="mb-4">
                            {cartItems.map((cartItem, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between mb-2"
                                >
                                    <span>
                                        {cartItem.name} - {cartItem.quantity} x
                                        ${cartItem.price}
                                    </span>
                                    <span>
                                        $
                                        {(
                                            cartItem.price * cartItem.quantity
                                        ).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t pt-2 flex justify-between font-bold">
                            <span>Total:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                ) : (
                    <p>Are you sure you want to delete this item?</p>
                )}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    {isOrder ? (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleOrderSubmit}
                        >
                            Proceed
                        </button>
                    ) : (
                        <a href="/store">
                            <button
                                onClick={   
                                    isEdit
                                        ? handleEditSubmit
                                        : handleDeleteSubmit
                                }
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                {isEdit ? "Save" : "Delete"}
                            </button>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
