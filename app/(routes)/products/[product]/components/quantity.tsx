"use client";

import React, { useState } from 'react';

interface QuantityInputProps {
  productId: string;
  stock: number;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({ productId, stock }) => {
  const [quantity, setQuantity] = useState(stock > 0 ? 1 : 0);

  const increment = () => setQuantity(prevQuantity => (prevQuantity < stock ? prevQuantity + 1 : prevQuantity));
  const decrement = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numValue = parseInt(value, 10);

    if (!isNaN(numValue) && numValue > 0 && numValue <= stock) {
      setQuantity(numValue);
    }
  };


  const onAddToCart = async () => {
    console.log(quantity, productId);
    // Add your add-to-cart logic here
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex border border-gray-300">
        <button
          type="button"
          onClick={decrement}
          disabled={quantity <= 1 || stock === 0}
          className={`transition-all duration-300 ${quantity <= 1 || stock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-yellow hover:text-white'} w-8 h-12 flex items-center justify-center border-r border-gray-300 text-gray-700`}
        >
          -
        </button>
        <input
          type="text"
          value={quantity}
          onChange={handleInputChange}
          className="w-12 h-12 text-center border-none focus:outline-none"
        />
        <button
          type="button"
          onClick={increment}
          disabled={quantity >= stock || stock === 0}
          className={`transition-all duration-300 ${quantity >= stock || stock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-yellow hover:text-white'} w-8 h-12 flex items-center justify-center border-l border-gray-300 text-gray-700`}
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={onAddToCart}
        disabled={stock === 0}
        className={`transition-all duration-300 hover:bg-primary-red bg-yellow-500 text-white h-12 py-2 px-12 rounded ${stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        ADD TO CART
      </button>
    </div>
  );
};
