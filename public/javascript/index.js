import { options, options2 } from "./services/mod_options.js";

let first_item = '';

const countdown = () => {
	let countdownDiv = document.getElementById('countdown');
	countdownDiv.innerHTML = '';
	let startTime = new Date(first_item['start']);
	let actualTime = new Date();
	let rest = startTime - actualTime;
	const days = Math.floor(rest / (24 * 60 * 60 * 1000));
	const hours = Math.floor((rest % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
	const minutes = Math.floor((rest % (60 * 60 * 1000)) / (60 * 1000));
	const seconds = Math.floor((rest % (60 * 1000)) / 1000);
	let timeString = 'Countdown to next event: ';
	if (days > 0)
		timeString += days + "days "
	if (hours < 10)
	timeString += "0";
	timeString += hours + ":";
	if (minutes < 10)
		timeString += "0";
	timeString += minutes + ":";
	if (seconds < 10)
		timeString += "0";
	timeString += seconds;
	if (rest < 0)
		timeString = "00:00:00";
	let countdownElem = document.createElement('p');
	countdownElem.textContent = timeString;
	countdownDiv.appendChild(countdownElem);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/schedule')
        .then(response => response.json())
        .then(data => {
			let i = 0;
            const gpListBaseDiv = document.getElementById('next-event');
            gpListBaseDiv.innerHTML = '';
			const gpListDiv = document.createElement('ul');
			gpListBaseDiv.appendChild(gpListDiv);
            data.forEach(event => {
				if (new Date().toISOString() < event.end && i < 10) {
					if (i === 0)
						first_item = event;
					if (event.location !== first_item.location)
						return ;
					const pitElem = document.createElement('li');
					const date = new Date(event['start']);
                	const timeString = date.toLocaleTimeString([], options2);
					pitElem.innerHTML = `${timeString}: ${event.name} - ${event.location} - ${event.category}`;
					pitElem.className = 'line-height-2';
					gpListDiv.appendChild(pitElem);
					i++;
				}
            });
			setInterval(countdown, 1000);
			countdown();
        })
        .catch(error => {
            console.error('Error fetching pit infos:', error);
        });
});