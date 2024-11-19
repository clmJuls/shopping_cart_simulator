import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Modal from "./Components/modal";

export default function Store({ items: initialItems }) {
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);

    const openModal = (id) => {
        setItemIdToDelete(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setItemIdToDelete(null);
    };

    const handleDelete = () => {
        if (itemIdToDelete) {
            Inertia.delete(`/items/${itemIdToDelete}`, {
                onSuccess: () => {
                    setItems(items.filter(item => item.id !== itemIdToDelete));
                    closeModal();
                },
            });
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                Store
            </h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {item.name}
                        </h2>
                        <p className="text-gray-800 font-bold mb-2">
                            ${item.price}
                        </p>
                        <p className="text-gray-600">Stock: {item.stock}</p>
                        <button
                            onClick={() => openModal(item.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 mt-2"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-6">
                <a href="/items"><button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                    Add Item
                </button>
                </a>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
            />
        </div>
    );
}
