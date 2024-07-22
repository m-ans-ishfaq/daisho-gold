"use client";

import { addToCart } from '@/app/(routes)/user/server';
import { toast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

interface QuantityInputProps {
  productId: string;
  stock: number;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({ productId, stock }) => {
  const [pStock, setPStock] = useState(stock);
  const [quantity, setQuantity] = useState(pStock > 0 ? 1 : 0);
  const { data: session } = useSession();

  const increment = () => setQuantity(prevQuantity => (prevQuantity < pStock ? prevQuantity + 1 : prevQuantity));
  const decrement = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numValue = parseInt(value, 10);

    if (!isNaN(numValue) && numValue > 0 && numValue <= pStock) {
      setQuantity(numValue);
    }
  };


  const onAddToCart = async () => {
    console.log(quantity, productId);
    if (session?.user && session.user.role == "customer") {
      try {
        const res = await addToCart(session.user.id, productId, quantity);
        if (!res) throw new Error();
        toast({ title: 'Item Has been added to cart successfully !' });
        setPStock(stock - quantity);
      } catch(err) {
        toast({ title: "Couldn't add to cart", variant: 'destructive' });
      }
    } else {
      toast({ title: "You need to login first" });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex border border-gray-300">
        <button
          type="button"
          onClick={decrement}
          disabled={quantity <= 1 || pStock === 0}
          className={`transition-all duration-300 ${quantity <= 1 || pStock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-yellow hover:text-white'} w-8 h-12 flex items-center justify-center border-r border-gray-300 text-gray-700`}
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
          disabled={quantity >= pStock || pStock === 0}
          className={`transition-all duration-300 ${quantity >= pStock || pStock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-yellow hover:text-white'} w-8 h-12 flex items-center justify-center border-l border-gray-300 text-gray-700`}
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={onAddToCart}
        disabled={pStock === 0}
        className={`transition-all duration-300 hover:bg-primary-red bg-yellow-500 text-white h-12 py-2 px-12 rounded ${stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        ADD TO CART
      </button>
    </div>
  );
};
