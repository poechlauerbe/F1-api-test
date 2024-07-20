const apiString = '/api/singledriver?driverNumber=';
let allDrivers = [];
let actualDriver = 0;

// const driverImage = document.createElement('img');
// driverImage.src = driver['photo_url'];
// driversSelect.appendChild(driverImage);

const getDrivers = () => {
	fetch('/api/drivers')
	.then(response => response.json())
	.then(data => {
		const driversSelect = document.getElementById('drivers');
		driversSelect.innerHTML = '';
		allDrivers = [];
		const firstElement = document.createElement('option');
		firstElement.text = 'Select a driver';
		firstElement.value = 0;
		driversSelect.appendChild(firstElement);
		data.forEach(driver => {
			const driverElement = document.createElement('option');
			driverElement.text = `${driver['number']} - ${driver['name']}`;
			driverElement.value = driver['number'];
			driversSelect.appendChild(driverElement);
			allDrivers.push(driver);
		});
	})
	.catch(error => {
		console.error('Error fetching drivers:', error);
	});
}

const loadSite = () => {
	if (!actualDriver || actualDriver == '0')
		return;
	let totalApiString = apiString + actualDriver;
	fetch(totalApiString)
	.then(response => response.json())
	.then(data => {
		const driverDiv = document.getElementById('singledriver');
		driverDiv.innerHTML = '';
		data.forEach(driverinfo => {
			const driverElem = document.createElement('p');
			driverElem.innerHTML = `Date: ${driverinfo['date']}: Number: ${driverinfo['number']}, gear: ${driverinfo['gear']}, speed: ${driverinfo['speed']}, throttle: ${driverinfo['throttle']}, brake: ${driverinfo['brake']}, drs: ${driverinfo['drs']}, rpm: ${driverinfo['rpm']}`;
			driverDiv.appendChild(driverElem);
		});
	})
	.catch(error => {
		console.error('Error fetching single driver infos:', error);
	});
};

document.addEventListener('DOMContentLoaded', () => {
	getDrivers();
    loadSite();
    setInterval(loadSite, 3000);
});

document.getElementById('drivers').addEventListener('change', function() {
	actualDriver = this.value;
	const driverDiv = document.getElementById('singledriver');
	driverDiv.innerHTML = '';
	loadSite();
})