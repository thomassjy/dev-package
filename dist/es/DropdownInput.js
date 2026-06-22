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
import { Select } from "@traveloka/soya-components";
var DropdownInput = function (_React$Component) {
  function DropdownInput(props) {
    var _this;
    _classCallCheck(this, DropdownInput);
    _this = _callSuper(this, DropdownInput, [props]);
    _defineProperty(_this, "handleOnSelect", function (value) {
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
  _inherits(DropdownInput, _React$Component);
  return _createClass(DropdownInput, [{
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
      return React.createElement(Select, {
        options: items,
        defaultValue: defaultValue,
        searchable: true,
        backspaceRemoves: true,
        onChange: this.handleOnSelect
      });
    }
  }]);
}(React.Component);
DropdownInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  items: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default DropdownInput;
//# sourceMappingURL=DropdownInput.js.map