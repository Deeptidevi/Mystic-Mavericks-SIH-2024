// Function to generate random data for bus health
function generateBusData(busId) {
    const engineStatus = Math.random() < 0.9 ? 'Good' : 'Needs Maintenance';
    const mileage = Math.floor(Math.random() * 100000) + 50000; // Between 50,000 and 150,000
    const fuelLevel = Math.floor(Math.random() * 100) + 1; // Between 1 and 100
    const busNames = ['Speedy', 'Thunderbolt', 'Cruiser', 'Voyager', 'Comet', 'Stardust'];
    const busName = busNames[Math.floor(Math.random() * busNames.length)];
    const locations = ['City Center', 'Downtown', 'Suburb', 'Airport', 'Shopping Mall', 'University', 'Beach', 'Industrial Park', 'Sports Stadium', 'Central Station'];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const sos = Math.random() < 0.5 ? 'Yes' : 'No'; // 50% chance of SOS
    const sosReasons = ['Girl Harassment', 'Tire Puncture', 'Engine Failure', 'Medical Emergency', 'Accident'];
    const sosReason = sos === 'Yes' ? sosReasons[Math.floor(Math.random() * sosReasons.length)] : 'None';
    const weather = Math.random() < 0.5 ? 'Dry' : 'Rainy'; // 50% chance of each weather condition

    return {
        engineStatus,
        mileage,
        fuelLevel,
        busName,
        location,
        sos,
        sosReason,
        weather
    };
}

// Function to update bus health information
function updateBusHealth(busId) {
    const { engineStatus, mileage, fuelLevel, busName, location, sos, sosReason, weather } = generateBusData(busId);

    document.getElementById(`engine-${busId}`).textContent = engineStatus;
    document.getElementById(`mileage-${busId}`).textContent = `${mileage.toLocaleString()} km`;
    document.getElementById(`fuel-${busId}`).textContent = `${fuelLevel}%`;
    document.querySelector(`.bus:nth-child(${busId - 100}) h2`).textContent = `Bus ${busId} - ${busName}`;
    
    // Add or update location information
    let locationElement = document.querySelector(`.bus:nth-child(${busId - 100}) .location-status`);
    if (!locationElement) {
        locationElement = document.createElement('div');
        locationElement.className = 'status location-status';
        const busElement = document.querySelector(`.bus:nth-child(${busId - 100})`);
        busElement.appendChild(locationElement);
    }
    locationElement.innerHTML = `<span>📍 Location: ${location}</span>`;

    // Add color coding for engine status
    const engineElement = document.getElementById(`engine-${busId}`);
    engineElement.style.color = engineStatus === 'Good' ? 'green' : 'red';

    // Update SOS status and trigger alert if needed
    const sosElement = document.getElementById(`sos-${busId}`);
    sosElement.textContent = sos;
    sosElement.style.color = sos === 'Yes' ? 'red' : 'green';

    // Add or update SOS reason information
    let sosReasonElement = document.querySelector(`.bus:nth-child(${busId - 100}) .sos-reason-status`);
    if (!sosReasonElement) {
        sosReasonElement = document.createElement('div');
        sosReasonElement.className = 'status sos-reason-status';
        const busElement = document.querySelector(`.bus:nth-child(${busId - 100})`);
        busElement.appendChild(sosReasonElement);
    }
    sosReasonElement.innerHTML = `<span>🚨 SOS Reason: ${sosReason}</span>`;

    // Add or update weather information
    let weatherElement = document.querySelector(`.bus:nth-child(${busId - 100}) .weather-status`);
    if (!weatherElement) {
        weatherElement = document.createElement('div');
        weatherElement.className = 'status weather-status';
        const busElement = document.querySelector(`.bus:nth-child(${busId - 100})`);
        busElement.appendChild(weatherElement);
    }
    weatherElement.innerHTML = `<span>🌤️ Weather: ${weather}</span>`;

    if (sos === 'Yes') {
        alert(`SOS Alert: Bus ${busId} needs immediate assistance at ${location}! Reason: ${sosReason}`);
        
        // In case of girl harassment, notify the nearest police station
        if (sosReason === 'Girl Harassment') {
            notifyPolice(busId, location);
        }
        
        // In case of medical emergency, call an ambulance
        if (sosReason === 'Medical Emergency') {
            callAmbulance(busId, location);
        }

        // In case of hospital assistance needed, call an ambulance
        if (sosReason === 'Accident') {
            callAmbulance(busId, location);
        }
    }
}

// Function to notify police in case of girl harassment
function notifyPolice(busId, location) {
    // This is a placeholder function. In a real-world scenario, this would involve
    // contacting the nearest police station through an appropriate communication channel.
    console.log(`Urgent: Notifying nearest police station about girl harassment incident on Bus ${busId} at ${location}`);
    alert(`Police have been notified about the girl harassment incident on Bus ${busId} at ${location}`);
}

// Function to call ambulance in case of medical emergency or hospital assistance needed
function callAmbulance(busId, location) {
    // This is a placeholder function. In a real-world scenario, this would involve
    // contacting the nearest ambulance service through an appropriate communication channel.
    console.log(`Urgent: Calling ambulance for medical emergency or hospital assistance on Bus ${busId} at ${location}`);
    alert(`Ambulance has been called for the medical emergency or hospital assistance on Bus ${busId} at ${location}`);
}

// Function to update all buses
function updateAllBuses() {
    for (let i = 101; i <= 103; i++) {
        updateBusHealth(i);
    }
}

// Initial update
updateAllBuses();

// Set interval to update every 10 seconds
setInterval(updateAllBuses, 10000);