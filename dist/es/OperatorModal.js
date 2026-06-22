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
import { Button } from "@traveloka/soya-components";
import DropdownInput from "./DropdownInput";
import * as style from "./CommonRule.styles";
var OperatorModal = function (_React$Component) {
  function OperatorModal(props) {
    var _this;
    _classCallCheck(this, OperatorModal);
    _this = _callSuper(this, OperatorModal, [props]);
    _defineProperty(_this, "handleChangeValue", function (name, value) {
      _this.setState({
        operator: value
      });
    });
    _defineProperty(_this, "handleCancel", function () {
      var onCancel = _this.props.onCancel;
      onCancel();
    });
    _defineProperty(_this, "handleSave", function () {
      var onSave = _this.props.onSave;
      var operator = _this.state.operator;
      onSave(operator);
    });
    _this.state = {
      operator: props.operator
    };
    return _this;
  }
  _inherits(OperatorModal, _React$Component);
  return _createClass(OperatorModal, [{
    key: "render",
    value: function render() {
      var operator = this.state.operator;
      var operatorItems = [{
        value: "And",
        label: "And"
      }, {
        value: "Or",
        label: "Or"
      }, {
        value: "Not",
        label: "Not"
      }];
      return React.createElement("div", null, React.createElement("label", null, "Operator"), React.createElement("br", null), React.createElement(DropdownInput, {
        name: "operator",
        items: operatorItems,
        value: operator,
        onChange: this.handleChangeValue
      }), React.createElement("div", {
        className: style.modalFooter
      }, React.createElement(Button, {
        onClick: this.handleCancel,
        color: "link"
      }, "Close"), React.createElement(Button, {
        onClick: this.handleSave,
        color: "blue"
      }, "OK")));
    }
  }]);
}(React.Component);
OperatorModal.propTypes = {
  operator: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};
export default OperatorModal;
//# sourceMappingURL=OperatorModal.js.map