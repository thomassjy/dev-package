import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import PropTypes from "prop-types";
import React from "react";
import * as style from "./StaticLinkText.styles";
var StaticLinkText = function (_React$Component) {
  function StaticLinkText(props) {
    _classCallCheck(this, StaticLinkText);
    return _callSuper(this, StaticLinkText, [props]);
  }
  _inherits(StaticLinkText, _React$Component);
  return _createClass(StaticLinkText, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        color = _this$props.color,
        text = _this$props.text,
        onClick = _this$props.onClick;
      return React.createElement("button", {
        className: style.button,
        onClick: onClick,
        style: {
          color: color
        }
      }, text);
    }
  }]);
}(React.Component);
StaticLinkText.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  background: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
export default StaticLinkText;
//# sourceMappingURL=StaticLinkText.js.map