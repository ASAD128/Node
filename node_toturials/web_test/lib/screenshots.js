function makeScreenshotObject (name) {
	var count = 1;
	var name = name;

	function counter () {
		var pad = '000';
		var result = (pad+count).slice(-pad.length);
		count++;
		return result;
	}
	
	function filename () {
		return name + '-' + counter() + '.png';
	}
	
	return {
		capture: function() {
			// Note: inside here `this` refers to the casper object
			return this.capture(
				'screenshots/'+filename(),
				{
					top: 0,
					left: 0,
					width: 1200,
					height: 1200
				}
			).wait(2000);
		}
	}
}

module.exports = makeScreenshotObject;
