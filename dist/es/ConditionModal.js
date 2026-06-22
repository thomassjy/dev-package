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
import applyReducers from "@traveloka/soya-components/lib/legacy/applyReducers";
import { commonRulesMapDisToProps, commonRulesReducers, commonRulesSelector } from "./CommonRuleRedux";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button, Label } from "@traveloka/soya-components";
import DropdownInput from "./DropdownInput";
import * as style from "./CommonRule.styles";
var ConditionModal = function (_React$Component) {
  function ConditionModal(props) {
    var _this;
    _classCallCheck(this, ConditionModal);
    _this = _callSuper(this, ConditionModal, [props]);
    _defineProperty(_this, "getDefaultOperator", function (ruleStructures) {
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      for (var i in expressionStructure) {
        if (expressionStructure[i].type === "operator") {
          return i;
        }
      }
      return null;
    });
    _defineProperty(_this, "getDropdownItems", function () {
      var options = [];
      var ruleStructures = _this.props.ruleStructures;
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      for (var i in expressionStructure) {
        if (expressionStructure[i].type === "operator") {
          options.push({
            label: _this.getOperatorLabel(i),
            value: i
          });
        }
      }
      return options;
    });
    _defineProperty(_this, "getOperatorLabel", function (operatorId) {
      var ruleStructures = _this.props.ruleStructures;
      var formatterStructure = JSON.parse(ruleStructures.formatterStructure);
      return formatterStructure[operatorId].label;
    });
    _defineProperty(_this, "handleSelectChange", function (name, value) {
      var stateObj = {};
      stateObj[name] = value;
      _this.setState(stateObj);
    });
    _defineProperty(_this, "handleCancel", function () {
      var onCancel = _this.props.onCancel;
      onCancel();
    });
    _defineProperty(_this, "handleSave", function () {
      var onSave = _this.props.onSave;
      var root = _this.state.root;
      onSave({
        root: root
      });
    });
    _this.state = {
      root: props.existingValue ? props.existingValue : _this.getDefaultOperator(props.ruleStructures)
    };
    return _this;
  }
  _inherits(ConditionModal, _React$Component);
  return _createClass(ConditionModal, [{
    key: "render",
    value: function render() {
      var root = this.state.root;
      var rootItems = this.getDropdownItems();
      return React.createElement("div", null, React.createElement("div", null, React.createElement(Label, null, "Condition"), React.createElement(DropdownInput, {
        value: root,
        name: "root",
        onChange: this.handleSelectChange,
        items: rootItems
      })), React.createElement("div", {
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
ConditionModal.propTypes = {
  existingValue: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  ruleStructures: PropTypes.string.isRequired
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    ruleStructures: commonRulesSelector.getRuleStructures(state)
  };
};
export default compose(applyReducers(commonRulesReducers), connect(mapStateToProps, commonRulesMapDisToProps))(ConditionModal);
//# sourceMappingURL=ConditionModal.js.map