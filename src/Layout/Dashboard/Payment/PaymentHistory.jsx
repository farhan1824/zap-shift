import { useQuery } from '@tanstack/react-query'
import React, { use } from 'react'
import { AxiosHook } from '../../../Hooks/AxiosHook'
import { AuthCotext } from '../../../Context/Authentication/AuthCotext'
import Loading from '../../../Components/Loading/Loading'

export const PaymentHistory = () => {
    const { user } = use(AuthCotext)
    const axios = AxiosHook()

    const { data: paymentHistory = [], isPending } = useQuery({
        queryKey: ["payments", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`/payments?email=${user.email}`)
            return res.data
        }
    })

    if (isPending) {
        return <Loading></Loading>
        // return <p className="text-center mt-10">Loading payment history...</p>
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4 text-black">

            <h2 className="text-3xl font-bold mb-6 ">
                Payment History
            </h2>

            {paymentHistory.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg shadow">
                    <p className="text-gray-500">No payment history found</p>
                </div>
            ) : (

                <div className="overflow-x-auto bg-white shadow-md rounded-xl">

                    <table className="table w-full">

                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th>#</th>
                                <th>Tracking ID</th>
                                <th>Parcel ID</th>
                                <th>Amount</th>
                                <th>Transaction ID</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {paymentHistory.map((payment, index) => (
                                <tr key={payment._id} className="hover">

                                    <td>{index + 1}</td>

                                    <td className="font-mono text-xs">
                                        {payment.tracking_id}
                                    </td>
                                    <td className="font-mono text-xs">
                                        {payment.parcelId}
                                    </td>

                                    <td className="font-semibold">
                                        ${payment.amount / 100}
                                    </td>

                                    <td className="font-mono text-xs">
                                        {payment.transactionId}
                                    </td>

                                    <td className="capitalize">
                                        {payment.paymentMethod}
                                    </td>

                                    <td>
                                        {new Date(payment.paid_at).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            Paid
                                        </span>
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