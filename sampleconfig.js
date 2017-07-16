module.exports = {
	waittime: 20, // if <= to this wait time, send you a text
	accountSid: 'YOUR_TWILIO_ACCOUNT_SID_HERE', // twilio accountSid
	authToken: 'YOUR_TWILIO_AUTH_TOKEN_HERE', // twilio authToken
	to: "+15555555555", // your phone number to notify
	from: "+16666666666", // your twilio number
	notifWaittime: 5, // you won't be notified more than once every x minutes
	headless: false, // run chrome in headless mode?
	URL: 'https://www.uottawa.ca/health/',
};
// devModeURL: 'http://localhost:8080/test.html'