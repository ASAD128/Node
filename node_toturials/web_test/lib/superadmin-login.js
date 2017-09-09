var require = patchRequire(require);
var conf = require('../config.json');

// Note: casper.js will call the function you pass to `.then()` by
// binding it to the casper object so `this` works the same way
// in regular casper.js code:

var company_login_button = 'form.login__consumer .popup__link--company';

function tc_homepage_loaded () {
	this.thenClick('.user__login');
	this.wait(1000);
}

function click_company_login_button () {
	this.waitUntilVisible(company_login_button)
		.wait(2000)
	    .click(company_login_button);
	    
	// Sometimes .click is not chainable	
	this.wait(1000);
}

function fill_company_login_form () {
    var username_input = 'form.login__company .email__input[name="name"]';
    var password_input = 'form.login__company .password__input[name="pass"]';

	this.waitForSelector(username_input)
		.sendKeys(username_input,conf.admin.email)
		.sendKeys(password_input,conf.admin.password);
}

function submit_company_login_form () {
	var login_button = 'form.login__company button.submit_button.button--g[name="op"]';
	
	this.options.waitTimeout = 10000; // drupal is slow, wait 10 seconds
	this.click(login_button);
	this.waitForUrl(/b2b\/dashboard/);
}

// Note: pass the following function to casper.js to get proper binding of
// `this`. Do not call it directly.

module.exports = {
	tc_homepage_loaded: tc_homepage_loaded,
	click_company_login_button: click_company_login_button,
	fill_company_login_form: fill_company_login_form,
	submit_company_login_form: submit_company_login_form,
	login: function () {
		// Login if not logged in
		if (
		    !this.exists('.menu-avatar') &&
		    !this.exists('.account__user')
		) {
			console.log('Logging in as superadmin..');
			this.then(tc_homepage_loaded)
				.then(click_company_login_button)
				.then(fill_company_login_form)
				.then(submit_company_login_form);
		}
	}
}
