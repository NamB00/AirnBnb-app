'use client';

import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map = ({ center }) => {
	return (
		<MapContainer center={center || [51, -0.09]} zoom={center ? 4 : 2} scrollWheelZoom={false} className="h-[35vh] rounded-lg">
			<TileLayer url={url} attribution={attribution} />
			{center && <Marker position={center} />}
		</MapContainer>
	);
};

export default Map;

