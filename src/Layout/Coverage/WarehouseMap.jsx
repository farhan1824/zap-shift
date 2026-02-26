import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { useEffect } from 'react';
import { MdAddLocation } from "react-icons/md";
import ReactDOMServer from 'react-dom/server'

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
// const DefaultIcon = L.divIcon({
//     html: ReactDOMServer.renderToString(
//         <div style={{ fontSize: '32px' }}>
//             < MdAddLocation />
//         </div>
//     ),
//     className: '', // remove default Leaflet styles
//     iconSize: [24, 24],
//     iconAnchor: [12, 12], // center the icon
// })


L.Marker.prototype.options.icon = DefaultIcon;
// for location flying
function FlyController({ focusLocation, locations }) {
    const map = useMap()

    useEffect(() => {
        const bounds = locations
            .filter(loc => loc.latitude != null && loc.longitude != null)
            .map(loc => [loc.latitude, loc.longitude])

        if (focusLocation) {
            map.flyTo(
                [focusLocation.lat, focusLocation.lng],
                // this controls how much zoom will i have
                15,
                { duration: 1.5 }
            )
        } else if (bounds.length > 0) {
            map.flyToBounds(bounds, {
                padding: [10, 10],
                duration: 1.5,
            })
        }
    }, [focusLocation, locations, map])

    return null
}

export default function WarehouseMap({ warehouses, focusLocation }) {
    // const warehouses = useLoaderData();

    return (
        <div className="w-full h-106.5  relative">
            {/* Map */}
            <MapContainer
                center={[23.685, 90.356]} // Center of Bangladesh
                zoom={1}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Markers */}
                {warehouses
                    .filter((wh) => wh.latitude != null && wh.longitude != null)
                    .map((wh, idx) => (
                        <Marker
                            key={idx}
                            position={[wh.latitude, wh.longitude]}
                            icon={DefaultIcon}
                        >
                            <Popup>
                                <div className="font-bold">{wh.city}</div>
                                <div className="text-sm">
                                    District: {wh.district}
                                    <br />
                                    Covered Areas: {wh.covered_area.join(', ')}
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                {/* Fit map bounds */}
                <FlyController
                    focusLocation={focusLocation}
                    locations={warehouses}
                />
            </MapContainer>
        </div>
    );
}