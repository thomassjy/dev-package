import _typeof from "@babel/runtime/helpers/typeof";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import { combineReducers } from "redux";
export default (function (createStore) {
  return function (reducer, preloadedState, enhancer) {
    var store = createStore(reducer, preloadedState, enhancer);
    var _replaceReducer = store.replaceReducer;
    var soyaReducers = {};
    return _objectSpread(_objectSpread({}, store), {}, {
      addReducer: function addReducer(nextReducers) {
        if (!nextReducers) {
          throw new Error("Missing nextReducers argument.");
        }
        var nextReducer = nextReducers;
        if (_typeof(nextReducers) === "object") {
          var keys = Object.keys(nextReducers);
          keys.forEach(function (key) {
            if (soyaReducers[key] && soyaReducers[key] !== nextReducers[key]) {
              throw new Error("Duplicate reducer name: ".concat(key));
            }
            soyaReducers[key] = nextReducers[key];
          });
          nextReducer = combineReducers(soyaReducers);
        }
        _replaceReducer(nextReducer);
      },
      replaceReducer: function replaceReducer(nextReducers) {
        if (!nextReducers) {
          throw new Error("Missing nextReducers argument.");
        }
        var nextReducer = nextReducers;
        if (_typeof(nextReducers) === "object") {
          soyaReducers = _objectSpread({}, nextReducers);
          nextReducer = combineReducers(soyaReducers);
        }
        _replaceReducer(nextReducer);
      },
      soya: true
    });
  };
});
//# sourceMappingURL=enhancer.js.map