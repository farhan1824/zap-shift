import React from "react";
import { useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ParcelOrder = () => {
    const centers = useLoaderData();

    const { register, handleSubmit, watch, reset, setValue } = useForm();

    const parcelType = watch("type");

    const senderRegion = watch("senderRegion");
    const senderCity = watch("senderCity");

    const receiverRegion = watch("receiverRegion");
    const receiverCity = watch("receiverCity");

    // unique regions
    const regions = [...new Set(centers.map((c) => c.region))];

    // cities based on region
    const senderCities = [
        ...new Set(
            centers.filter((c) => c.region === senderRegion).map((c) => c.city)
        ),
    ];

    const receiverCities = [
        ...new Set(
            centers.filter((c) => c.region === receiverRegion).map((c) => c.city)
        ),
    ];

    // service centers based on city
    const senderCenters = centers.filter((c) => c.city === senderCity);
    const receiverCenters = centers.filter((c) => c.city === receiverCity);

    const calculateCost = (data) => {
        const weight = Number(data.weight || 0);

        let baseCost = 0;
        let weightCost = 0;
        let extraWeight = 0;
        let outsideCharge = 0;

        const outsideCity =
            data.senderServiceCenter !== data.receiverServiceCenter;

        if (data.type === "document") {
            baseCost = outsideCity ? 80 : 60;
        } else {
            if (weight <= 3) {
                baseCost = outsideCity ? 150 : 110;
            } else {
                baseCost = outsideCity ? 150 : 110;

                extraWeight = weight - 3;
                weightCost = extraWeight * 40;

                if (outsideCity) {
                    outsideCharge = 40;
                }
            }
        }

        const total = baseCost + weightCost + outsideCharge;

        return {
            total,
            baseCost,
            weightCost,
            extraWeight,
            outsideCharge,
            outsideCity,
            weight,
        };
    };

    const onSubmit = (data) => {
        console.log(data)
        const cost = calculateCost(data);

        Swal.fire({
            title: "Delivery Cost Breakdown",
            html: `
  <div style="text-align:left">

  <p><b>Parcel Type:</b> ${data.type}</p>
  <p><b>Total Weight:</b> ${cost.weight || "N/A"} kg</p>

  <hr/>

  <p><b>Base Cost:</b> ৳${cost.baseCost}</p>

  ${cost.weightCost
                    ? `
      <p><b>Extra Weight Charge</b></p>
      <p>
      (Weight - 3kg) × ৳40<br/>
      (${cost.weight}kg - 3kg) × 40 = ৳${cost.weightCost}
      </p>
      `
                    : ""
                }

  ${cost.outsideCharge
                    ? `<p><b>Outside District Extra Charge:</b> ৳${cost.outsideCharge}</p>`
                    : ""
                }

  <hr/>

  <h3>Total Delivery Cost: ৳${cost.total}</h3>

  </div>
  `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Confirm Order",
        }).then((result) => {
            if (result.isConfirmed) {
                const parcelData = {
                    ...data,
                    delivery_cost: cost.total,
                    creation_date: new Date(),
                };

                console.log("Saved Parcel:", parcelData);

                Swal.fire("Success!", "Parcel Order Confirmed!", "success");

                reset();
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white text-black">

            <h2 className="text-3xl font-bold mb-2">Send a Parcel</h2>
            <p className="text-gray-600 mb-6">
                Door to door parcel delivery service
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Parcel Info */}
                <div className="border p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Parcel Info</h3>

                    <div className="grid md:grid-cols-3 gap-4">

                        <select
                            {...register("type", { required: true })}
                            className="border p-2 rounded"
                        >
                            <option value="">Parcel Type</option>
                            <option value="document">Document</option>
                            <option value="non-document">Non Document</option>
                        </select>

                        <input
                            {...register("title", { required: true })}
                            placeholder="Parcel Title"
                            className="border p-2 rounded"
                        />

                        {parcelType === "non-document" && (
                            <input
                                type="number"
                                step="0.1"
                                {...register("weight")}
                                placeholder="Weight (kg)"
                                className="border p-2 rounded"
                            />
                        )}
                    </div>
                </div>

                {/* Sender & Receiver */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* Sender */}
                    <div className="border p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Sender Info</h3>

                        <div className="space-y-3">

                            <input
                                {...register("senderName", { required: true })}
                                placeholder="Sender Name"
                                className="border p-2 rounded w-full"
                            />

                            <input
                                {...register("senderContact", { required: true })}
                                placeholder="Contact"
                                className="border p-2 rounded w-full"
                            />

                            {/* Region */}
                            <select
                                {...register("senderRegion", {
                                    required: true,
                                    onChange: () => {
                                        setValue("senderCity", "");
                                        setValue("senderServiceCenter", "");
                                    },
                                })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select Region</option>
                                {regions.map((region) => (
                                    <option key={region}>{region}</option>
                                ))}
                            </select>

                            {/* City */}
                            <select
                                {...register("senderCity", {
                                    required: true,
                                    onChange: () => setValue("senderServiceCenter", ""),
                                })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select City</option>
                                {senderCities.map((city) => (
                                    <option key={city}>{city}</option>
                                ))}
                            </select>

                            {/* Service Center */}
                            <select
                                {...register("senderServiceCenter", { required: true })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select Service Center</option>
                                {senderCenters.map((center) =>
                                    center.covered_area.map((area) => (
                                        <option key={area} value={area}>
                                            {area}
                                        </option>
                                    ))
                                )}
                            </select>

                            <textarea
                                {...register("senderAddress", { required: true })}
                                placeholder="Address"
                                className="border p-2 rounded w-full"
                            />

                            <textarea
                                {...register("pickupInstruction", { required: true })}
                                placeholder="Pickup Instruction"
                                className="border p-2 rounded w-full"
                            />

                        </div>
                    </div>

                    {/* Receiver */}
                    <div className="border p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Receiver Info</h3>

                        <div className="space-y-3">

                            <input
                                {...register("receiverName", { required: true })}
                                placeholder="Receiver Name"
                                className="border p-2 rounded w-full"
                            />

                            <input
                                {...register("receiverContact", { required: true })}
                                placeholder="Contact"
                                className="border p-2 rounded w-full"
                            />

                            {/* Region */}
                            <select
                                {...register("receiverRegion", {
                                    required: true,
                                    onChange: () => {
                                        setValue("receiverCity", "");
                                        setValue("receiverServiceCenter", "");
                                    },
                                })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select Region</option>
                                {regions.map((region) => (
                                    <option key={region}>{region}</option>
                                ))}
                            </select>

                            {/* City */}
                            <select
                                {...register("receiverCity", {
                                    required: true,
                                    onChange: () => setValue("receiverServiceCenter", ""),
                                })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select City</option>
                                {receiverCities.map((city) => (
                                    <option key={city}>{city}</option>
                                ))}
                            </select>

                            {/* Service Center */}
                            <select
                                {...register("receiverServiceCenter", { required: true })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select Service Center</option>
                                {senderCenters.map((center) =>
                                    center.covered_area.map((area) => (
                                        <option key={area} value={area}>
                                            {area}
                                        </option>
                                    ))
                                )}
                            </select>

                            <textarea
                                {...register("receiverAddress", { required: true })}
                                placeholder="Address"
                                className="border p-2 rounded w-full"
                            />

                            <textarea
                                {...register("deliveryInstruction", { required: true })}
                                placeholder="Delivery Instruction"
                                className="border p-2 rounded w-full"
                            />

                        </div>
                    </div>

                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Submit Parcel
                </button>

            </form>
        </div>
    );
};

export default ParcelOrder;