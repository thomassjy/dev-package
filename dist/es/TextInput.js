import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import React from "react";
import PropTypes from "prop-types";
import { Input, TextArea } from "@traveloka/soya-components";
var TextInput = function (_React$Component) {
  function TextInput(props) {
    var _this;
    _classCallCheck(this, TextInput);
    _this = _callSuper(this, TextInput, [props]);
    _defineProperty(_this, "handleOnChange", function (value) {
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
    _defineProperty(_this, "validate", function (value) {
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
    _defineProperty(_this, "validateInputValue", function (value) {
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
  _inherits(TextInput, _React$Component);
  return _createClass(TextInput, [{
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
        return React.createElement(TextArea, _extends({}, this.props, {
          onChange: this.handleOnChange,
          placeholder: placeholder,
          errorMessages: errorMessages,
          theme: "default",
          marginBottom: "sm"
        }));
      }
      return React.createElement(Input, _extends({}, this.props, {
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
}(React.Component);
TextInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  validators: PropTypes.array,
  validationFormat: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  isTextArea: PropTypes.bool.isRequired
};
TextInput.defaultProps = {
  isDisabled: false,
  isTextArea: false
};
export default TextInput;
//# sourceMappingURL=TextInput.js.map