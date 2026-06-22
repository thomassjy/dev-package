import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import React from "react";
import { Icon } from "@traveloka/soya-components";
import * as style from "./FloatButton.styles";
var FloatButtonChildren = function (_React$Component) {
  function FloatButtonChildren() {
    _classCallCheck(this, FloatButtonChildren);
    return _callSuper(this, FloatButtonChildren, arguments);
  }
  _inherits(FloatButtonChildren, _React$Component);
  return _createClass(FloatButtonChildren, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        text = _this$props.text,
        icon = _this$props.icon,
        onClick = _this$props.onClick;
      return React.createElement("div", {
        className: style.floatButtonChildren,
        onClick: onClick
      }, React.createElement("div", {
        className: style.labelContainer
      }, React.createElement("div", {
        className: style.labelText
      }, text)), React.createElement("div", {
        className: style.buttonChildren
      }, React.createElement(Icon, {
        icon: icon
      })));
    }
  }]);
}(React.Component);
export default FloatButtonChildren;
//# sourceMappingURL=FloatButtonChildren.js.map