export function initializeButtons(map, createBtnId, doneBtnId, clearBtnId, polygonLayer) {
    const createButton = document.getElementById(createBtnId);
    const doneButton = document.getElementById(doneBtnId);
    const clearButton = document.getElementById(clearBtnId);

    let creatingPolygon = false;
    let polygonCoordinates = [];
    let polygons = [];

    doneButton.disabled = true;

    createButton.addEventListener('click', function() {
        creatingPolygon = true;
        polygonCoordinates = [];
        polygonLayer.setLatLngs(polygonCoordinates);
        doneButton.disabled = false;
        createButton.disabled = true;
    });

    doneButton.addEventListener('click', function() {
        if (creatingPolygon) {
            creatingPolygon = false;
            if (polygonCoordinates.length > 2) {
                const polygon = L.polygon(polygonCoordinates, { color: 'green' }).addTo(map);
                polygons.push(polygon);
                doneButton.disabled = true;
                createButton.disabled = false;
            }
            else if (polygonCoordinates.length === 0)
            {
                doneButton.disabled = true;
                createButton.disabled = false;
            }
        }
    });

    clearButton.addEventListener('click', function() {
        if (creatingPolygon) {
            /*map.removeLayer(polygonLayer);*/
            creatingPolygon = false;
            polygonCoordinates = [];
            doneButton.disabled = true;
            createButton.disabled = false;
            polygonCoordinates = [];
            polygonLayer.setLatLngs(polygonCoordinates);
        }
        else if (polygons.length > 0) {
            map.removeLayer( polygons[polygons.length-1]);
            polygons.pop();
            polygonCoordinates = [];
            polygonLayer.setLatLngs(polygonCoordinates);
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
