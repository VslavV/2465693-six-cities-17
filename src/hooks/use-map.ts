import { MapSetting } from '../const';
import { Map, TileLayer } from 'leaflet';
import { CityOffer } from '../types/offer';
import {useEffect, useState, useRef, MutableRefObject} from 'react';

function useMap(mapRef:MutableRefObject<HTMLElement | null>, city:CityOffer, shouldZoomOnScroll:boolean):Map|null {
  const [map, setMap] = useState<Map|null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(()=> {
    if (map) {
      map.flyTo({
        lat: city.location.latitude,
        lng: city.location.longitude,
      });
    }
  }, [city, map]);

  useEffect(()=>{
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
        scrollWheelZoom: shouldZoomOnScroll,
      });

      const layer = new TileLayer(
        MapSetting.URL,
        {
          attribution: MapSetting.Atribution,
        }
      );
      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city, shouldZoomOnScroll]);

  return map;
}

export default useMap;
