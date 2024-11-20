import React, { useState, useEffect } from 'react';

// Simulate a database fetch function
const fetchCustomerFromDatabase = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Julius',
        address: '123 Baguio City, Philippines',
        created_at: '2023-10-01 10:00:00',
        updated_at: '2023-10-01 10:00:00',
      });
    }, 1000);
  });
};

const Customer = ({ items }) => {
  const [fixedCustomer, setFixedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await fetchCustomerFromDatabase();
        setFixedCustomer(customerData);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
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

  return (
    <div className="p-4 bg-gray-100 min-h-screen relative">
      {fixedCustomer && (
        <div className="bg-white p-6 rounded shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-2">Customer Information</h2>
          <p className="text-lg"><strong>Name:</strong> {fixedCustomer.name}</p>
          <p className="text-lg"><strong>Address:</strong> {fixedCustomer.address}</p>
          <p className="text-lg"><strong>Created At:</strong> {fixedCustomer.created_at}</p>
          <p className="text-lg"><strong>Updated At:</strong> {fixedCustomer.updated_at}</p>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Customer Page</h1>
      <ul className="space-y-4">
        {items.map(item => (
          <li key={item.id} className="flex justify-between items-center p-4 bg-white shadow rounded">
            <span className="text-lg">{item.name} - ${item.price}</span>
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
            <h2 className="text-xl font-bold mb-4">Add {selectedItem.name} to Cart</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
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

      {/* Cart Icon */}
      <div className="absolute top-8 right-8">
        <button onClick={toggleCartVisibility} className="text-5xl">
          🛒
        </button>
      </div>

      {/* Cart Details */}
      {isCartVisible && (
        <div className="absolute top-20 right-16 bg-gray-300 p-4 rounded shadow-lg w-64">
          <h3 className="text-lg font-bold mb-2">Cart</h3>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Customer;