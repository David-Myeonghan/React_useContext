import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

export const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
export class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: -27.247973,
      lng: 153.100912
    },
    zoom: 14
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD4f5J4uXn-zhLO_uZTzwA0frbe8w0cpxc' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={-27.247973}
            lng={153.100912}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;