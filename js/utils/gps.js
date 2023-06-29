let lat = 0;
let lng = 0;
let accuracy = 0;
export const coords ={
    lat,
    lng,
    accuracy
}

const options = {
    enableHighAccuracy: true,
// Get high accuracy reading, if available (default false)
    timeout: 5000,
// Time to return a position successfully before error (default infinity)
    maximumAge: 2000,
// Milliseconds for which it is acceptable to use cached position (default 0)
};

navigator.geolocation.watchPosition(success, error, options);


function error(err) {
    if (err.code === 1) {
        alert("Please allow geolocation access");
// Runs if user refuses access
    } else {
        alert("Cannot get current location");
// Runs if there was a technical problem.
    }
}

// Fires success function immediately and when user position changes
function success(pos) {
    coords.lat = pos.coords.latitude;
    coords.lng = pos.coords.longitude;
    coords.accuracy = pos.coords.accuracy; // Accuracy in metres
    document.getElementById('output').innerText = `
        User coordinates: 
        Latitude ${coords.lat}.
        Longitude ${coords.lng}.
        Estimation accurate within ${Math.round(coords.accuracy)} metres.`;
}
