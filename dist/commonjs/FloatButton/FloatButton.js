"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _FloatButtonChildren = _interopRequireDefault(require("./FloatButtonChildren"));
var _soyaComponents = require("@traveloka/soya-components");
var style = _interopRequireWildcard(require("./FloatButton.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var FloatButton = function (_React$Component) {
  function FloatButton(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, FloatButton);
    _this = _callSuper(this, FloatButton, [props]);
    (0, _defineProperty2["default"])(_this, "handleClick", function () {
      var show = _this.state.showChildren;
      _this.setState({
        showChildren: !show
      });
    });
    _this.state = {
      showChildren: false
    };
    return _this;
  }
  (0, _inherits2["default"])(FloatButton, _React$Component);
  return (0, _createClass2["default"])(FloatButton, [{
    key: "getFloatButtonChildren",
    value: function getFloatButtonChildren() {
      var actions = this.props.actions;
      var result = [];
      for (var i in actions) {
        result.push(_react["default"].createElement("li", {
          className: style.listButtonChildren,
          key: i
        }, _react["default"].createElement(_FloatButtonChildren["default"], {
          text: actions[i].text,
          icon: actions[i].icon,
          onClick: actions[i].handleClick
        })));
      }
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.getFloatButtonChildren();
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: style["float"],
        onClick: this.handleClick
      }, _react["default"].createElement("div", {
        className: style.mainFloatIcon
      }, _react["default"].createElement(_soyaComponents.Icon, {
        icon: "view-list"
      }))), _react["default"].createElement("ul", {
        className: style.listIcon,
        style: {
          visibility: this.state.showChildren ? "visible" : "hidden"
        }
      }, children));
    }
  }]);
}(_react["default"].Component);
var _default = exports["default"] = FloatButton;
//# sourceMappingURL=FloatButton.js.map