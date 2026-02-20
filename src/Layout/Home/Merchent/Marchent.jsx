import React from 'react'
import heroimage from "../../../assets/location-merchant.png"
export const Marchent = () => {
    return (
        <div className=" bg-[url('assets/be-a-merchant-bg.png')] w-auto h-auto bg-no-repeat bg-[#03373D] p-20 rounded-4xl">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={heroimage}
                    className="max-w-132.5 rounded-lg"
                />
                <div>
                    <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 ">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <span className='flex gap-2.5'>
                        <button className="btn bg-[#CAEB66] px-8 py-4 rounded-full text-black">Become a Merchant</button>
                        <button
                            className="btn btn-outline px-8 py-4 rounded-full border-[#CAEB66] text-[#CAEB66] hover:text-black hover:bg-[#CAEB66] "
                        >
                            Earn with ZapShift Courier
                        </button>

                    </span>
                </div>
            </div>
        </div>
    )
}
