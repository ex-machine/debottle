var apply = require('apply-fn');

function Debottle(delay) {
	this.$delay = delay;

	this.$cancel = function () {
		return clearTimeout(this.$timeout);
	}
}

function debounce(fn, delay, cb) {
	if (arguments.length === 2 && typeof delay === 'function') {
		cb = delay;
		delay = undefined;
	}

	var self = debouncedFn;
	Debottle.call(self, delay);

	function debouncedFn() {
		var args = arguments;

		if (self.$timeout !== undefined)
			self.$cancel();

		self.$timeout = setTimeout(function () {
			if (typeof cb !== 'function')
				return apply(null, fn, args);

			try {
				cb(null, apply(null, fn, args));
			} catch (e)	{
				cb(e);
			}
		}, self.$delay);
	};

	return self;
}

function throttle(fn, delay, cb) {
	if (arguments.length === 2 && typeof delay === 'function') {
		cb = delay;
		delay = undefined;
	}

	var self = throttledFn;
	Debottle.call(self, delay);

	function throttledFn() {
		var args = arguments;

		if (self.$timeout !== undefined)
			return;

		self.$timeout = setTimeout(function () {
			self.$timeout = undefined;
		}, self.$delay);

		if (typeof cb !== 'function')
			return apply(null, fn, args);

		try {
			cb(null, apply(null, fn, args));
		} catch (e)	{
			cb(e);
		}
	};

	return self;
}

exports.debounce = debounce;
exports.throttle = throttle;
