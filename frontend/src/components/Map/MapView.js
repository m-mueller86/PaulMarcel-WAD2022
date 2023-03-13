import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './MapView.css'

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: { lat: 52.52437, lng: 13.41053 },
            zoom: 12,
        }
    }

    render() {
        const { currentLocation, zoom } = this.state;

        return (
            <main>
                <MapContainer center={currentLocation} zoom={zoom}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={[52.4918007, 13.3917255]} />
                </MapContainer>
            </main>
        );
    }
}
export default MapView;