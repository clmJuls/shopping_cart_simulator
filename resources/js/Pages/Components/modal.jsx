import React, { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, onConfirm, item, isEdit }) {
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

    const handleSubmit = () => {
        if (isEdit) {
            onConfirm({ id: item.id, name, price, stock });
        } else {
            onConfirm(item.id);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">
                    {isEdit ? "Edit Item" : "Confirm Deletion"}
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
                ) : (
                    <p>Are you sure you want to delete this item?</p>
                )}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <a href="/store">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {isEdit ? "Save" : "Delete"}
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
