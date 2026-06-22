"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
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
var _propTypes = _interopRequireDefault(require("prop-types"));
var _soyaComponents = require("@traveloka/soya-components");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var DropdownInput = function (_React$Component) {
  function DropdownInput(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, DropdownInput);
    _this = _callSuper(this, DropdownInput, [props]);
    (0, _defineProperty2["default"])(_this, "handleOnSelect", function (value) {
      var _this$props = _this.props,
        onChange = _this$props.onChange,
        name = _this$props.name;
      _this.setState({
        value: value
      });
      if (onChange) {
        onChange(name, value);
      }
    });
    _this.state = {
      value: props.value === null ? props.items[0].value : props.value
    };
    return _this;
  }
  (0, _inherits2["default"])(DropdownInput, _React$Component);
  return (0, _createClass2["default"])(DropdownInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        this.setState({
          value: this.props.value || "true"
        });
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var result = false;
      if (nextProps.value !== this.props.value || nextState.value !== this.state.value) {
        result = true;
      }
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var items = this.props.items;
      var defaultValue = items[0];
      for (var i in items) {
        if (items[i].value === this.state.value) {
          defaultValue = items[i];
        }
      }
      return _react["default"].createElement(_soyaComponents.Select, {
        options: items,
        defaultValue: defaultValue,
        searchable: true,
        backspaceRemoves: true,
        onChange: this.handleOnSelect
      });
    }
  }]);
}(_react["default"].Component);
DropdownInput.propTypes = {
  name: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func,
  items: _propTypes["default"].array.isRequired,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])
};
var _default = exports["default"] = DropdownInput;
//# sourceMappingURL=DropdownInput.js.map