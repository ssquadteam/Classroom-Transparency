import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './SchoolLocation.css';

const SchoolLocation = () => {
    useEffect(() => {
        // Initialize the map with interactions disabled
        const map = L.map('mapContainer', {
            dragging: false,
            zoomControl: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            touchZoom: false,
            boxZoom: false,
            keyboard: false
        }).setView([22.708389, 90.359921], 15);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Create a default icon
        const defaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        });

        // Add a marker at the center
        L.marker([22.708389, 90.359921], { icon: defaultIcon })
            .addTo(map)
            .bindPopup('Jahanara Israil School & College, 999 College Row, Barishal 8200');

        // Add the custom control button for Virtual Tour
        const customControl = L.Control.extend({
            options: {
                position: 'topright'
            },
            onAdd: function (map) {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                container.innerHTML = '<button class="custom-button">Virtual Tour</button>';
                container.onclick = function () {
                    window.open('https://earth.google.com/web/search/Jahanara+Israil+School+%26+College,+College+Row,+Barishal/@22.70826942,90.35979357,14.48759842a,0d,60y,16.99957857h,92.7106783t,0r/data=CqYBGngScgolMHgzNzU1MzQxOTRiOTZlNDRiOjB4OTYyYmNmNGU2ZWRmY2IyZhm8tac_VrU2QCHRihRvCZdWQCo3SmFoYW5hcmEgSXNyYWlsIFNjaG9vbCAmIENvbGxlZ2UsIENvbGxlZ2UgUm93LCBCYXJpc2hhbBgBIAEiJgokCXb9PGzNrjpAEXn9PGzNrjrAGY9ebC5-2kVAIWFSV8dCdFDAQgIIASIaChZod2llUi14Q0pXcjh4eFFGZlNGUXNnEAI6AwoBMEoNCP___________wEQAA', '_blank');
                }
                return container;
            }
        });

        map.addControl(new customControl());

    }, []);

    return <div id="mapContainer" style={{ height: '400px', width: '100%' }} />;
};

export default SchoolLocation;