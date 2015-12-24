(function(__root, __factory) { if (typeof define === "function" && define.amd) { define("debottle", [], __factory);} else if (typeof exports === "object") {module.exports = __factory();} else {__root["debottle"] = __factory();}})(this, (function() {
var exports = {};
var apply = ((function() {
var exports = {};
function apply(self, fn, args) {
	var selfless = (self === undefined) || (self === null);
	var length = args ? args.length : 0;
	
	switch (length) {
		case 0:
			return selfless ? fn() : fn.call(self);
		case 1:
			return selfless ? fn(args[0]) : fn.call(self, args[0]);
		case 2:
			return selfless ? fn(args[0], args[1]) : fn.call(self, args[0], args[1]);
		case 3:
			return selfless ? fn(args[0], args[1], args[2]) : fn.call(self, args[0], args[1], args[2]);
		case 4:
			return selfless ? fn(args[0], args[1], args[2], args[3]) : fn.call(self, args[0], args[1], args[2], args[3]);
		case 5:
			return selfless ? fn(args[0], args[1], args[2], args[3], args[4]) : fn.call(self, args[0], args[1], args[2], args[3], args[4]);
		case 6:
			return selfless ? fn(args[0], args[1], args[2], args[3], args[4], args[5]) : fn.call(self, args[0], args[1], args[2], args[3], args[4], args[5]);
		// the crucial point
		case 7:
			return selfless ? fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6]) : fn.call(self, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
		default:
			return selfless ? fn.apply(null, args) : fn.apply(self, args);
	}
}

exports = apply;
return exports;
})());

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

return exports;
}))