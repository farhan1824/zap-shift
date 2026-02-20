import React from 'react'
import customerReview from "../../../assets/customer-top.png"
import data from "../../../assets/data/CustomerReview.json";
import { Reviews } from './Reviews';

export const CutomerReview = () => {
    return (
        <div className='flex flex-col gap-3 items-center justify-center text-center text-black '>
            <img src={customerReview} alt="" />
            <h1 className='text-5xl font-bold'>What our customers are sayings</h1>
            <p className='font-thin w-2/3'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            <div className="space-y-5 p-6 flex flex-wrap justify-center items-center gap-6">
                {data.map((item) => (
                    <Reviews
                        key={item.id}
                        name={item.name}
                        designation={item.designation}
                        image={item.imageUrl}
                        review={item.review}
                    />
                ))}
            </div>
        </div>
    )
}
