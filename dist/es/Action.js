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
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { commonRulesMapDisToProps, commonRulesReducers, commonRulesSelector } from "./CommonRuleRedux";
import { getRealValueByType, isValueValid } from "./CommonRuleFunctions";
import applyReducers from "@traveloka/soya-components/lib/legacy/applyReducers";
import ActionModal from "./ActionModal";
import { ModalManager } from "@traveloka/soya-components";
import { NotificationManager } from "@traveloka/soya-components";
import StaticLinkText from "./StaticLinkText/StaticLinkText";
import * as style from "./CommonRule.styles";
var Action = function (_React$Component) {
  function Action(props) {
    var _this;
    _classCallCheck(this, Action);
    _this = _callSuper(this, Action, [props]);
    _defineProperty(_this, "handleShowEditActionModal", function () {
      var action = _this.props.action;
      ModalManager.show({
        title: "Edit Action",
        body: React.createElement(ActionModal, {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleEditAction,
          existingValue: action
        }),
        footer: " "
      });
    });
    _defineProperty(_this, "handleCancelModalManager", function () {
      ModalManager.dismiss();
    });
    _defineProperty(_this, "handleRemoveAction", function () {
      var _this$props = _this.props,
        componentIndex = _this$props.componentIndex,
        index = _this$props.index,
        actions = _this$props.actions;
      actions.removeAction(componentIndex, index);
    });
    _defineProperty(_this, "handleEditAction", function (actionValue) {
      var payload = {};
      var error = false;
      var _this$props2 = _this.props,
        componentIndex = _this$props2.componentIndex,
        index = _this$props2.index,
        actions = _this$props2.actions;
      var expressionStructure = JSON.parse(_this.props.ruleStructures.expressionStructure);
      for (var i in actionValue) {
        if (i !== "root") {
          for (var j in expressionStructure[actionValue.root].property) {
            if (i === expressionStructure[actionValue.root].property[j]) {
              if (isValueValid(expressionStructure[actionValue.root].input[j], actionValue[i])) {
                payload[i] = getRealValueByType(expressionStructure[actionValue.root].input[j], actionValue[i]);
              } else {
                error = true;
              }
            }
          }
        } else {
          payload.root = actionValue.root;
        }
      }
      if (!error) {
        actions.editAction(componentIndex, index, payload);
        ModalManager.dismiss();
      } else {
        NotificationManager.showError("Input is not valid, please re-check");
      }
    });
    return _this;
  }
  _inherits(Action, _React$Component);
  return _createClass(Action, [{
    key: "getActionText",
    value: function getActionText() {
      var _this$props3 = this.props,
        action = _this$props3.action,
        ruleStructures = _this$props3.ruleStructures;
      var formatterStructure = JSON.parse(ruleStructures.formatterStructure);
      var displayFormat = formatterStructure[action.root].displayFormat;
      var fields = Object.values(formatterStructure[action.root].fields);
      var actionParams = [];
      for (var i in displayFormat) {
        if (displayFormat[i].indexOf("{") !== -1 && displayFormat[i].indexOf("}") !== -1) {
          var fieldIdx = parseInt(displayFormat[i].replace(/{|}/g, ""), 10);
          if (!isNaN(fieldIdx) && fieldIdx >= 0) {
            actionParams.push(action[fields[fieldIdx].id]);
          }
        } else {
          actionParams.push(displayFormat[i]);
        }
      }
      return React.createElement("span", {
        className: style.actionValue
      }, actionParams.join(""));
    }
  }, {
    key: "render",
    value: function render() {
      var text = React.createElement("span", null, this.getActionText());
      return React.createElement("div", {
        className: style.actionContent
      }, React.createElement(StaticLinkText, {
        text: text,
        onClick: this.handleShowEditActionModal
      }), React.createElement("span", {
        className: style.actionButtons
      }, React.createElement(StaticLinkText, {
        text: "Remove",
        color: "#F44336",
        onClick: this.handleRemoveAction
      })));
    }
  }]);
}(React.Component);
Action.propTypes = {
  action: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  componentIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  ruleStructures: PropTypes.string
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
export default compose(applyReducers(commonRulesReducers), connect(mapStateToProps, mapDispatchToProps))(Action);
//# sourceMappingURL=Action.js.map