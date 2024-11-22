import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Modal from "./Components/modal";

export default function Store({ items: initialItems }) {
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    const openEditModal = (item) => {
        setCurrentItem(item);
        setModalType("edit");
        setIsModalOpen(true);
    };

    const openDeleteModal = (item) => {
        setCurrentItem(item);
        setModalType("delete");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
        setModalType(null);
    };

    const handleEdit = (updatedItem) => {
        console.log("Updated Item:", updatedItem);

        Inertia.put(`/items/${updatedItem.id}`, updatedItem, {
            onSuccess: () => {
                setItems(
                    items.map((item) =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                );
                closeModal();
            },
            onError: (errors) => {
                console.error("Update Error:", errors);
            }
        });
    };

    const handleDelete = (id) => {
        Inertia.delete(`/items/${id}`, {
            onSuccess: () => {
                setItems(items.filter((item) => item.id !== id));
                closeModal();
            },
        });
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <a href="/cashier">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-500 hover:shadow-lg transition-all duration-300">
                        Store
                    </button>
                </a>
                <h1 className="text-3xl font-bold text-center text-blue-600">
                    Store
                </h1>
                <a href="/items">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-500 hover:shadow-lg transition-all duration-300">
                        Add Item
                    </button>
                </a>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar" style={{ maxHeight: '600px' }}>
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
                        <div className="flex space-x-2 mt-2">
                            <button
                                onClick={() => openEditModal(item)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => openDeleteModal(item)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-6"></div>
            {currentItem && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={modalType === "edit" ? handleEdit : handleDelete}
                    item={currentItem}
                    isEdit={modalType === "edit"}
                />
            )}
        </div>
    );
}
