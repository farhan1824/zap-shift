import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { AuthCotext } from '../../../Context/Authentication/AuthCotext'
import { AxiosHook } from '../../../Hooks/AxiosHook'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const MyParcels = () => {
    const { user } = useContext(AuthCotext)
    const axios = AxiosHook()
    const navigate = useNavigate()

    const { data: MyParcelData = [], isLoading, refetch } = useQuery({
        queryKey: ["my_parcels", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })

    if (isLoading) {
        return <p className="text-black">Loading parcels...</p>
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        })

        if (result.isConfirmed) {
            try {
                await axios.delete(`/parcels/${id}`)

                Swal.fire({
                    title: "Deleted!",
                    text: "Your parcel has been deleted.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                })

                refetch()
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete parcel.",
                    icon: "error"
                })
            }
        }
    }

    const handlePayment = (id) => {
        // navigate(`dashboard/payment/${id}`)
        console.log("the id of the product", id);
        navigate(`/dashboard/payment/${id}`)
    }

    return (
        <div className="p-6 space-y-4">

            <h2 className="text-2xl font-bold text-black">
                My Parcels ({MyParcelData.length})
            </h2>

            {MyParcelData.length === 0 && (
                <p className="text-gray-600">No parcels found.</p>
            )}

            {MyParcelData.map((parcel) => (
                <div
                    key={parcel._id}
                    className="border rounded-lg p-4 shadow bg-white text-black space-y-2"
                >
                    <p><strong>Sender:</strong> {parcel.senderName}</p>
                    <p><strong>Receiver:</strong> {parcel.receiverName}</p>

                    <p>
                        <strong>Created:</strong>{" "}
                        {new Date(parcel.creation_date).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </p>

                    <p><strong>Tracking ID:</strong> {parcel.tracking_id}</p>

                    {/* BUTTONS */}
                    <div className="flex gap-3 pt-2">

                        <button
                            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                            onClick={() => handlePayment(parcel._id)}
                        >
                            Pay
                        </button>

                        <button
                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>

                        <button
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                            onClick={() => handleDelete(parcel._id)}
                        >
                            Delete
                        </button>

                    </div>
                </div>
            ))}

        </div>
    )
}

export default MyParcels