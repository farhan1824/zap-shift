import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosHook } from "../../../Hooks/AxiosHook";
import Loading from "../../../Components/Loading/Loading";

const AssignRider = () => {
  const axios = AxiosHook();

  const { data: parcels = [], isLoading, isError, error } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axios.get("/parcels/assignable");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="p-6 text-black" >
      <h2 className="text-xl font-bold mb-4">Assign Rider</h2>

      {parcels.length === 0 ? (
        <p>No parcels available for assignment</p>
      ) : (
        <table className="w-full border ">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Tracking ID</th>
              <th className="border px-2 py-1">Sender District</th>
              <th className="border px-2 py-1">Receiver District</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="border px-2 py-1">{parcel.tracking_id}</td>
                <td className="border px-2 py-1">{parcel.receiverRegion}</td>
                <td className="border px-2 py-1">{parcel.senderRegion}</td>
                <td className="border px-2 py-1">
                  {parcel.delivery_status}
                </td>
                <td className="border px-2 py-1">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignRider;