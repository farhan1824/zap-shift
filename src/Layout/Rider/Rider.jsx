import React, { use, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import driverimg from "../../assets/agent-pending.png";
import { AuthCotext } from "../../Context/Authentication/AuthCotext";

const Rider = () => {
  const { user } = use(AuthCotext)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // ✅ Set default values from user
  useEffect(() => {
    if (user) {
      setValue("name", user.displayName || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  // ✅ Submit handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // এখান থেকে API call করতে পারো
  };

  return (
    <div className="flex items-center bg-white shadow-md rounded-3xl my-16 justify-center min-h-screen text-[#03373D]">
      <div className="max-w-lg w-full py-11">
        <h1 className="text-5xl font-bold text-gray-800 pt-20">
          Be a Rider
        </h1>

        <p className="text-sm text-gray-600 mt-2 mb-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-36">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full border rounded-md p-2 mt-1"
            />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
          </div>

          {/* Driving License */}
          <div>
            <label className="block text-sm font-medium">Driving License Number</label>
            <input
              type="text"
              {...register("license", { required: true })}
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Your Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium">Your Region</label>
            <select {...register("region")} className="w-full border rounded-md p-2 mt-1">
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

          {/* District */}
          <div>
            <label className="block text-sm font-medium">Your District</label>
            <select {...register("district")} className="w-full border rounded-md p-2 mt-1">
              <option value="">Select District</option>
              <option>District 1</option>
              <option>District 2</option>
              <option>District 3</option>
            </select>
          </div>

          {/* NID */}
          <div>
            <label className="block text-sm font-medium">NID No</label>
            <input
              type="text"
              {...register("nid", { required: true })}
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: true })}
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>

          {/* Bike Info */}
          <div>
            <label className="block text-sm font-medium">Bike Brand Model and Year</label>
            <input
              type="text"
              {...register("bikeInfo")}
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>

          {/* Bike Registration */}
          <div>
            <label className="block text-sm font-medium">Bike Registration Number</label>
            <input
              type="text"
              {...register("bikeReg")}
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium">Tell Us About Yourself</label>
            <textarea
              rows="3"
              {...register("about")}
              className="w-full border rounded-md p-2 mt-1"
            ></textarea>
          </div>

          {/* Submit */}
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
  );
};

export default Rider;