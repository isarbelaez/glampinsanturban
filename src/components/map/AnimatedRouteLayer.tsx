import { useEffect, useRef, useState } from 'react';
import { useMap } from '@/components/ui/map';
import { ANIMATION_DURATION, LOOP_PAUSE, fetchRouteData } from '@/lib/route';
import type { GeoJSONSource } from 'maplibre-gl';

const SOURCE_ID = 'animated-route';
const LAYER_ID = 'animated-route-line';
const GLOW_LAYER_ID = 'animated-route-glow';

/**
 * Interpolates along a multi-segment polyline.
 * t ∈ [0, 1] → returns all coordinates from start up to point t.
 */
function interpolateRoute(coords: [number, number][], t: number): [number, number][] {
  if (t <= 0) return [coords[0]];
  if (t >= 1) return [...coords];

  const segmentLengths: number[] = [];
  let totalLength = 0;

  for (let i = 1; i < coords.length; i++) {
    const dx = coords[i][0] - coords[i - 1][0];
    const dy = coords[i][1] - coords[i - 1][1];
    const len = Math.sqrt(dx * dx + dy * dy);
    segmentLengths.push(len);
    totalLength += len;
  }

  const targetDist = t * totalLength;
  let accumulated = 0;

  const result: [number, number][] = [coords[0]];

  for (let i = 0; i < segmentLengths.length; i++) {
    if (accumulated + segmentLengths[i] >= targetDist) {
      const remaining = targetDist - accumulated;
      const fraction = remaining / segmentLengths[i];
      const lng = coords[i][0] + (coords[i + 1][0] - coords[i][0]) * fraction;
      const lat = coords[i][1] + (coords[i + 1][1] - coords[i][1]) * fraction;
      result.push([lng, lat]);
      return result;
    }
    accumulated += segmentLengths[i];
    result.push(coords[i + 1]);
  }

  return result;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface AnimatedRouteLayerProps {
  animate: boolean;
}

export function AnimatedRouteLayer({ animate }: AnimatedRouteLayerProps) {
  const { map, isLoaded } = useMap();
  const animFrameRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [routeFeature, setRouteFeature] = useState<GeoJSON.Feature<GeoJSON.LineString> | null>(
    null
  );

  // Fetch route data
  useEffect(() => {
    fetchRouteData().then((feature) => {
      if (feature) {
        setRouteFeature(feature);
      }
    });
  }, []);

  useEffect(() => {
    if (!map || !isLoaded || !routeFeature) return;

    const initialGeojson: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [routeFeature.geometry.coordinates[0]],
          },
        },
      ],
    };

    if (!map.getSource(SOURCE_ID)) {
      map.addSource(SOURCE_ID, { type: 'geojson', data: initialGeojson });

      map.addLayer({
        id: GLOW_LAYER_ID,
        type: 'line',
        source: SOURCE_ID,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#4ade80',
          'line-width': 10,
          'line-opacity': 0.15,
          'line-blur': 8,
        },
      });

      map.addLayer({
        id: LAYER_ID,
        type: 'line',
        source: SOURCE_ID,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#22c55e',
          'line-width': 3.5,
          'line-opacity': 0.9,
        },
      });
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      try {
        if (map.getLayer(LAYER_ID)) map.removeLayer(LAYER_ID);
        if (map.getLayer(GLOW_LAYER_ID)) map.removeLayer(GLOW_LAYER_ID);
        if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
      } catch {
        // ignore
      }
    };
  }, [map, isLoaded, routeFeature]);

  // Animation
  useEffect(() => {
    if (!map || !isLoaded || !animate || !routeFeature) return;

    const source = map.getSource(SOURCE_ID) as GeoJSONSource | undefined;
    if (!source) return;

    const coords = routeFeature.geometry.coordinates as [number, number][];

    function runAnimation() {
      const startTime = performance.now();

      function frame(now: number) {
        const elapsed = now - startTime;
        const rawT = Math.min(elapsed / ANIMATION_DURATION, 1);
        const t = easeInOutCubic(rawT);

        const currentCoords = interpolateRoute(coords, t);

        source!.setData({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: { type: 'LineString', coordinates: currentCoords },
            },
          ],
        });

        if (rawT < 1) {
          animFrameRef.current = requestAnimationFrame(frame);
        } else {
          timeoutRef.current = setTimeout(() => {
            source!.setData({
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: [coords[0]],
                  },
                },
              ],
            });
            runAnimation();
          }, LOOP_PAUSE);
        }
      }

      animFrameRef.current = requestAnimationFrame(frame);
    }

    runAnimation();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [map, isLoaded, animate, routeFeature]);

  return null;
}
