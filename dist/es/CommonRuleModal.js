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
import { required, number } from "./ValidationUtil";
import { Button } from "@traveloka/soya-components";
import DropdownInput from "./DropdownInput";
import { NotificationManager, Label } from "@traveloka/soya-components";
import TextInput from "./TextInput";
import * as style from "./CommonRule.styles";
var CommonRuleModal = function (_React$Component) {
  function CommonRuleModal(props) {
    var _this;
    _classCallCheck(this, CommonRuleModal);
    _this = _callSuper(this, CommonRuleModal, [props]);
    _defineProperty(_this, "handleInputChange", function (name, value, isValid) {
      if (isValid) {
        var stateObj = {};
        stateObj[name] = value;
        _this.setState(stateObj);
      }
    });
    _defineProperty(_this, "handleSelectChange", function (name, value) {
      _this.setState({
        enabled: value
      });
    });
    _defineProperty(_this, "handleCancel", function () {
      var onCancel = _this.props.onCancel;
      onCancel();
    });
    _defineProperty(_this, "handleSave", function () {
      var onSave = _this.props.onSave;
      var _this$state = _this.state,
        name = _this$state.name,
        description = _this$state.description,
        priority = _this$state.priority;
      var enabled = _this.state.enabled;
      if (name && priority && enabled) {
        enabled = enabled === "true";
        onSave({
          name: name,
          description: description,
          priority: priority,
          enabled: enabled
        });
      } else {
        NotificationManager.showError("Please fix input");
      }
    });
    if (props.mode === "create") {
      _this.state = {
        name: "",
        description: "",
        priority: "0",
        enabled: "true"
      };
    } else {
      _this.state = {
        name: props.rule.name || "",
        description: props.rule.description || "",
        priority: props.rule.priority || "0",
        enabled: props.rule ? props.rule.enabled.toString() : "true"
      };
    }
    return _this;
  }
  _inherits(CommonRuleModal, _React$Component);
  return _createClass(CommonRuleModal, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
        name = _this$state2.name,
        description = _this$state2.description,
        priority = _this$state2.priority,
        enabled = _this$state2.enabled;
      var mode = this.props.mode;
      var enabledItems = [{
        value: "true",
        label: "True"
      }, {
        value: "false",
        label: "False"
      }];
      return React.createElement("div", null, React.createElement("div", null, React.createElement(Label, null, "Name"), React.createElement(TextInput, {
        value: name,
        placeholder: "Rule Name",
        name: "name",
        onChange: this.handleInputChange,
        validators: [required]
      })), React.createElement("div", null, React.createElement(Label, null, "Description"), React.createElement(TextInput, {
        value: description,
        placeholder: "Description",
        name: "description",
        onChange: this.handleInputChange,
        validators: []
      })), React.createElement("div", null, React.createElement(Label, null, "Priority"), React.createElement(TextInput, {
        value: priority,
        placeholder: "Priority",
        name: "priority",
        onChange: this.handleInputChange,
        validators: [required, number]
      })), React.createElement("div", null, React.createElement(Label, null, "Enabled"), React.createElement(DropdownInput, {
        value: enabled,
        name: "enabled",
        onChange: this.handleSelectChange,
        items: enabledItems
      })), React.createElement("div", {
        className: style.modalFooter
      }, React.createElement(Button, {
        onClick: this.handleCancel,
        color: "link"
      }, "Close"), React.createElement(Button, {
        onClick: this.handleSave,
        color: "blue"
      }, mode === "edit" ? "Save" : "Add")));
    }
  }]);
}(React.Component);
CommonRuleModal.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  mode: PropTypes.oneOf(["create", "edit", "duplicate"]),
  rule: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.number,
    enabled: PropTypes.bool
  })
};
export default CommonRuleModal;
//# sourceMappingURL=CommonRuleModal.js.map