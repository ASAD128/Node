function fetchJSON (url, request_obj, callback) {
	return function () {
		return this.open(url, request_obj)
		.then(function(){
			var result;
			try {
				result = JSON.parse(this.getPageContent());
			}
			catch (err) {
				console.log(this.getPageContent());
				throw err;
			}
			return callback.bind(this)(result);
		});
	}
}

module.exports = fetchJSON;
