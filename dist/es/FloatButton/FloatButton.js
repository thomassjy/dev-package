import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import React from "react";
import FloatButtonChildren from "./FloatButtonChildren";
import { Icon } from "@traveloka/soya-components";
import * as style from "./FloatButton.styles";
var FloatButton = function (_React$Component) {
  function FloatButton(props) {
    var _this;
    _classCallCheck(this, FloatButton);
    _this = _callSuper(this, FloatButton, [props]);
    _defineProperty(_this, "handleClick", function () {
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
  _inherits(FloatButton, _React$Component);
  return _createClass(FloatButton, [{
    key: "getFloatButtonChildren",
    value: function getFloatButtonChildren() {
      var actions = this.props.actions;
      var result = [];
      for (var i in actions) {
        result.push(React.createElement("li", {
          className: style.listButtonChildren,
          key: i
        }, React.createElement(FloatButtonChildren, {
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
      return React.createElement("div", null, React.createElement("div", {
        className: style["float"],
        onClick: this.handleClick
      }, React.createElement("div", {
        className: style.mainFloatIcon
      }, React.createElement(Icon, {
        icon: "view-list"
      }))), React.createElement("ul", {
        className: style.listIcon,
        style: {
          visibility: this.state.showChildren ? "visible" : "hidden"
        }
      }, children));
    }
  }]);
}(React.Component);
export default FloatButton;
//# sourceMappingURL=FloatButton.js.map