"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
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
var TextInput = function (_React$Component) {
  function TextInput(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, TextInput);
    _this = _callSuper(this, TextInput, [props]);
    (0, _defineProperty2["default"])(_this, "handleOnChange", function (value) {
      var _this$props = _this.props,
        onChange = _this$props.onChange,
        name = _this$props.name;
      var isValid = _this.validateInputValue(value);
      _this.setState({
        value: value
      });
      if (onChange) {
        onChange(name, value, isValid);
      }
    });
    (0, _defineProperty2["default"])(_this, "validate", function (value) {
      var errorMessages = [];
      var _this$props2 = _this.props,
        validators = _this$props2.validators,
        validationFormat = _this$props2.validationFormat;
      for (var i = 0; i < validators.length; i++) {
        var validator = validators[i];
        var validateResult = void 0;
        if (validationFormat && i === validators.length - 1) {
          validateResult = validator(value, validationFormat);
        } else {
          validateResult = validator(value);
        }
        var isValid = validateResult && typeof validateResult === "string";
        if (isValid) {
          errorMessages.push(validateResult);
        }
      }
      return {
        errorMessages: errorMessages,
        isValid: !errorMessages.filter(function (error) {
          return typeof error === "string";
        })[0]
      };
    });
    (0, _defineProperty2["default"])(_this, "validateInputValue", function (value) {
      var _this$validate = _this.validate(value),
        isValid = _this$validate.isValid,
        errorMessages = _this$validate.errorMessages;
      _this.setState({
        errorMessages: errorMessages
      });
      return isValid;
    });
    _this.state = {
      value: props.value || "",
      errorMessages: []
    };
    return _this;
  }
  (0, _inherits2["default"])(TextInput, _React$Component);
  return (0, _createClass2["default"])(TextInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        this.setState({
          value: this.props.value || ""
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
      var _this$state = this.state,
        errorMessages = _this$state.errorMessages,
        value = _this$state.value;
      var _this$props3 = this.props,
        placeholder = _this$props3.placeholder,
        isDisabled = _this$props3.isDisabled,
        isTextArea = _this$props3.isTextArea;
      if (isTextArea) {
        return _react["default"].createElement(_soyaComponents.TextArea, (0, _extends2["default"])({}, this.props, {
          onChange: this.handleOnChange,
          placeholder: placeholder,
          errorMessages: errorMessages,
          theme: "default",
          marginBottom: "sm"
        }));
      }
      return _react["default"].createElement(_soyaComponents.Input, (0, _extends2["default"])({}, this.props, {
        value: value,
        isDisabled: isDisabled,
        onChange: this.handleOnChange,
        placeholder: placeholder,
        errorMessages: errorMessages,
        theme: "default",
        marginBottom: "sm"
      }));
    }
  }]);
}(_react["default"].Component);
TextInput.propTypes = {
  onChange: _propTypes["default"].func,
  placeholder: _propTypes["default"].string,
  validators: _propTypes["default"].array,
  validationFormat: _propTypes["default"].string,
  name: _propTypes["default"].string,
  value: _propTypes["default"].string,
  isDisabled: _propTypes["default"].bool.isRequired,
  isTextArea: _propTypes["default"].bool.isRequired
};
TextInput.defaultProps = {
  isDisabled: false,
  isTextArea: false
};
var _default = exports["default"] = TextInput;
//# sourceMappingURL=TextInput.js.map