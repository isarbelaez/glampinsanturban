import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/map";
import { AnimatedRouteLayer } from "@/components/map/AnimatedRouteLayer";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import {
  MAP_CENTER,
  GLAMPING_COORDS,
  BUCARAMANGA_COORDS,
} from "@/lib/route";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useMap } from "@/components/ui/map";
import maplibrePkg from "maplibre-gl";
const { AttributionControl } = maplibrePkg;
import { MapDebug } from "./MapDebug";

function AttributionRelocator() {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    // Remover el AttributionControl por defecto (siempre está en _controls)
    const controls: any[] = (map as any)._controls ?? [];
    const existing = controls.find(
      (c) => c instanceof AttributionControl
    );
    if (existing) map.removeControl(existing);

    // Agregar el control en la posición correcta (top-left)
    const attribution = new AttributionControl({ compact: true });
    map.addControl(attribution, "top-left");

    return () => {
      map.removeControl(attribution);
    };
  }, [map, isLoaded]);

  return null;
}


function MapAdjuster() {
  const { map, isLoaded } = useMap();  

  useEffect(() => {
    if (!map || !isLoaded) return;

    const updateLayout = () => {
      const isDesktop = window.innerWidth >= 768;
      
      if (!isDesktop) {
        // En mobile: deshabilitar interacción
        map.dragPan.disable();
        map.scrollZoom.disable();
        map.touchZoomRotate.disable();
        map.doubleClickZoom.disable();
        
        // jumpTo replica la vista EXACTAMENTE como se capturó en MapDebug
        map.jumpTo({
          center: [-72.910102, 7.395156],
          zoom: 9.50,
          bearing: 14.39,
          pitch: 0,
        });
      } else {
        // En desktop: permitir interacción
        map.dragPan.enable();
        map.scrollZoom.enable();
        map.touchZoomRotate.enable();
        map.doubleClickZoom.enable();

        // jumpTo replica la vista EXACTAMENTE como se capturó en MapDebug
        map.jumpTo({
          center: [-72.971587, 7.173451],
          zoom: 10.43,
          bearing: 14.94,
          pitch: 0,
          padding: { left: 550, right: 0, top: 0, bottom: 0 },
        });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [map, isLoaded]);

  return null;
}

function GradientOverlay() {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    // Inyectamos el gradiente DENTRO del contenedor del canvas de MapLibre.
    // Esto asegura que quede por ENCIMA del mapa base pero por DEBAJO de los popups/markers.
    const canvasContainer = map.getCanvasContainer();
    const div = document.createElement("div");
    // En mobile: gradiente de arriba a la izquierda a abajo. En desktop: gradiente de izquierda a derecha.
    div.className =
      "pointer-events-none absolute inset-0 z-10 " +
      "bg-[radial-gradient(circle_at_top_left,theme(colors.background)_15%,transparent_70%)]";
    canvasContainer.appendChild(div);

    return () => {
      div.remove();
    };
  }, [map, isLoaded]);

  return null;
}

export function MapComponent({ className }: { className?: string }) {
  const { ref, hasTriggered } = useInViewAnimation(0.3);

  return (
    <div ref={ref} className={cn("h-full w-full", className)}>
      <Map
        center={[-72.971587, 7.173451]}
        zoom={10.43}
        pitch={0}
        bearing={14.94}
        minZoom={8.0}
        maxZoom={12}
        maxBounds={[
          [-74.5, 5.5],
          [-71.5, 8.5],
        ]}
        className="h-full w-full"
      >
        <AttributionRelocator />
        <MapDebug />
        <MapAdjuster />
        <GradientOverlay />
        <AnimatedRouteLayer animate={hasTriggered} />

        {/* Marker origin: Bucaramanga */}
        <MapMarker
          longitude={BUCARAMANGA_COORDS[0]}
          latitude={BUCARAMANGA_COORDS[1]}
        >
          <MarkerContent>
            <div className="map-marker-origin">
              <span className="map-marker-origin-dot" />
            </div>
          </MarkerContent>
        </MapMarker>

        {/* Marker destination: Glamping */}
        <MapMarker
          longitude={GLAMPING_COORDS[0]}
          latitude={GLAMPING_COORDS[1]}
        >
          <MarkerContent>
            <div className="map-marker-glamping">
              <span className="map-marker-pulse" />
              <span className="map-marker-glamping-dot" />
            </div>
          </MarkerContent>
          <MarkerPopup
            anchor="left"
            offset={20}
            className="glamping-popup"
          >
            <div className="glamping-popup-content bg-background/95 border-border">
              <h4 className="text-foreground">Glamping Santurbán</h4>
              <p className="text-muted-foreground">Tu refugio en el páramo</p>
              <div className="glamping-popup-actions">
                <a
                  href="https://maps.app.goo.gl/3A74Y9E7A3J5bQx88"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                >
                  Google Maps
                </a>
                <a
                  href={`https://waze.com/ul?ll=${GLAMPING_COORDS[1]},${GLAMPING_COORDS[0]}&navigate=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent/10 text-accent-foreground hover:bg-accent/20"
                >
                  Waze
                </a>
              </div>
            </div>
          </MarkerPopup>
        </MapMarker>
      </Map>
    </div>
  );
}