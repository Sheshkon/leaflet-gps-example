export function initializeButtons(map, createBtnId, doneBtnId, clearBtnId, polygonLayer) {
    const createButton = document.getElementById(createBtnId);
    const doneButton = document.getElementById(doneBtnId);
    const clearButton = document.getElementById(clearBtnId);

    let creatingPolygon = false;
    let polygonCoordinates = [];
    let polygons = [];

    createButton.addEventListener('click', function() {
        creatingPolygon = true;
        polygonCoordinates = [];
        polygonLayer.setLatLngs(polygonCoordinates);
        createButton.style.backgroundColor = "green";
        doneButton.style.backgroundColor = "red";
    });

    doneButton.addEventListener('click', function() {
        if (creatingPolygon) {
            creatingPolygon = false;
            if (polygonCoordinates.length > 2) {
                const polygon = L.polygon(polygonCoordinates, { color: 'green' }).addTo(map);
                polygons.push(polygon);
            }
        }
    });

    clearButton.addEventListener('click', function() {
        if (polygons.length > 0) {
            polygons.forEach(polygon => {
                map.removeLayer(polygon);
            });
            polygons = [];
        }
        if (creatingPolygon) {
            map.removeLayer(polygonLayer);
            creatingPolygon = false;
            polygonCoordinates = [];
            createButton.style.backgroundColor = "";
            doneButton.style.backgroundColor = "";
        }
    });

    function handleMapClick(e) {
        if (creatingPolygon) {
            const latlng = e.latlng;
            polygonCoordinates.push(latlng);
            polygonLayer.setLatLngs(polygonCoordinates);
        }
    }

    map.on('click', handleMapClick);
}
