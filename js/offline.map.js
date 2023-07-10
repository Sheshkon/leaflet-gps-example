import {setCoords} from './utils/utils.js';
import {initializeButtons} from './utils/polygon.js';
import {handleFileSelect} from './utils/geoJson.js'

let markerOffline, circleOffline, zoomedOffline;

const offlineMap = L.map('offline-map');
const polygonLayer = L.polygon([], {color: 'red'}).addTo(offlineMap);
// Initializes map

offlineMap.setView([53.893009, 27.567444], 13);
// Sets initial coordinates and zoom level

L.tileLayer('assets/Minsk/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(offlineMap);
// Sets map data source and associates with map


setTimeout(() => {
        ({markerOffline, circleOffline, zoomedOffline} =
            setCoords(offlineMap, markerOffline, circleOffline, zoomedOffline))
    }
    , 1000);

initializeButtons(offlineMap,
    'createOfflinePolygonBtn',
    'doneOfflinePolygonBtn',
    'clearOfflinePolygonBtn',
    polygonLayer);

document.getElementById('offlineGeoJsonFile').addEventListener('change',function (evt){
    handleFileSelect(evt, offlineMap);
}, false);
