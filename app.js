const chromeLauncher = require("chrome-launcher");
const CDP = require("chrome-remote-interface");

const twilio = require("twilio");
const config = require("./config");

console.log(`Configuration file loaded:`);
for (param in config) {
	console.log(`${param}: ${config[param]}`);
}
console.log(`Press Ctrl-C to force close.`);

const client = require("twilio")(config.accountSid, config.authToken);

(async function() {
	const chrome = await launchChrome();
	const protocol = await CDP({ port: chrome.port });

	const { Page, Runtime } = protocol;
	await Promise.all([Page.enable(), Runtime.enable()]);

	Page.navigate({ url: config.URL });
	await Page.loadEventFired(); //wait for window.onload
	let count = 0,
		lastMsgTime = Date.now() - config.notifWaittime * 60000;

	let check = setInterval(async () => {
		// check page every 2 seconds
		const getWaittime =
			"document.getElementById('cc-waittime-label').textContent";
		let waittime = await Runtime.evaluate({ expression: getWaittime }); // run js code to get time details

		if (
			!isNaN(parseInt(waittime.result.value)) && // is a number
			parseInt(waittime.result.value) <= config.waittime && // <= user-defined wait time
			Date.now() - lastMsgTime > config.notifWaittime * 60000 // last notification was more user-defined last notification time
		) {
			console.log(`Current wait time: ${waittime.result.value}`);
			sendMessage(waittime.result.value);
		} else if (!isNaN(parseInt(waittime.result.value))) {
			// is a number
			console.log(`Current wait time: ${waittime.result.value}`);
		} else {
			console.log(`Current status: ${waittime.result.value}`);
		}
	}, 2000);

	function launchChrome(headless = config.headless) {
		return chromeLauncher.launch({
			// port: 9222, // Uncomment to force a specific port of your choice.
			chromeFlags: [
				// "--window-size=412,732",
				"--disable-gpu",
				headless ? "--headless" : ""
			]
		});
	}

	function sendMessage(time) {
		client.messages.create(
			{
				to: config.to,
				from: config.from,
				body: `Wait time is ${parseInt(time)} minutes.`
			},
			function(err, message) {
				console.log(
					`Sent: ${message.body} \n
					To: ${message.to} \n
					At: ${message.dateCreated}`
				);
			}
		);
		lastMsgTime = Date.now();

		count++;
		if (count > 5) {
			// safety feature so you don't get spammed
			protocol.close();
			chrome.kill();
			clearInterval(check);
		}
	}
})();
