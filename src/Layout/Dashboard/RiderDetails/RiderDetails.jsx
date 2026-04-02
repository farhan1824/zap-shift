import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosHook } from "../../../Hooks/AxiosHook";
import Loading from "../../../Components/Loading/Loading";

const RiderDetails = () => {
  const axios = AxiosHook();

  // Fetch riders with assigned parcels
  const { data: riders = [], isLoading, isError, error } = useQuery({
    queryKey: ["ridersWithParcels"],
    queryFn: async () => {
      const res = await axios.get("/riders/parcels");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="p-6 text-black">
      <h2 className="text-xl font-bold mb-4">Rider Details</h2>

      {riders.length === 0 ? (
        <p>No riders with assigned parcels</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Rider Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Region</th>
              <th className="border px-2 py-1">Assigned Parcels</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider.email}>
                <td className="border px-2 py-1">{rider.name}</td>
                <td className="border px-2 py-1">{rider.email}</td>
                <td className="border px-2 py-1">{rider.region}</td>
                <td className="border px-2 py-1">
                  {rider.parcels.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {rider.parcels.map((trackingId) => (
                        <li key={trackingId}>{trackingId}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No parcels assigned</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RiderDetails;