import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "@traveloka/soya-components";
import * as style from "./ToggleTooltip.styles";
var ToggleTooltip = function (_React$Component) {
  function ToggleTooltip(props) {
    var _this;
    _classCallCheck(this, ToggleTooltip);
    _this = _callSuper(this, ToggleTooltip, [props]);
    _this._handleClickOutside = _this._handleClickOutside.bind(_this);
    _this._popoverOnClick = _this._popoverOnClick.bind(_this);
    _this.state = {
      show: false
    };
    return _this;
  }
  _inherits(ToggleTooltip, _React$Component);
  return _createClass(ToggleTooltip, [{
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
      return React.createElement("div", {
        className: classNames(style.popover, "".concat(theme), _defineProperty({}, direction, direction)),
        ref: function ref(node) {
          return _this2.node = node;
        }
      }, React.createElement(Button, {
        iconProps: {
          icon: "more-horiz"
        },
        variant: "white",
        marginRight: "sm",
        isOutline: false,
        onClick: this._popoverOnClick
      }), React.createElement("div", {
        className: classNames("popoverPanelRuleMgmt", _defineProperty({}, "open", this.state.show))
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
        direction: PropTypes.string,
        theme: PropTypes.string
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
}(React.Component);
export default ToggleTooltip;
//# sourceMappingURL=ToggleTooltip.js.map