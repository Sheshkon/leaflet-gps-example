import {setCoords} from "./utils/utils.js";

let markerOnline, circleOnline, zoomedOnline


const onlineMap = L.map('online-map');
// Initializes map

onlineMap.setView([53.893009, 27.567444], 13);
// Sets initial coordinates and zoom level

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '© OpenStreetMap'
}).addTo(onlineMap);

setTimeout(()=> {
        ({markerOffline: markerOnline, circleOffline: circleOnline, zoomedOnline} = setCoords(onlineMap, markerOnline, circleOnline, zoomedOnline))
    }
    ,1000);

