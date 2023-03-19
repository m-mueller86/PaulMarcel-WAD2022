import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { Component } from 'react';
import { Icon } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './MapView.css'

const customIcon = new Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [50, 60],
    iconAnchor: [20, 30]
});

const defaultIcon = new Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [30, 40],
    iconAnchor: [20, 40]
});

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: { lat: 52.52437, lng: 13.41053 },
            zoom: 12,
        };
    }

    render() {
        const { currentLocation, zoom } = this.state;
        const { locations, hoveredLocation } = this.props;

        return (
            <main>
                <MapContainer center={currentLocation} zoom={zoom}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {locations.map((location) => (
                        <Marker
                            key={location._id}
                            position={[location.lat, location.lon]}
                            icon={hoveredLocation === location ? customIcon : defaultIcon}
                        >
                            <Popup>{location.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </main>
        );
    }
}

export default MapView;
