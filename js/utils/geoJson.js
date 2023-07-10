export function handleFileSelect(evt, map) {
    let file = evt.target.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        let geojson = JSON.parse(e.target.result);

        L.geoJSON(geojson, {
            style: function (feature) {
                return { color: 'red' };
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup("Triangle");
            }
        }).addTo(map);
    };

    reader.readAsText(file);
}
