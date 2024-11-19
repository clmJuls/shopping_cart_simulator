import React from 'react';

export default function QuantityModal({ item, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    onAddToCart(item.id, quantity);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add {item.name} to Cart</h2>
        <input
          type="number"
          min="1"
          max={item.stock}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Add to Cart
        </button>
        <button
          onClick={onClose}
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}