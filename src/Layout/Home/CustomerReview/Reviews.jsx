import React from 'react'
import quote from "../../../assets/reviewQuote.png"
export const Reviews = ({ name, designation, image, review }) => {
    console.log(name, designation, image, review);
    return (
        <div><div className="max-w-md bg-white rounded-2xl shadow-md p-6 space-y-5">
            {/* Quotation Icon */}
            <img
                src={quote}
                alt="quote"
                className="w-8 h-8"
            />

            {/* Review Text */}
            <p className="text-gray-600 leading-relaxed">
                {review}
            </p>

            <div className="border-t border-dashed border-gray-300"></div>

            {/* User Info */}
            <div className="flex items-center gap-4">
                {/* User Image */}
                <img
                    src={image}
                    alt="user"
                    className="w-12 h-12 rounded-full object-cover"
                />

                {/* Name & Designation */}
                <div className='text-start'>
                    <h4 className="font-semibold text-xl text-gray-900">{name}</h4>
                    <p className="text-[16px] text-gray-500">{designation}</p>
                </div>
            </div>
        </div></div>
    )
}
