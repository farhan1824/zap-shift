import React from 'react'
import driverimg from "../../assets/agent-pending.png"

const Rider = () => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-3xl my-16 justify-center min-h-screen text-[#03373D]">
      
      <div className="max-w-lg w-full py-11">
        <h1 className="text-5xl font-bold text-gray-800 pt-20">Be a Rider</h1>
        <p className="text-sm text-gray-600 mt-2 mb-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        <form className="space-y-4 pb-36">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input type="text" className="w-full border rounded-md p-2 mt-1" />
          </div>

          {/* Driving License */}
          <div>
            <label className="block text-sm font-medium">Driving License Number</label>
            <input type="text" className="w-full border rounded-md p-2 mt-1" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Your Email</label>
            <input type="email" className="w-full border rounded-md p-2 mt-1" />
          </div>

          {/* Region Dropdown */}
          <div>
            <label className="block text-sm font-medium">Your Region</label>
            <select className="w-full border rounded-md p-2 mt-1">
              <option value="">Select Region</option>
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Khulna</option>
              <option>Rajshahi</option>
              <option>Sylhet</option>
              <option>Barishal</option>
              <option>Rangpur</option>
              <option>Mymensingh</option>
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label className="block text-sm font-medium">Your District</label>
            <select className="w-full border rounded-md p-2 mt-1">
              <option value="">Select District</option>
              <option>District 1</option>
              <option>District 2</option>
              <option>District 3</option>
            </select>
          </div>

          {/* NID */}
          <div>
            <label className="block text-sm font-medium">NID No</label>
            <input type="text" className="w-full border rounded-md p-2 mt-1" />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input type="tel" className="w-full border rounded-md p-2 mt-1" />
          </div>

          {/* Bike Info */}
          <div>
            <label className="block text-sm font-medium">Bike Brand Model and Year</label>
            <input type="text" className="w-full border rounded-md p-2 mt-1" />
          </div>

          {/* Bike Registration */}
          <div>
            <label className="block text-sm font-medium">Bike Registration Number</label>
            <input type="text" className="w-full border rounded-md p-2 mt-1" />
          </div>

          {/* About Yourself */}
          <div>
            <label className="block text-sm font-medium">Tell Us About Yourself</label>
            <textarea
              rows="3"
              className="w-full border rounded-md p-2 mt-1"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#CAEB66] text-black py-3 rounded-md hover:bg-[#94bb1e] transition"
          >
            Submit Application
          </button>

        </form>
      </div>

      <img
        src={driverimg}
        alt="Rider"
        className="hidden md:block w-96 ml-10"
      />

    </div>
  )
}

export default Rider