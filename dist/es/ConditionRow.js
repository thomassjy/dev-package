import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import PropTypes from "prop-types";
import React from "react";
import applyReducers from "@traveloka/soya-components/lib/legacy/applyReducers";
import { commonRulesMapDisToProps, commonRulesReducers, commonRulesSelector } from "./CommonRuleRedux";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getRealValueByType, isLeftConditionValid, isValueValid } from "./CommonRuleFunctions";
import { ModalManager } from "@traveloka/soya-components";
import ConditionLeftModal from "./ConditionLeftModal";
import ConditionModal from "./ConditionModal";
import ConditionRightModal from "./ConditionRightModal";
import { NotificationManager } from "@traveloka/soya-components";
import StaticLinkText from "./StaticLinkText/StaticLinkText";
import * as style from "./CommonRule.styles";
var ConditionRow = function (_React$Component) {
  function ConditionRow(props) {
    var _this;
    _classCallCheck(this, ConditionRow);
    _this = _callSuper(this, ConditionRow, [props]);
    _defineProperty(_this, "handleShowLeftModal", function () {
      var condition = _this.props.condition;
      if (condition.root) {
        ModalManager.show({
          title: "Change Left Expression",
          body: React.createElement(ConditionLeftModal, {
            onCancel: _this.handleCancelModalManager,
            onSave: _this.handleChangeLeftCondition,
            operator: condition.root,
            existingValue: _this.getLeftExistingValue()
          }),
          footer: " "
        });
      } else {
        NotificationManager.showError({
          message: "Choose operator first",
          size: "md"
        });
      }
    });
    _defineProperty(_this, "handleChangeLeftCondition", function (newLeftValue) {
      var _this$props = _this.props,
        componentIndex = _this$props.componentIndex,
        index = _this$props.index,
        actions = _this$props.actions;
      if (isLeftConditionValid(newLeftValue)) {
        var left = {};
        for (var i in newLeftValue) {
          left[i] = newLeftValue[i];
        }
        actions.editLeftCondition(componentIndex, index, left);
        ModalManager.dismiss();
      } else {
        _this.notification.showError("Input is not valid, please re-check");
      }
    });
    _defineProperty(_this, "handleChangeRightCondition", function (newRightValue) {
      var _this$props2 = _this.props,
        componentIndex = _this$props2.componentIndex,
        index = _this$props2.index,
        actions = _this$props2.actions;
      if (isValueValid(newRightValue.root, newRightValue.value)) {
        var right = {
          root: newRightValue.root,
          value: getRealValueByType(newRightValue.root, newRightValue.value)
        };
        actions.editRightCondition(componentIndex, index, right);
        ModalManager.dismiss();
      } else {
        _this.notification.showError("Input is not valid, please re-check");
      }
    });
    _defineProperty(_this, "handleShowOperatorModal", function () {
      var existingValue = _this.getOperatorExistingValue();
      ModalManager.show({
        title: "Change Operator",
        body: React.createElement(ConditionModal, {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleChangeOperatorCondition,
          existingValue: existingValue
        }),
        footer: " "
      });
    });
    _defineProperty(_this, "handleShowRightModal", function () {
      var condition = _this.props.condition;
      if (condition.leaf && condition.leaf.length > 0 && condition.leaf[0].root !== null) {
        ModalManager.show({
          title: "Change Right Expression",
          body: React.createElement(ConditionRightModal, {
            onCancel: _this.handleCancelModalManager,
            onSave: _this.handleChangeRightCondition,
            leftValue: condition.leaf[0].root,
            existingValue: _this.getRightExistingValue()
          }),
          footer: " "
        });
      } else {
        NotificationManager.showError({
          message: "Choose left expression first",
          size: "md"
        });
      }
    });
    _defineProperty(_this, "handleNotCondition", function () {
      var _this$props3 = _this.props,
        componentIndex = _this$props3.componentIndex,
        condition = _this$props3.condition,
        index = _this$props3.index,
        actions = _this$props3.actions;
      var newCondition = {
        root: "Not",
        leaf: [condition]
      };
      actions.editCondition(componentIndex, index, newCondition);
    });
    _defineProperty(_this, "handleChangeOperatorCondition", function (root) {
      var _this$props4 = _this.props,
        componentIndex = _this$props4.componentIndex,
        index = _this$props4.index,
        actions = _this$props4.actions;
      var condition = root;
      condition.leaf = [];
      actions.editCondition(componentIndex, index, condition);
      ModalManager.dismiss();
    });
    _defineProperty(_this, "handleAndCondition", function () {
      _this.handleAddOperatorCondition("And");
    });
    _defineProperty(_this, "handleOrCondition", function () {
      _this.handleAddOperatorCondition("Or");
    });
    _defineProperty(_this, "handleAddOperatorCondition", function (operator) {
      var _this$props5 = _this.props,
        componentIndex = _this$props5.componentIndex,
        condition = _this$props5.condition,
        index = _this$props5.index,
        actions = _this$props5.actions;
      var newCondition = {
        root: operator,
        leaf: [condition, {}]
      };
      actions.editCondition(componentIndex, index, newCondition);
    });
    _defineProperty(_this, "handleRemoveCondition", function () {
      var _this$props6 = _this.props,
        componentIndex = _this$props6.componentIndex,
        index = _this$props6.index,
        actions = _this$props6.actions;
      actions.removeCondition(componentIndex, index);
    });
    _defineProperty(_this, "handleCancelModalManager", function () {
      ModalManager.dismiss();
    });
    _defineProperty(_this, "displayCondition", function () {
      var condition = _this.props.condition;
      var leftValue = _this.getLeftConditionValue();
      var rightValue;
      if (condition.leaf && condition.leaf[1]) {
        if (condition.leaf[1].value) {
          rightValue = condition.leaf[1].value;
        } else {
          if (condition.leaf[1].date) {
            rightValue = condition.leaf[1].date;
          } else {
            rightValue = null;
          }
        }
      } else {
        rightValue = null;
      }
      return React.createElement("div", null, condition.root && React.createElement(StaticLinkText, {
        color: leftValue ? null : "#c1c1c1",
        text: leftValue ? leftValue : "Select Expression",
        onClick: _this.handleShowLeftModal
      }), React.createElement(StaticLinkText, {
        color: condition.root ? "#19bc80" : "#c1c1c1",
        text: condition.root ? condition.root : "Select Operator",
        onClick: _this.handleShowOperatorModal
      }), _this.getTotalFieldsByOperator(condition.root) > 1 ? React.createElement(StaticLinkText, {
        color: rightValue === null ? "#c1c1c1" : null,
        text: rightValue === null ? "Select Expression" : rightValue.toString(),
        onClick: _this.handleShowRightModal
      }) : null, Object.keys(condition).length > 0 ? React.createElement("div", {
        className: style.operatorGroup
      }, React.createElement(StaticLinkText, {
        text: "NOT",
        onClick: _this.handleNotCondition
      }), React.createElement(StaticLinkText, {
        text: "OR",
        onClick: _this.handleOrCondition
      }), React.createElement(StaticLinkText, {
        text: "AND",
        onClick: _this.handleAndCondition
      }), React.createElement(StaticLinkText, {
        text: "Remove",
        color: "#F44336",
        onClick: _this.handleRemoveCondition
      })) : null);
    });
    return _this;
  }
  _inherits(ConditionRow, _React$Component);
  return _createClass(ConditionRow, [{
    key: "getLeftConditionValue",
    value: function getLeftConditionValue() {
      var _this$props7 = this.props,
        condition = _this$props7.condition,
        ruleStructures = _this$props7.ruleStructures;
      var structureFormat = JSON.parse(ruleStructures.formatterStructure);
      var leftValue = "";
      if (condition.leaf && condition.leaf.length > 0) {
        var format = structureFormat[condition.leaf[0].root];
        if (Object.keys(condition.leaf[0]).length > 1) {
          var fields = Object.values(format.fields);
          for (var i in format.displayFormat) {
            if (format.displayFormat[i].indexOf("{") !== -1 && format.displayFormat[i].indexOf("}") !== -1) {
              var fieldIdx = parseInt(format.displayFormat[i].replace(/{|}/g, ""), 10);
              if (!isNaN(fieldIdx) && fieldIdx >= 0) {
                leftValue = leftValue.concat(condition.leaf[0][fields[fieldIdx].id]);
              }
            } else {
              leftValue = leftValue.concat(format.displayFormat[i]);
            }
          }
        } else {
          leftValue = format ? format.label : condition.leaf[0].root;
        }
      }
      return leftValue;
    }
  }, {
    key: "getTotalFieldsByOperator",
    value: function getTotalFieldsByOperator(operator) {
      var ruleStructures = this.props.ruleStructures;
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      if (expressionStructure[operator]) {
        return expressionStructure[operator].input.length;
      }
      return 1;
    }
  }, {
    key: "getLeftExistingValue",
    value: function getLeftExistingValue() {
      var condition = this.props.condition;
      var existingValue = {};
      if (condition.leaf && condition.leaf.length > 0) {
        if (condition.leaf[0].root) {
          existingValue.root = condition.leaf[0].root;
        }
        for (var i in condition.leaf[0]) {
          if (i !== "root") {
            existingValue[i] = condition.leaf[0][i];
          }
        }
        return existingValue;
      }
      return null;
    }
  }, {
    key: "getRightExistingValue",
    value: function getRightExistingValue() {
      var condition = this.props.condition;
      if (condition.leaf && condition.leaf.length > 0 && condition.leaf[0].root !== null) {
        if (condition.leaf && condition.leaf.length === 2) {
          if (condition.leaf[1]) {
            var rightValue = {
              root: condition.leaf[1].root
            };
            if (condition.leaf[1].value) {
              rightValue.value = condition.leaf[1].value;
            } else {
              for (var i in condition.leaf[1]) {
                if (i !== "root") {
                  rightValue[i] = condition.leaf[1][i];
                }
              }
            }
            return rightValue;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }, {
    key: "getOperatorExistingValue",
    value: function getOperatorExistingValue() {
      var condition = this.props.condition;
      return condition.root;
    }
  }, {
    key: "render",
    value: function render() {
      var ruleStructures = this.props.ruleStructures;
      if (!ruleStructures) return React.createElement("div", null);
      return React.createElement("div", {
        className: style.conditionRow
      }, this.displayCondition());
    }
  }]);
}(React.Component);
ConditionRow.propTypes = {
  condition: PropTypes.object.isRequired,
  componentIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  ruleStructures: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    ruleStructures: commonRulesSelector.getRuleStructures(state)
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(commonRulesMapDisToProps, dispatch)
  };
};
export default compose(applyReducers(commonRulesReducers), connect(mapStateToProps, mapDispatchToProps))(ConditionRow);
//# sourceMappingURL=ConditionRow.js.map