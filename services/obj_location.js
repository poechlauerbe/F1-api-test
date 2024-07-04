const { formatDate, formatTime } = require('./service_time')

function Location(sessionId, sessionName, sessionType, name, country, date, start, end) {
	this.sessionId = sessionId || 0;
	this.sessionName = sessionName || '';
	this.sessionType = sessionType || ''
	this.name = name || '';
	this.country = country || '';
	this.date = date || '';
	this.start = start || '';
	this.end = end || '';
	this.weather = [];
}

let location = null;

const getLocation = () => {
	return location;
}

const setLocation = (sessionId, sessionName, sessionType, name, country, start, end) => {
	if (!location)
	{
		location = new Location (sessionId, sessionName, sessionType, name, country, formatDate(start), formatTime(start), formatTime(end));

	}
	else if (location.sessionId !== sessionId)
	{
		location.sessionId = sessionId;
		location.sessionName = sessionName;
		location.sessionType = sessionType;
		location.name = name;
		location.country = country;
		location.date = formatDate(start);
		location.start = formatTime(start);
		location.end = formatTime(end);
	}
}

const updateLocation = (sessionId, sessionName, sessionType, name, country, start, end) => {
	if (location && location.sessionId !== sessionId)
	{
		location.sessionId = sessionId;
		location.sessionName = sessionName;
		location.sessionType = sessionType;
		location.name = name;
		location.country = country;
		location.date = formatDate(start);
		location.start = formatTime(start);
		location.end = formatTime(end);
	}
}

module.exports = {
	getLocation,
	setLocation,
	updateLocation
}