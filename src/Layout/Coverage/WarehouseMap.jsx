import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useLoaderData } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet default marker icon
const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper to fit all markers
function FitBounds({ locations }) {
    const map = useMap();
    const bounds = locations
        .filter((loc) => loc.latitude != null && loc.longitude != null)
        .map((loc) => [loc.latitude, loc.longitude]);
    if (bounds.length > 0) map.fitBounds(bounds, { padding: [50, 50] });
    return null;
}

export default function WarehouseMap() {
    const warehouses = useLoaderData();

    return (
        <div className="w-full h-screen relative">
            {/* Map */}
            <MapContainer
                center={[23.685, 90.356]} // Center of Bangladesh
                zoom={7}
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
                <FitBounds locations={warehouses} />
            </MapContainer>
        </div>
    );
}