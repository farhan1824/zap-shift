import React, { useEffect, useState } from "react";
import { AxiosHook } from "../../Hooks/AxiosHook";
import Loading from "../../Components/Loading/Loading";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

const ActiveRiders = () => {
    const [riders, setRiders] = useState([]);
    const [loading, setLoading] = useState(true);
    const axios = AxiosHook();

    useEffect(() => {
        axios
            .get("/riders?status=active")
            .then((res) => {
                setRiders(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <Loading />;

    if (riders.length === 0)
        return (
            <div className="flex justify-center items-center h-64">
                <div className="card w-96 bg-red-50 shadow-lg border border-red-300 text-center p-6">
                    <div className="text-red-500 mb-4">
                        <FaCheckCircle size={48} className="mx-auto" />
                    </div>
                    <h2 className="text-xl font-bold text-red-700 mb-2">No Active Riders</h2>
                    <p className="text-red-800 text-sm">
                        Currently, there are no active riders available. Please check back later.
                    </p>
                </div>
            </div>
        );

    return (
        <div className="p-6 text-gray-900">
            <h2 className="text-3xl font-bold mb-6">Active Riders</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {riders.map((rider) => (
                    <div
                        key={rider._id}
                        className="card bg-white shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 rounded-lg p-5"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold">{rider.name}</h3>
                            <span className="badge badge-success gap-2 flex items-center">
                                <FaCheckCircle /> Active
                            </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p className="flex items-center gap-2">
                                <FaEnvelope className="text-gray-500" /> {rider.email}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaPhone className="text-gray-500" /> {rider.phone}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-500" /> {rider.region}, {rider.district}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveRiders;