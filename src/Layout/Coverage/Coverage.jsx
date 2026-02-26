import { useState } from 'react'
import { useLoaderData } from 'react-router'
import WarehouseMap from './WarehouseMap'
import Swal from 'sweetalert2'

export const Coverage = () => {
    const warehouses = useLoaderData()
    const [search, setSearch] = useState('')
    const [focusLocation, setFocusLocation] = useState(null)

    const handleSearch = (value) => {
        setSearch(value)

        if (!value.trim()) {
            setFocusLocation(null)
            return
        }

        const query = value.toLowerCase()

        const matchedWarehouse = warehouses.find((wh) =>
            wh.district?.toLowerCase().includes(query) ||
            wh.city?.toLowerCase().includes(query) ||
            wh.covered_area?.some(area =>
                area.toLowerCase().includes(query)
            )
        )

        if (matchedWarehouse) {
            setFocusLocation({
                lat: matchedWarehouse.latitude,
                lng: matchedWarehouse.longitude,
            })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Service Unavailable',
                text: 'Services in that location are not available',
                confirmButtonColor: '#000',
            })
        }
    }
    return (
        <section className="text-black px-4 md:px-8 lg:px-12 py-8 flex flex-col gap-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                    We are available in all 64 districts
                </h1>
                <p className="text-gray-600">
                    Search by district, city, or covered area
                </p>
            </div>

            <div className="max-w-md">
                <label className="input bg-white rounded-full flex items-center gap-2 px-4 py-2 shadow-sm border border-gray-200">
                    <input
                        type="search"
                        placeholder="Search district, city, area…"
                        className="w-full bg-transparent outline-none text-sm"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </label>
            </div>

            <div className="h-106.5 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <WarehouseMap
                    warehouses={warehouses}
                    focusLocation={focusLocation}
                />
            </div>
        </section>
    )
}