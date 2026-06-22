"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _soyaComponents = require("@traveloka/soya-components");
var style = _interopRequireWildcard(require("./ToggleTooltip.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ToggleTooltip = function (_React$Component) {
  function ToggleTooltip(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, ToggleTooltip);
    _this = _callSuper(this, ToggleTooltip, [props]);
    _this._handleClickOutside = _this._handleClickOutside.bind(_this);
    _this._popoverOnClick = _this._popoverOnClick.bind(_this);
    _this.state = {
      show: false
    };
    return _this;
  }
  (0, _inherits2["default"])(ToggleTooltip, _React$Component);
  return (0, _createClass2["default"])(ToggleTooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("mousedown", this._handleClickOutside, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("mousedown", this._handleClickOutside, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        theme = _this$props.theme,
        direction = _this$props.direction;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(style.popover, "".concat(theme), (0, _defineProperty2["default"])({}, direction, direction)),
        ref: function ref(node) {
          return _this2.node = node;
        }
      }, _react["default"].createElement(_soyaComponents.Button, {
        iconProps: {
          icon: "more-horiz"
        },
        variant: "white",
        marginRight: "sm",
        isOutline: false,
        onClick: this._popoverOnClick
      }), _react["default"].createElement("div", {
        className: (0, _classnames["default"])("popoverPanelRuleMgmt", (0, _defineProperty2["default"])({}, "open", this.state.show))
      }, this.props.children));
    }
  }, {
    key: "_handleClickOutside",
    value: function _handleClickOutside(e) {
      if (this.node.contains(e.target)) {
        return;
      }
      this.setState({
        show: false
      });
    }
  }, {
    key: "_popoverOnClick",
    value: function _popoverOnClick(event) {
      event.stopPropagation();
      this.setState(function (previousState, nextProps) {
        return {
          show: !previousState.show
        };
      });
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return {
        direction: _propTypes["default"].string,
        theme: _propTypes["default"].string
      };
    }
  }, {
    key: "THEME",
    get: function get() {
      return {
        DEFAULT: "default",
        WHITE: "white"
      };
    }
  }]);
}(_react["default"].Component);
var _default = exports["default"] = ToggleTooltip;
//# sourceMappingURL=ToggleTooltip.js.map