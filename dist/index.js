(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Memorux = __webpack_require__(2);

	var _Memorux2 = _interopRequireDefault(_Memorux);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Memorux2.default;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Memorux = function () {
	  _createClass(Memorux, [{
	    key: "onChange",
	    get: function get() {
	      return this._onChange;
	    },
	    set: function set(newOnChange) {
	      if (newOnChange) {
	        this._onChange = newOnChange;
	      }
	    }
	  }, {
	    key: "store",
	    get: function get() {
	      return this._store;
	    },
	    set: function set(newStore) {
	      if (newStore) {
	        this._store = newStore;
	      }
	    }
	  }, {
	    key: "storeClasses",
	    get: function get() {
	      return this._storeClasses;
	    },
	    set: function set(newDispatchers) {
	      if (newDispatchers) {
	        this._storeClasses = newDispatchers;
	      }
	    }
	  }]);

	  function Memorux(newStoreClasses) {
	    _classCallCheck(this, Memorux);

	    this._onChange = false;
	    this._store = {};
	    this._storeClasses = {};

	    this.createInitialStore(newStoreClasses);
	  }

	  _createClass(Memorux, [{
	    key: "touchStore",
	    value: function touchStore() {
	      if (this._onChange) this.onChange(this.store);
	    }
	  }, {
	    key: "dispatch",
	    value: function dispatch(action) {
	      var _this = this;

	      var _loop = function _loop(name) {
	        var storeInstance = new _this.storeClasses[name]();
	        var dispatchedStore = storeInstance.dispatch(_this.store[name], action);
	        if (typeof dispatchedStore == "function") {
	          new Promise(dispatchedStore).then(function (newStore) {
	            if (_this.store[name] != newStore) {
	              _this.store[name] = newStore;
	              _this.touchStore();
	            }
	          });
	        } else {
	          if (_this.store[name] != dispatchedStore) {
	            _this.store[name] = dispatchedStore;
	            _this.touchStore();
	          }
	        }
	      };

	      for (var name in this.storeClasses) {
	        _loop(name);
	      }
	    }
	  }, {
	    key: "createInitialStore",
	    value: function createInitialStore(newStoreClasses) {
	      this.storeClasses = newStoreClasses;
	      for (var name in this.storeClasses) {
	        var storeInstance = new this.storeClasses[name]();
	        var initialState = storeInstance.initialState;
	        this.store = _extends({}, this.store, _defineProperty({}, name, initialState));
	      }
	    }
	  }]);

	  return Memorux;
	}();

	exports.default = Memorux;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;