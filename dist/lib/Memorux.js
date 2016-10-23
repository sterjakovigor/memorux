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