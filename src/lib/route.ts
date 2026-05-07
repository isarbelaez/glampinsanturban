export const BUCARAMANGA_COORDS: [number, number] = [-73.1227, 7.1193];
export const GLAMPING_COORDS: [number, number] = [-72.8506, 7.2191];

export const MAP_CENTER: [number, number] = [
  (BUCARAMANGA_COORDS[0] + GLAMPING_COORDS[0]) / 2,
  (BUCARAMANGA_COORDS[1] + GLAMPING_COORDS[1]) / 2,
];

export const ANIMATION_DURATION = 5000; // 5 seconds for the full route
export const LOOP_PAUSE = 8000;

/**
 * Fetches the driving route from OSRM API
 */
export async function fetchRouteData(): Promise<GeoJSON.Feature<GeoJSON.LineString> | null> {
  const url = `https://router.project-osrm.org/route/v1/driving/${BUCARAMANGA_COORDS[0]},${BUCARAMANGA_COORDS[1]};${GLAMPING_COORDS[0]},${GLAMPING_COORDS[1]}?overview=full&geometries=geojson`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.code === 'Ok' && data.routes.length > 0) {
      return {
        type: 'Feature',
        properties: {},
        geometry: data.routes[0].geometry,
      };
    }
  } catch (error) {
    console.error("Error fetching route from OSRM:", error);
  }
  return null;
}
