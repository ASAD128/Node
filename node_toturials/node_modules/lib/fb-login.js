var require = patchRequire(require);
var conf = require('../config.json');

// Note: casper.js will call the function you pass to `.then()` by
// binding it to the casper object so `this` works the same way
// in regular casper.js code:

function tc_homepage_loaded () {
	if (this.visible('.login__fb_button')) {
		this.log('facebook login button is visible on load!','warning');
	}
	this.thenClick('.user__login');
}

function click_tc_fb_login_button () {
	this.click('.login__fb_button');
	
	this.waitForUrl(/www.facebook.com\/login.php/);
}

function fill_fb_login_form () {
	this.waitForSelector('#email')
		.sendKeys('#email',conf.fb_user.email)
		.sendKeys('#pass',conf.fb_user.password)
		.click('#loginbutton');
	
	this.waitForUrl(/trustedcompany|oauth/,function(){
	
		// If user has never logged in then facebook will ask for 
		// access permissions. Just press the OK button:
		
		if (this.getCurrentUrl().match(/facebook.*oauth/)) {
			this.waitForSelector('button[name="__CONFIRM__"]',function(){
					this.wait(500)
						.click('button[name="__CONFIRM__"]');
				})
				.waitForSelector('.audienceSelector',function(){
					this.wait(500)
						.click('button[name="__CONFIRM__"]');
				})
				.waitForUrl(/trustedcompany/);
		}
	});
}

// Note: pass the following function to casper.js to get proper binding of
// `this`. Do not call it directly.

if (typeof module != 'undefined') {
	module.exports = {
		tc_homepage_loaded: tc_homepage_loaded,
		click_tc_fb_login_button: click_tc_fb_login_button,
		fill_fb_login_form: fill_fb_login_form,
		login: function () {
			// Login if not logged in
			if (!this.exists('.account__user')) {
				console.log('Logging in with Facebook account..');
				this.then(tc_homepage_loaded)
					.then(click_tc_fb_login_button)
					.then(fill_fb_login_form);
			}
		}
	}
}
