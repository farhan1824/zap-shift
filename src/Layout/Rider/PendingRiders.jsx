import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosHook } from "../../Hooks/AxiosHook";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";

export const PendingRiders = () => {
    const axios = AxiosHook();

    const {
        data: riders = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["pendingRiders"],
        queryFn: async () => {
            const res = await axios.get("/riders?status=pending");
            return res.data;
        },
    });

    const handleAction = (riderId, status,email) => {
        axios.patch(`/riders/${riderId}`, { status,email })
            .then(() => {
                Swal.fire(
                    status === "active" ? "Approved!" : "Disapproved!",
                    `Rider has been ${status === "active" ? "approved" : "disapproved"}.`,
                    status === "active" ? "success" : "info"
                );
                refetch();
            })
            .catch((err) => console.log(err));
    };

    const handleViewDetails = (rider) => {
        Swal.fire({
            title: `<strong>${rider.name}</strong>`,
            html: `
        <div class="text-left space-y-2">
          <p><strong>Email:</strong> ${rider.email}</p>
          <p><strong>Phone:</strong> ${rider.phone}</p>
          <p><strong>Region:</strong> ${rider.region}</p>
          <p><strong>District:</strong> ${rider.district}</p>
          <p><strong>Bike Info:</strong> ${rider.bikeInfo || "N/A"}</p>
          <p><strong>Bike Registration:</strong> ${rider.bikeReg || "N/A"}</p>
          <p><strong>About:</strong> ${rider.about || "N/A"}</p>
        </div>
      `,
            showCloseButton: true,
            focusConfirm: false,
        });
    };

    if (isLoading) return <Loading />;

    if (riders.length === 0)
        return (
            <div className="flex justify-center items-center h-64">
                <div className="card w-96 bg-yellow-50 shadow-lg border border-yellow-300 text-center p-6">
                    <div className="text-yellow-500 mb-4">
                        <FaTimesCircle size={48} className="mx-auto" />
                    </div>
                    <h2 className="text-xl font-bold text-yellow-700 mb-2">
                        No Pending Riders
                    </h2>
                    <p className="text-yellow-800 text-sm">
                        Currently, there are no pending rider applications.
                    </p>
                </div>
            </div>
        );

    return (
        <div className="p-6 text-gray-900">
            <h2 className="text-3xl font-bold mb-6">Pending Riders</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full shadow-lg border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100 text-black">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Applied Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider) => (
                            <tr key={rider._id} className="hover:bg-gray-50">
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.phone}</td>
                                <td>{new Date(rider.createAt).toLocaleDateString()}</td>
                                <td className="flex justify-center gap-3">
                                    <button
                                        onClick={() => {
                                            Swal.fire({
                                                title: "Are you sure?",
                                                text: "Do you want to approve this rider?",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#22c55e",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText: "Yes, approve it!",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    handleAction(rider._id, "active",rider.email);
                                                }
                                            });
                                        }}
                                        className="btn btn-circle btn-sm btn-success"
                                    >
                                        <FaCheckCircle />
                                    </button>

                                    <button
                                        onClick={() => {
                                            Swal.fire({
                                                title: "Are you sure?",
                                                text: "Do you want to disapprove this rider?",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#ef4444",
                                                cancelButtonColor: "#22c55e",
                                                confirmButtonText: "Yes, disapprove it!",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    handleAction(rider._id, "disapproved","");
                                                }
                                            });
                                        }}
                                        className="btn btn-circle btn-sm btn-error"
                                    >
                                        <FaTimesCircle />
                                    </button>
                                    <button
                                        onClick={() => handleViewDetails(rider)}
                                        className="btn btn-circle btn-sm btn-info"
                                    >
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};