module.exports =
/******/ (function(modules) { // webpackBootstrap
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

	var _Dispatcher = __webpack_require__(2);

	var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

	var _Store = __webpack_require__(3);

	var _Store2 = _interopRequireDefault(_Store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  Dispatcher: _Dispatcher2.default, Store: _Store2.default
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dispatcher = function () {
	  _createClass(Dispatcher, [{
	    key: "collection",
	    get: function get() {
	      return this._collection;
	    },
	    set: function set() {
	      var newCollection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      if (newCollection) {
	        this._collection = newCollection;
	      }
	    }
	  }, {
	    key: "stores",
	    get: function get() {
	      return this._stores;
	    },
	    set: function set() {
	      var newStores = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      if (newStores) {
	        this._stores = newStores;
	      }
	    }
	  }]);

	  function Dispatcher(storesArray) {
	    _classCallCheck(this, Dispatcher);

	    this._collection = {};
	    this._stores = [];

	    this.setCollectionByArrayOfStores(storesArray);
	  }

	  _createClass(Dispatcher, [{
	    key: "setCollectionByArrayOfStores",
	    value: function setCollectionByArrayOfStores() {
	      var storesArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      if (storesArray) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = storesArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var Store = _step.value;

	            var store = new Store();
	            this.stores.push(store);
	            this.collection = _extends({}, this.collection, store.collection);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: "dispatch",
	    value: function dispatch(action) {
	      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.stores[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var store = _step2.value;

	          var newCollection = store.dispatch.apply(store, arguments);
	          this.collection = _extends({}, this.collection, newCollection);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      return this.collection;
	    }
	  }]);

	  return Dispatcher;
	}();

	exports.default = Dispatcher;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Store = function () {
	  _createClass(Store, [{
	    key: "collection",
	    get: function get() {
	      return this._collection;
	    },
	    set: function set(newStore) {
	      if (newStore) {
	        this._collection = newStore;
	      }
	    }
	  }]);

	  function Store() {
	    var newStore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    _classCallCheck(this, Store);

	    this._collection = {};

	    this.collection = newStore;
	  }

	  return Store;
	}();

	exports.default = Store;
	module.exports = exports["default"];

/***/ }
/******/ ]);