import React from "react";

function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-600">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Choose Your Role
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
                        <div
                            className="bg-cover bg-center h-32"
                            style={{
                                backgroundImage:
                                    "url(/assets/bg_card_home.jfif)",
                            }}
                        >
                            
                        </div>
                        <div className="p-6 bg-black text-white">
                            <div className="flex justify-between items-center mb-4">
                                <span className="bg-blue-500 text-xs text-white px-2 py-1 rounded">
                                    Role
                                </span>
                                <span className="text-sm">Customer</span>
                            </div>
                            <p className="text-gray-300 mb-4">
                                As a customer, you can browse products, add them
                                to your cart, and make purchases.
                            </p>
                            <div className="flex justify-end">
                                <a href="/customer">
                                    <button className="flex items-center justify-center w-12 h-12 border-2 border-teal-500 text-teal-500 rounded-md hover:bg-teal-500 hover:text-white transition">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
                        <div
                            className="bg-cover bg-center h-32"
                            style={{
                                backgroundImage:
                                    "url(/assets/bg_card_home.jfif)",
                            }}
                        >
                            
                        </div>
                        <div className="p-6 bg-black text-white">
                            <div className="flex justify-between items-center mb-4">
                                <span className="bg-green-500 text-xs text-white px-2 py-1 rounded">
                                    Role
                                </span>
                                <span className="text-sm">Cashier</span>
                            </div>
                            <p className="text-gray-300 mb-4">
                                As a cashier, you can manage transactions,
                                assist customers, and handle payments.
                            </p>
                            <div className="flex justify-end">
                                <a href="/cashier">
                                    <button className="flex items-center justify-center w-12 h-12 border-2 border-teal-500 text-teal-500 rounded-md hover:bg-teal-500 hover:text-white transition">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
