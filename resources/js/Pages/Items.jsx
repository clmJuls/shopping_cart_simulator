import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Items() {
    // State hooks to manage the input values for name, price, and stock
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        // Sends a POST request to the server with the item details
        Inertia.post("/items", { name, price, stock });
        // Resets the input fields after submission
        setName("");
        setPrice("");
        setStock("");
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                Add Item
            </h1>
            <form
                onSubmit={handleSubmit} // Attaches the handleSubmit function to the form's submit event
                className="bg-white p-6 rounded-lg shadow-lg mb-6"
            >
                <input
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Updates the name state on input change
                    className="border p-2 mb-4 w-full"
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} // Updates the price state on input change
                    className="border p-2 mb-4 w-full"
                    required
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)} // Updates the stock state on input change
                    className="border p-2 mb-4 w-full"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                >
                    Add Item
                </button>
            </form>
            <div className="flex justify-center">
                <a href="/store">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                        Store
                    </button>
                </a>
            </div>
        </div>
    );
}
