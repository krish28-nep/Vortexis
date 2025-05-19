'use client';

import ButtonComponents from '@/components/ButtonComponents';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const Page = () => {
    const router = useRouter();

    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            _id: '1',
            name: 'LCD Monitor',
            price: 650,
            quantity: 1,
            image: '/oneplusHero.png',
        },
    ]);

    const updateQuantity = (id: string, quantity: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item._id === id ? { ...item, quantity: quantity } : item
            )
        );
    };

    const updateCart = () => {
        console.log('Cart updated:', cartItems);
        // You could re-fetch or sync cart here
    };

    const submitHandler = () => {
        console.log('Coupon applied');
        // Handle coupon logic here
    };

    return (
        <div className="cart-wrap pt-[80px]">
            {/* table header */}
            <div className="table-title flex gap-5 py-[24px] px-[40px] shadow-[0px_1px_13px_0px_#0000000D] items-center">
                <div className="title flex-1">
                    <span className="text-black text-lg font-semibold">Product</span>
                </div>
                <div className="title flex-1 text-center">
                    <span className="text-black text-lg font-semibold">Price</span>
                </div>
                <div className="title flex-1 text-center">
                    <span className="text-black text-lg font-semibold">Quantity</span>
                </div>
                <div className="title flex-1 text-end">
                    <span className="text-black text-lg font-semibold">Subtotal</span>
                </div>
            </div>

            {/* cart items */}
            <div className="product-details-wrap">
                {cartItems.map(item => {
                    const subTotal = item.price * item.quantity;

                    return (
                        <div
                            key={item._id}
                            className="product-details flex gap-5 mt-[40px] py-[24px] px-[40px] shadow-[0px_1px_13px_0px_#0000000D] items-center"
                        >
                            <div className="product-info flex-1 flex gap-[20px] items-center">
                                <div className="img-holder flex items-center relative">
                                    <span
                                        className="remove-icon w-[18px] h-[18px] grid place-items-center absolute rounded-[50%] top-[-5px] left-[-5px] mr-4 bg-red-700 cursor-pointer"
                                        onClick={() => updateQuantity(item._id, 0)}
                                    >
                                        <svg
                                            width="8"
                                            height="8"
                                            viewBox="0 0 8 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1 7L4 4M7 1L3.99943 4M3.99943 4L1 1M4 4L7 7"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <img
                                        src={item.image}
                                        className="h-[54px] w-[54px] object-contain"
                                        alt={item.name}
                                    />
                                </div>
                                <span className="title text-black">{item.name}</span>
                            </div>

                            <div className="product-price text-center flex-1">
                                <span className="text-black">${item.price}</span>
                            </div>

                            <div className="product-quantity text-center flex-1">
                                <input
                                    type="number"
                                    className="border border-[#00000066] rounded-[4px] max-w-[72px] p-2"
                                    min={1}
                                    value={item.quantity}
                                    onChange={e => {
                                        const value = e.target.value.trim();
                                        if (value && Number(value) > 0) {
                                            updateQuantity(item._id, Number(value));
                                        }
                                    }}
                                />
                            </div>

                            <div className="product-subtotal text-end flex-1">
                                <span className="text-black">${subTotal}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* buttons */}
            <div className="btn-wrap flex items-center justify-between mt-6">
                <ButtonComponents
                    content="Return To Shop"
                    bg_color="#FFF"
                    color="#000"
                    border_color="#00000080"
                    onClick={() => router.push('/')}
                />
                <ButtonComponents
                    content="Update Cart"
                    bg_color="#FFF"
                    color="#000"
                    border_color="#00000080"
                    onClick={updateCart}
                />
            </div>

            {/* subtotal */}
            <div className="cart-total-wrap flex gap-6 justify-between mt-10">
                <form onSubmit={(e) => { e.preventDefault(); submitHandler(); }}>
                    <div className="coupon-wrap flex gap-2">
                        <input
                            type="text"
                            placeholder="Coupon Code"
                            className="px-6 py-4 border border-black text-black rounded-sm"
                        />
                        <ButtonComponents
                            content="Apply Coupon"
                            bg_color="#DB4444"
                            color="#fff"
                            border_color="#DB4444"
                            onClick={submitHandler}
                        />
                    </div>
                </form>

                <div className="total-box border border-black rounded-sm py-8 px-6 max-w-[470px] w-full">
                    <h3 className="title font-medium mb-4 text-xl">Cart Total</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between border-b border-black pb-2">
                            <span>Subtotal:</span>
                            <span className="price">$1750</span>
                        </div>
                        <div className="flex justify-between border-b border-black pb-2">
                            <span>Shipping:</span>
                            <span className="price">Free</span>
                        </div>
                        <div className="flex justify-between  pb-2">
                            <span>Total:</span>
                            <span className="price">$1750</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
