"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import customMapStyles from "./mapStyles.json";

interface GoogleMapViewProps {
  lat: number;
  lng: number;
  title?: string;
  pinIconUrl?: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleMapView = ({ lat, lng, title, pinIconUrl }: GoogleMapViewProps) => {
  const [markerIcon, setMarkerIcon] = useState<google.maps.Icon | undefined>(undefined);

  const handleMapLoad = () => {
    if (pinIconUrl && window.google) {
      const absoluteUrl = pinIconUrl.startsWith("/")
        ? `${window.location.origin}${pinIconUrl}`
        : pinIconUrl;

      setMarkerIcon({
        url: absoluteUrl,
        scaledSize: new window.google.maps.Size(80, 80),
      });
    }
  };

  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    return <p>Ubicación no disponible</p>;
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat, lng }}
        zoom={15}
        onLoad={handleMapLoad}
        options={{
          styles: customMapStyles,
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        <Marker position={{ lat, lng }} title={title} icon={markerIcon} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapView;