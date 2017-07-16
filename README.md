# UOHS-Notifier

Sends you a text when it's convenient to show up at the University of Ottawa Health Services walk-in clinic.

This nodejs app uses [headless chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) to scrape the number of estimated minutes you have to wait for a walk-in appointment.

There is an easier way to do this by using their [(undocumented) API](https://app.cliniconex.com/walkinstats?pid=co-b22fc6be-efba-4c71-9b88-45c9171b6f83&locale=en&token=jkrt54gtOU&hosturl=https://www.uottawa.ca/health/&callback=__gwt_jsonp__.P0.onSuccess). I chose not to do this so I could play with headless-chrome.

You can find this via the network tab in your favorite browser inspector.

## Installation
1. Install a version of chrome that has headless mode enabled. Headless mode on available on Mac and Linux starting in version 59. Windows requires ([Canary](https://www.google.com/chrome/browser/canary.html), as of 2016-07-16).
1. `git clone https://github.com/Snuupy/UOHS-Notifier`
1. `npm install -g chrome-remote-interface`
1. `npm link chrome-remote-interface`.
1. `npm install`
1. Rename sampleconfig.js to config.js and fill in your details (you may be required to sign up for [Twilio](https://www.twilio.com/) if you don't already have an account there)


## Usage
1. `cd UOHS-Notifier`
2. `npm start`

![Server screenshot](/screenshots/server.png?raw=true "Server Screenshot")
![Text screenshot](/screenshots/SMS.png?raw=true "Text Screenshot")


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

## History

0.0.3 - Added screenshots
0.0.2 - Add comprehensive readme for usage  
0.0.1 - Initial release