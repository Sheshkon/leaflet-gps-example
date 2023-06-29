import {coords} from "./gps.js";


export function setCoords(map, marker, circle, zoomed){

    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }
    // Removes any existing marker and circle (new ones about to be set)

    marker = L.marker([coords.lat, coords.lng]).addTo(map);
    //circle = L.circle([coords.lat, coords.lng], { radius: coords.accuracy }).addTo(map);
    // Adds marker to the map and a circle for accuracy

    /*if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
    }*/
    // Set zoom to boundaries of accuracy circle

    map.setView([coords.lat, coords.lng]);
    // Set map focus to current user position

    return {marker, circle, zoomed}
}
