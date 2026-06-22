import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import PropTypes from "prop-types";
import React from "react";
import applyReducers from "@traveloka/soya-components/lib/legacy/applyReducers";
import { commonRulesMapDisToProps, commonRulesReducers } from "./CommonRuleRedux";
import { compose } from "redux";
import { connect } from "react-redux";
import ConditionRow from "./ConditionRow";
import Operator from "./Operator";
import * as style from "./CommonRule.styles";
var Condition = function (_React$Component) {
  function Condition(props) {
    _classCallCheck(this, Condition);
    return _callSuper(this, Condition, [props]);
  }
  _inherits(Condition, _React$Component);
  return _createClass(Condition, [{
    key: "renderCondition",
    value: function renderCondition(condition, index, initialMargin, lastOperator) {
      var componentIndex = this.props.componentIndex;
      var margin = initialMargin;
      if (condition) {
        if (condition && condition.root && (condition.root.toUpperCase() === "AND" || condition.root.toUpperCase() === "OR" || condition.root.toUpperCase() === "NOT")) {
          if (lastOperator && lastOperator !== condition.root) {
            margin += 35;
          }
          if (condition.root.toUpperCase() === "AND" || condition.root.toUpperCase() === "OR") {
            return React.createElement("div", {
              key: index
            }, this.renderCondition(condition.leaf[0], index.concat(["leaf", Number(0)]), margin, condition.root), React.createElement(Operator, {
              condition: condition,
              componentIndex: componentIndex,
              index: index,
              margin: margin,
              value: condition.root
            }), this.renderCondition(condition.leaf[1], index.concat(["leaf", Number(1)]), margin, condition.root));
          }
          return React.createElement("div", {
            key: index
          }, React.createElement(Operator, {
            condition: condition,
            componentIndex: componentIndex,
            index: index,
            margin: margin,
            value: condition.root
          }), " ", this.renderCondition(condition.leaf[0], index.concat(["leaf", Number(0)]), margin, condition.root));
        }
        return React.createElement("div", {
          key: index,
          className: style.conditionHelperLine,
          style: {
            marginLeft: margin
          }
        }, React.createElement(ConditionRow, {
          condition: condition,
          componentIndex: componentIndex,
          index: index
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        condition = _this$props.condition,
        index = _this$props.index;
      return React.createElement("div", null, this.renderCondition(condition, index, 10, ""));
    }
  }]);
}(React.Component);
Condition.propTypes = {
  condition: PropTypes.object.isRequired,
  componentIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};
export default compose(applyReducers(commonRulesReducers), connect(null, commonRulesMapDisToProps))(Condition);
//# sourceMappingURL=Condition.js.map