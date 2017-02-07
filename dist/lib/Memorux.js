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
    key: "storeInstances",
    get: function get() {
      return this._storeInstances;
    },
    set: function set(newStoreInstance) {
      if (newStoreInstance) {
        this._storeInstances = newStoreInstance;
      }
    }
  }]);

  function Memorux(newStore) {
    _classCallCheck(this, Memorux);

    this._waitingActions = [];
    this._action_id = 0;
    this._onChange = false;
    this._store = {};
    this._storeInstances = {};

    this.stores = newStore;
  }

  _createClass(Memorux, [{
    key: "touchStore",
    value: function touchStore() {
      if (this._onChange) this.onChange(this.stores);
    }
  }, {
    key: "dispatch",
    value: function dispatch(action) {
      action.id = this._action_id++;
      if (action.wait != undefined && action.wait.length > 0) {
        this._waitingActions.push(action);
      } else {
        this.dispatchAction(action);
      }
      return action;
    }
  }, {
    key: "dispatchAction",
    value: function dispatchAction(action) {
      var _this = this;

      var promisedDispatchers = [];

      for (var storeName in this.storeInstances) {
        var storeInstance = this.storeInstances[storeName];
        if (typeof storeInstance.dispatch != "function") continue;
        var dispatchedStore = storeInstance.dispatch(this.stores[storeName], action);
        if (typeof dispatchedStore == "function") {
          promisedDispatchers.push({ callback: dispatchedStore, storeName: storeName });
        } else {
          this.updateStore({ storeName: storeName, newState: dispatchedStore });
        }
      }

      promisedDispatchers.forEach(function (dispatcher, index) {
        new Promise(dispatcher.callback).then(function (newState) {
          _this.updateStore({ storeName: dispatcher.storeName, newState: newState });

          var readyActions = _this.getReadyWaitingActions(action);
          readyActions.forEach(function (readyAction, index) {
            _this.dispatchAction(readyAction);
          });
        });
      });
    }
  }, {
    key: "getReadyWaitingActions",
    value: function getReadyWaitingActions(action) {
      var _this2 = this;

      var readyActions = [];

      this._waitingActions = this._waitingActions.filter(function (_waitingAction, index) {
        _this2._waitingActions[index].wait = _waitingAction.wait.filter(function (waitFor, index) {
          if (waitFor.id == action.id) {
            return false;
          } else {
            return true;
          }
        });
        if (_this2._waitingActions[index].wait.length == 0) {
          readyActions.push(_this2._waitingActions[index]);
          return false;
        } else {
          return true;
        }
      });

      return readyActions;
    }
  }, {
    key: "updateStore",
    value: function updateStore(_ref) {
      var storeName = _ref.storeName;
      var newState = _ref.newState;

      if (newState != undefined && this.stores[storeName] != newState) {
        this.stores = _extends({}, this.stores, _defineProperty({}, storeName, newState));
        this.touchStore();
      }
    }
  }, {
    key: "assignStores",
    value: function assignStores(storeInstances) {
      for (var storeName in storeInstances) {
        console.log(storeInstances[storeName]);
        this.storeInstances[storeName] = new storeInstances[storeName]();
      }
      this.assignInitialState();
    }
  }, {
    key: "assignInitialState",
    value: function assignInitialState() {
      for (var storeName in this.storeInstances) {
        var storeInstance = this.storeInstances[storeName];
        this.stores = _extends({}, this.stores, _defineProperty({}, storeName, storeInstance.initialState));
      }
    }
  }]);

  return Memorux;
}();

exports.default = Memorux;
module.exports = exports["default"];