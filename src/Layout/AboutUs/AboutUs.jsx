import React, { useState } from 'react'
import Story from './Story'
import { Mission } from './Mission'
import { Success } from './Success'
import { Team } from './Team'


const AboutUs = () => {

  const [activeSection, setActiveSection] = useState("story")

  return (
    <div className="bg-white shadow-md rounded-3xl my-16 text-[#03373D] px-6">

      <div className="pt-5 pl-24 text-start">
        <h1 className="text-5xl font-bold pt-10">
          About Us
        </h1>
        <p className="text-sm text-gray-600 mt-2 w-1/2 mb-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
        </p>
        <div className="divider divider-neutral"></div>
      </div>


        <div className="flex justify-start pl-24 gap-8 mt-6 cursor-pointer font-semibold">
          <h3 onClick={() => setActiveSection("story")}>Story</h3>
          <h3 onClick={() => setActiveSection("mission")}>Mission</h3>
          <h3 onClick={() => setActiveSection("success")}>Success</h3>
          <h3 onClick={() => setActiveSection("team")}>Team & Others</h3>
        </div>

        <div className="mt-6 pl-24">
          {activeSection === "story" && <Story />}
          {activeSection === "mission" && <Mission />}
          {activeSection === "success" && <Success />}
          {activeSection === "team" && <Team />}
        </div>


    </div>
  )
}

export default AboutUs