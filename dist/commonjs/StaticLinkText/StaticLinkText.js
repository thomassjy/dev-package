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
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var style = _interopRequireWildcard(require("./StaticLinkText.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var StaticLinkText = function (_React$Component) {
  function StaticLinkText(props) {
    (0, _classCallCheck2["default"])(this, StaticLinkText);
    return _callSuper(this, StaticLinkText, [props]);
  }
  (0, _inherits2["default"])(StaticLinkText, _React$Component);
  return (0, _createClass2["default"])(StaticLinkText, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        color = _this$props.color,
        text = _this$props.text,
        onClick = _this$props.onClick;
      return _react["default"].createElement("button", {
        className: style.button,
        onClick: onClick,
        style: {
          color: color
        }
      }, text);
    }
  }]);
}(_react["default"].Component);
StaticLinkText.propTypes = {
  text: _propTypes["default"].string.isRequired,
  color: _propTypes["default"].string,
  background: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired
};
var _default = exports["default"] = StaticLinkText;
//# sourceMappingURL=StaticLinkText.js.map