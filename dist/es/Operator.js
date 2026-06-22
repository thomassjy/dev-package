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
import { Button, ModalManager } from "@traveloka/soya-components";
import OperatorModal from "./OperatorModal";
import StaticLinkText from "./StaticLinkText/StaticLinkText";
import * as style from "./CommonRule.styles";
var Operator = function (_React$Component) {
  function Operator(props) {
    var _this;
    _classCallCheck(this, Operator);
    _this = _callSuper(this, Operator, [props]);
    _defineProperty(_this, "handleShowModalChangeOperator", function () {
      var value = _this.props.value;
      ModalManager.show({
        title: "Change Operator",
        body: React.createElement(OperatorModal, {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleChangeOperatorCondition,
          operator: value
        }),
        footer: " "
      });
    });
    _defineProperty(_this, "handleChangeOperatorCondition", function (operator) {
      if (operator === "And" || operator === "Or") {
        _this.changeAndOrCondition(operator);
      } else {
        _this.changeNotCondition();
      }
      ModalManager.dismiss();
    });
    _defineProperty(_this, "handleCancelModalManager", function () {
      ModalManager.dismiss();
    });
    _defineProperty(_this, "handleNotCondition", function () {
      _this.handleOperatorFromNotCondition("Not");
    });
    _defineProperty(_this, "handleOrCondition", function () {
      _this.handleOperatorFromNotCondition("Or");
    });
    _defineProperty(_this, "handleAndCondition", function () {
      _this.handleOperatorFromNotCondition("And");
    });
    _defineProperty(_this, "handleOperatorFromNotCondition", function (operator) {
      var _this$props = _this.props,
        actions = _this$props.actions,
        componentIndex = _this$props.componentIndex,
        index = _this$props.index,
        condition = _this$props.condition;
      var newLeaf = operator === "Not" ? [condition] : [condition, {}];
      var newCondition = {
        root: operator,
        leaf: newLeaf
      };
      actions.editCondition(componentIndex, index, newCondition);
    });
    _defineProperty(_this, "handleRemoveCondition", function () {
      var value = _this.props.value;
      var isBinaryOperator = value && (value.toUpperCase() === "AND" || value.toUpperCase() === "OR");
      var body = isBinaryOperator ? "Are you sure you want to delete this operator? The item directly above it will be removed and the rest of the conditions will be kept." : "Are you sure you want to delete this operator? Its branch will be kept.";
      ModalManager.show({
        title: "Delete Operator",
        type: "default",
        body: body,
        footer: React.createElement("div", null, React.createElement(Button, {
          variant: "link",
          onClick: function onClick() {
            return ModalManager.dismiss();
          }
        }, "Cancel"), React.createElement(Button, {
          variant: "blue",
          onClick: function onClick() {
            return _this.handleConfirmRemove();
          }
        }, "Proceed"))
      });
    });
    _defineProperty(_this, "handleConfirmRemove", function () {
      var _this$props2 = _this.props,
        componentIndex = _this$props2.componentIndex,
        index = _this$props2.index,
        actions = _this$props2.actions;
      actions.removeOperator(componentIndex, index);
      ModalManager.dismiss();
    });
    return _this;
  }
  _inherits(Operator, _React$Component);
  return _createClass(Operator, [{
    key: "changeAndOrCondition",
    value: function changeAndOrCondition(operator) {
      var _this$props3 = this.props,
        actions = _this$props3.actions,
        componentIndex = _this$props3.componentIndex,
        index = _this$props3.index,
        condition = _this$props3.condition;
      var newLeaf = condition.leaf.length > 1 ? condition.leaf : [condition.leaf[0], {}];
      var newCondition = {
        root: operator,
        leaf: newLeaf
      };
      actions.editCondition(componentIndex, index, newCondition);
    }
  }, {
    key: "changeNotCondition",
    value: function changeNotCondition() {
      var _this$props4 = this.props,
        actions = _this$props4.actions,
        componentIndex = _this$props4.componentIndex,
        index = _this$props4.index,
        condition = _this$props4.condition;
      var newCondition = {
        root: "Not",
        leaf: [condition.leaf[0]]
      };
      actions.editCondition(componentIndex, index, newCondition);
    }
  }, {
    key: "addOpFromNotCondition",
    value: function addOpFromNotCondition(e, operator) {
      var _this$props5 = this.props,
        actions = _this$props5.actions,
        componentIndex = _this$props5.componentIndex,
        index = _this$props5.index,
        condition = _this$props5.condition;
      var newLeaf = operator === "Not" ? [condition] : [condition, {}];
      var newCondition = {
        root: operator,
        leaf: newLeaf
      };
      actions.editCondition(componentIndex, index, newCondition);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props6 = this.props,
        value = _this$props6.value,
        margin = _this$props6.margin;
      return React.createElement("div", {
        className: style.conditionRow,
        style: {
          marginLeft: margin
        }
      }, React.createElement(StaticLinkText, {
        text: value,
        onClick: this.handleShowModalChangeOperator,
        color: "#79d1aa"
      }), React.createElement("div", {
        className: style.operatorGroup
      }, value === "Not" ? React.createElement("div", {
        style: {
          display: "inline"
        }
      }, React.createElement(StaticLinkText, {
        text: "NOT",
        onClick: function onClick(e) {
          return _this2.addOpFromNotCondition(e, "Not");
        }
      }), React.createElement(StaticLinkText, {
        text: "OR",
        onClick: function onClick(e) {
          return _this2.addOpFromNotCondition(e, "Or");
        }
      }), React.createElement(StaticLinkText, {
        text: "AND",
        onClick: function onClick(e) {
          return _this2.addOpFromNotCondition(e, "And");
        }
      })) : null, React.createElement(StaticLinkText, {
        text: "Remove",
        color: "#F44336",
        onClick: this.handleRemoveCondition
      })));
    }
  }]);
}(React.Component);
Operator.propTypes = {
  componentIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  condition: PropTypes.object.isRequired
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
export default compose(applyReducers(commonRulesReducers), connect(mapStateToProps, mapDispatchToProps))(Operator);
//# sourceMappingURL=Operator.js.map