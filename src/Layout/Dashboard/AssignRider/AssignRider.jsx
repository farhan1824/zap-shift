import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHook } from "../../../Hooks/AxiosHook";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axios = AxiosHook();
  const queryClient = useQueryClient();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [senderRider, setSenderRider] = useState("");
  const [receiverRider, setReceiverRider] = useState("");

  // Fetch assignable parcels
  const { data: parcels = [], isLoading, isError, error } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axios.get("/parcels/assignable");
      return res.data;
    },
  });

  // Fetch active riders
  const { data: riders = [] } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axios.get("/rider/active");
      return res.data;
    },
  });

  const assignMutation = useMutation({
    mutationFn: async ({ parcelId, riderEmail }) => {
      return await axios.patch(`/parcels/${parcelId}/assign`, { riderEmail });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assignableParcels"]);
      setSelectedParcel(null); // close modal
      Swal.fire({
        icon: "success",
        title: "Rider Assigned",
        text: "Rider(s) assigned successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    },
  });

  const openModal = (parcel) => {
    setSelectedParcel(parcel);
    setSenderRider("");
    setReceiverRider("");
  };

  const handleAssign = () => {
    if (!selectedParcel) return;

    let riderEmails = [];

    if (selectedParcel.senderRegion === selectedParcel.receiverRegion) {
      if (!senderRider) return alert("Select a rider");
      riderEmails = [senderRider]; // single rider
    } else {
      if (!senderRider || !receiverRider) return alert("Select both riders");
      riderEmails = [receiverRider, senderRider]; // receiver first, sender second
    }

    assignMutation.mutate({ parcelId: selectedParcel._id, riderEmail: riderEmails });
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="p-6 text-black">
      <h2 className="text-xl font-bold mb-4">Assign Rider</h2>

      {parcels.length === 0 ? (
        <p>No parcels available for assignment</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Tracking ID</th>
              <th className="border px-2 py-1">Sender District</th>
              <th className="border px-2 py-1">Receiver District</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Assigned Riders</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="border px-2 py-3">{parcel.tracking_id}</td>
                <td className="border px-2 py-3">{parcel.senderRegion}</td>
                <td className="border px-2 py-3">{parcel.receiverRegion}</td>
                <td className="border px-2 py-3">{parcel.delivery_status}</td>
                <td className="border px-2 py-3">
                  {parcel.assignedRiders ? (
                    <>
                      <span className="block font-semibold text-sm">
                        Receiver: {parcel.assignedRiders.receiverRider}
                      </span>
                      <span className="block font-semibold text-sm">
                        Sender: {parcel.assignedRiders.senderRider}
                      </span>
                    </>
                  ) : (
                    <label
                      htmlFor="assign-rider-modal"
                      className="bg-[#caeb66] text-black px-3 py-2 rounded cursor-pointer"
                      onClick={() => openModal(parcel)}
                    >
                      Assign Rider
                    </label>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {selectedParcel && (
        <div>
          <input type="checkbox" id="assign-rider-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative" style={{ backgroundColor: "#caeb66" }}>
              <label
                htmlFor="assign-rider-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setSelectedParcel(null)}
              >
                ✕
              </label>
              <h3 className="text-lg font-bold mb-4">Assign Rider for {selectedParcel.tracking_id}</h3>

              {selectedParcel.senderRegion === selectedParcel.receiverRegion ? (
                <div>
                  <p>Parcel is within the same region: {selectedParcel.senderRegion}</p>
                  <select
                    className="select select-bordered w-full mb-4 bg-white text-black"
                    value={senderRider}
                    onChange={(e) => setSenderRider(e.target.value)}
                  >
                    <option value="">Select Rider</option>
                    {riders.map((r) => (
                      <option key={r.email} value={r.email}>
                        {r.name} - {r.region}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <p>Parcel spans different regions:</p>

                  <label className="block font-semibold mt-2">Sender Region: {selectedParcel.senderRegion}</label>
                  <select
                    className="select select-bordered w-full mb-4 bg-white text-black"
                    value={senderRider}
                    onChange={(e) => setSenderRider(e.target.value)}
                  >
                    <option value="">Select Rider</option>
                    {riders
                      .filter((r) => r.region === selectedParcel.senderRegion)
                      .map((r) => (
                        <option key={r.email} value={r.email}>
                          {r.name} - {r.region}
                        </option>
                      ))}
                  </select>

                  <label className="block font-semibold mt-2">Receiver Region: {selectedParcel.receiverRegion}</label>
                  <select
                    className="select select-bordered w-full mb-4 bg-white text-black"
                    value={receiverRider}
                    onChange={(e) => setReceiverRider(e.target.value)}
                  >
                    <option value="">Select Rider</option>
                    {riders
                      .filter((r) => r.region === selectedParcel.receiverRegion)
                      .map((r) => (
                        <option key={r.email} value={r.email}>
                          {r.name} - {r.region}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <button
                className="btn btn-neutral w-full mt-2"
                onClick={handleAssign}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;