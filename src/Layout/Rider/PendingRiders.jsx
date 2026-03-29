import React, { useEffect, useState } from "react";
import { AxiosHook } from "../../Hooks/AxiosHook";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";

export const PendingRiders = () => {
    const [riders, setRiders] = useState([]);
    const [loading, setLoading] = useState(true);
    const axios = AxiosHook();

    useEffect(() => {
        fetchRiders();
    }, []);

    const fetchRiders = () => {
        setLoading(true);
        axios.get("/riders?status=pending")
            .then((res) => {
                setRiders(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleApprove = (riderId) => {
        axios.patch(`/riders/${riderId}`, { status: "active" })
            .then(() => {
                Swal.fire("Approved!", "Rider has been approved.", "success");
                fetchRiders();
            })
            .catch((err) => console.log(err));
    };

    const handleDisapprove = (riderId) => {
        axios.patch(`/riders/${riderId}`, { status: "disapproved" })
            .then(() => {
                Swal.fire("Disapproved!", "Rider has been disapproved.", "info");
                fetchRiders();
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

    if (loading) return <Loading />;

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
                            <th className="text-left">Name</th>
                            <th className="text-left">Email</th>
                            <th className="text-left">Phone</th>
                            <th className="text-left">Applied Date</th>
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
                                        onClick={() => handleApprove(rider._id)}
                                        title="Approve"
                                        className="btn btn-circle btn-sm btn-success tooltip tooltip-top"
                                        data-tip="Approve Rider"
                                    >
                                        <FaCheckCircle />
                                    </button>
                                    <button
                                        onClick={() => handleDisapprove(rider._id)}
                                        title="Disapprove"
                                        className="btn btn-circle btn-sm btn-error tooltip tooltip-top"
                                        data-tip="Disapprove Rider"
                                    >
                                        <FaTimesCircle />
                                    </button>
                                    <button
                                        onClick={() => handleViewDetails(rider)}
                                        title="View Details"
                                        className="btn btn-circle btn-sm btn-info tooltip tooltip-top"
                                        data-tip="View Rider Details"
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