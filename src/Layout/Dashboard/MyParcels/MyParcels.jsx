import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { AuthCotext } from '../../../Context/Authentication/AuthCotext'
import { AxiosHook } from '../../../Hooks/AxiosHook'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading/Loading'

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
        return <Loading></Loading>
        // return <p className="text-black">Loading parcels...</p>
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
        navigate(`/dashboard/payment/${id}`)
    }

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold text-black mb-6">
                My Parcels ({MyParcelData.length})
            </h2>

            {MyParcelData.length === 0 ? (
                <p className="text-gray-600">No parcels found.</p>
            ) : (

                <div className="overflow-x-auto bg-white rounded-lg shadow">

                    <table className="table w-full text-black">

                        <thead className="bg-gray-100 text-black">
                            <tr>
                                <th>#</th>
                                <th>Tracking ID</th>
                                <th>Sender</th>
                                <th>Receiver</th>
                                <th>Created</th>
                                <th>Payment</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>

                            {MyParcelData.map((parcel, index) => (

                                <tr key={parcel._id} className="hover">

                                    <td>{index + 1}</td>

                                    <td className="font-mono text-xs">
                                        {parcel.tracking_id}
                                    </td>

                                    <td>{parcel.senderName}</td>

                                    <td>{parcel.receiverName}</td>

                                    <td>
                                        {new Date(parcel.creation_date).toLocaleString(undefined, {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>

                                    <td>
                                        {parcel.payment_status === "paid" ? (
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                Paid
                                            </span>
                                        ) : (
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                onClick={() => handlePayment(parcel._id)}
                                            >
                                                Pay
                                            </button>
                                        )}
                                    </td>

                                    <td>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(parcel._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    )
}

export default MyParcels