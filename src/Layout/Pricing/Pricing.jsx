import React, { useState } from 'react'

export const Pricing = () => {

  const [formData, setFormData] = useState({
    parcelType: "",
    destination: "",
    weight: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleReset = () => {
    setFormData({
      parcelType: "",
      destination: "",
      weight: ""
    })
  }

  const handleCalculate = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="bg-white shadow-md rounded-3xl my-16 text-[#03373D] px-6">

      <div className="max-w-lg w-full py-5  pl-24 text-start">
        <h1 className="text-5xl font-bold pt-20">
          Pricing Calculator
        </h1>
        <p className="text-sm text-gray-600 mt-2 mb-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
        </p>
      </div>

      <div className="divider divider-neutral"></div>

      <h4 className="text-center text-xl font-semibold mt-4">
        Calculate Your Cost
      </h4>

      <div className="flex justify-center items-center gap-10 py-10">
        <form
          onSubmit={handleCalculate}
          className=" p-8 w-full max-w-md space-y-5"
        >

          {/* Parcel Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Parcel Type
            </label>
            <select
              name="parcelType"
              value={formData.parcelType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-black"
            >
              <option value="">Select Parcel Type</option>
              <option value="document">Document</option>
              <option value="package">Package</option>
              <option value="fragile">Fragile Item</option>
            </select>
          </div>

          {/* Delivery Destination */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Destination
            </label>
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-black"
            >
              <option value="">Select Destination</option>
              <option value="inside-city">Inside City</option>
              <option value="outside-city">Outside City</option>
              <option value="inter-district">Inter District</option>
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Weight (KG)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter weight"
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-black"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="w-1/2 border border-gray-400 py-3 rounded-full hover:bg-gray-200 transition"
            >
              Reset
            </button>

            <button
              type="submit"
              className="w-1/2 bg-[#CAEB66] text-black py-3 rounded-2xl hover:bg-[#94bb1e] transition"
            >
              Calculate
            </button>
          </div>

        </form>
        <div>
            <h1 className="text-7xl font-bold text-center mt-10">{formData.weight ? formData.weight * 100 : 1000}TK</h1>
        </div>
      </div>

    </div>
  )
}