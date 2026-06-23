"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchRuleSet = exports.fetchData = exports.commonRulesSelector = exports.commonRulesReducers = exports.commonRulesMapDisToProps = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));
var namespace = "commonrule";
var ActionType = {
  SET_RULES: "".concat(namespace, ".setRules"),
  SET_RULE_STRUCTURE: "".concat(namespace, ".setRuleStructure"),
  ADD_RULE: "".concat(namespace, ".addRule"),
  EDIT_RULE: "".concat(namespace, ".editRule"),
  REMOVE_RULE: "".concat(namespace, ".removeRule"),
  MOVE_RULE: "".concat(namespace, ".moveRule"),
  ADD_ACTION: "".concat(namespace, ".addAction"),
  EDIT_ACTION: "".concat(namespace, ".editAction"),
  REMOVE_ACTION: "".concat(namespace, ".removeAction"),
  ADD_CONDITION: "".concat(namespace, ".addCondition"),
  EDIT_CONDITION: "".concat(namespace, ".editCondition"),
  EDIT_LEFT_CONDITION: "".concat(namespace, ".editLeftCondition"),
  EDIT_RIGHT_CONDITION: "".concat(namespace, ".editRightCondition"),
  REMOVE_CONDITION: "".concat(namespace, ".removeCondition"),
  REMOVE_OPERATOR: "".concat(namespace, ".removeOperator")
};
_immutabilityHelper["default"].extend("$autoObject", function (value, object) {
  return object ? (0, _immutabilityHelper["default"])(object, value) : (0, _immutabilityHelper["default"])({}, value);
});
_immutabilityHelper["default"].extend("$autoArray", function (value, object) {
  return object ? (0, _immutabilityHelper["default"])(object, value) : (0, _immutabilityHelper["default"])([], value);
});
function removeNodeAtPath(conditionsInput, path) {
  var conditions = JSON.parse(JSON.stringify(conditionsInput || []));
  conditions = removeAtPath(conditions, (path || []).map(normalizeKey));
  return conditions;
}
function normalizeKey(idx) {
  return isNaN(idx) ? idx : Number(idx);
}
function removeAtPath(conditions, keys) {
  if (keys.length === 0) return conditions;
  if (keys.length === 1) {
    conditions.splice(Number(keys[0]), 1);
    return conditions;
  }
  var opPath = keys.slice(0, keys.length - 2);
  var leafIndex = Number(keys[keys.length - 1]);
  var opParent = null;
  var opParentKey = null;
  var opNode = conditions;
  for (var i = 0; i < opPath.length; i++) {
    opParent = opNode;
    opParentKey = opPath[i];
    opNode = opNode == null ? undefined : opNode[opPath[i]];
  }
  if (opNode == null || !opNode.leaf || opParent == null) {
    return conditions;
  }
  var sibling = opNode.leaf[leafIndex === 0 ? 1 : 0];
  if (sibling && Object.keys(sibling).length > 0) {
    opParent[opParentKey] = sibling;
  } else {
    return removeAtPath(conditions, opPath);
  }
  return conditions;
}
var commonRulesSelector = exports.commonRulesSelector = {
  getRulesLength: function getRulesLength(state) {
    return state[namespace].rules.length;
  },
  getRules: function getRules(state) {
    return state[namespace].rules;
  },
  getRule: function getRule(state, index) {
    return state[namespace].rules[index];
  },
  getRuleStructures: function getRuleStructures(state) {
    return state[namespace].rulestructures;
  }
};
var initialState = {
  rules: [],
  rulestructures: {}
};
var commonRulesReducers = exports.commonRulesReducers = (0, _defineProperty2["default"])({}, namespace, function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case ActionType.SET_RULES:
      {
        return (0, _immutabilityHelper["default"])(state, {
          rules: {
            $set: action.data.rules
          }
        });
      }
    case ActionType.SET_RULE_STRUCTURE:
      {
        return (0, _immutabilityHelper["default"])(state, {
          rulestructures: {
            $set: action.rulestructures
          }
        });
      }
    case ActionType.ADD_RULE:
      {
        return (0, _immutabilityHelper["default"])(state, {
          rules: {
            $push: [action.rule]
          }
        });
      }
    case ActionType.EDIT_RULE:
      {
        var rules = state.rules;
        action.rule.conditions = rules[action.index].conditions;
        action.rule.actions = rules[action.index].actions;
        return (0, _immutabilityHelper["default"])(state, {
          rules: (0, _defineProperty2["default"])({}, action.index, {
            $set: action.rule
          })
        });
      }
    case ActionType.REMOVE_RULE:
      {
        return (0, _immutabilityHelper["default"])(state, {
          rules: {
            $splice: [[[action.index], 1]]
          }
        });
      }
    case ActionType.MOVE_RULE:
      {
        var index = action.index,
          targetIndex = action.targetIndex;
        var _rules2 = state.rules;
        if (index < 0 || targetIndex < 0 || index >= _rules2.length || targetIndex >= _rules2.length) {
          return state;
        }
        var nextRules = _rules2.slice();
        var moved = nextRules[index];
        nextRules[index] = nextRules[targetIndex];
        nextRules[targetIndex] = moved;
        return (0, _immutabilityHelper["default"])(state, {
          rules: {
            $set: nextRules
          }
        });
      }
    case ActionType.ADD_ACTION:
      {
        return (0, _immutabilityHelper["default"])(state, {
          rules: (0, _defineProperty2["default"])({}, action.ruleIndex, {
            actions: {
              $push: [action.action]
            }
          })
        });
      }
    case ActionType.EDIT_ACTION:
      {
        return (0, _immutabilityHelper["default"])(state, {
          rules: (0, _defineProperty2["default"])({}, action.ruleIndex, {
            actions: (0, _defineProperty2["default"])({}, action.actionIndex, {
              $set: action.action
            })
          })
        });
      }
    case ActionType.REMOVE_ACTION:
      {
        return (0, _immutabilityHelper["default"])(state, {
          rules: (0, _defineProperty2["default"])({}, action.ruleIndex, {
            actions: {
              $splice: [[[action.actionIndex], 1]]
            }
          })
        });
      }
    case ActionType.ADD_CONDITION:
      {
        return (0, _immutabilityHelper["default"])(state, {
          rules: (0, _defineProperty2["default"])({}, action.ruleIndex, {
            conditions: {
              $push: [action.condition]
            }
          })
        });
      }
    case ActionType.EDIT_CONDITION:
      {
        var condIndex = {};
        for (var i = action.conditionIndex.length - 1; i >= 0; i--) {
          var idx = action.conditionIndex[i];
          if (i === action.conditionIndex.length - 1) {
            condIndex = (0, _defineProperty2["default"])({}, idx, {
              $set: action.condition
            });
          } else {
            condIndex = (0, _defineProperty2["default"])({}, idx, condIndex);
          }
        }
        return (0, _immutabilityHelper["default"])(state, {
          rules: (0, _defineProperty2["default"])({}, action.ruleIndex, {
            conditions: condIndex
          })
        });
      }
    case ActionType.EDIT_LEFT_CONDITION:
      {
        var condLeftIndex = {};
        for (var _i = action.conditionIndex.length - 1; _i >= 0; _i--) {
          var _idx = action.conditionIndex[_i];
          if (_i === action.conditionIndex.length - 1) {
            var left = [action.leftCondition];
            condLeftIndex = (0, _defineProperty2["default"])({}, _idx, {
              leaf: {
                $set: left
              }
            });
          } else {
            condLeftIndex = (0, _defineProperty2["default"])({}, _idx, condLeftIndex);
          }
        }
        return (0, _immutabilityHelper["default"])(state, {
          rules: (0, _defineProperty2["default"])({}, action.ruleIndex, {
            conditions: condLeftIndex
          })
        });
      }
    case ActionType.EDIT_RIGHT_CONDITION:
      {
        var condRightIndex = {};
        for (var _i2 = action.conditionIndex.length - 1; _i2 >= 0; _i2--) {
          var _idx2 = action.conditionIndex[_i2];
          if (_i2 === action.conditionIndex.length - 1) {
            var right = action.rightCondition;
            condRightIndex = (0, _defineProperty2["default"])({}, _idx2, {
              leaf: {
                1: {
                  $set: right
                }
              }
            });
          } else {
            condRightIndex = (0, _defineProperty2["default"])({}, _idx2, condRightIndex);
          }
        }
        return (0, _immutabilityHelper["default"])(state, {
          rules: (0, _defineProperty2["default"])({}, action.ruleIndex, {
            conditions: condRightIndex
          })
        });
      }
    case ActionType.REMOVE_CONDITION:
      {
        var conditions = removeNodeAtPath(state.rules[action.ruleIndex].conditions, action.conditionIndex);
        return (0, _immutabilityHelper["default"])(state, {
          rules: (0, _defineProperty2["default"])({}, action.ruleIndex, {
            conditions: {
              $set: conditions
            }
          })
        });
      }
    case ActionType.REMOVE_OPERATOR:
      {
        var _conditions = removeNodeAtPath(state.rules[action.ruleIndex].conditions, action.conditionIndex);
        return (0, _immutabilityHelper["default"])(state, {
          rules: (0, _defineProperty2["default"])({}, action.ruleIndex, {
            conditions: {
              $set: _conditions
            }
          })
        });
      }
    default:
      return state;
  }
});
var setRules = function setRules(data) {
  return {
    type: ActionType.SET_RULES,
    data: data
  };
};
var setRuleStructure = function setRuleStructure(data) {
  return {
    type: ActionType.SET_RULE_STRUCTURE,
    rulestructures: data
  };
};
var addRule = function addRule(rule) {
  return {
    type: ActionType.ADD_RULE,
    rule: rule
  };
};
var editRule = function editRule(index, rule) {
  return {
    type: ActionType.EDIT_RULE,
    index: index,
    rule: rule
  };
};
var removeRule = function removeRule(index) {
  return {
    type: ActionType.REMOVE_RULE,
    index: index
  };
};
var moveRule = function moveRule(index, targetIndex) {
  return {
    type: ActionType.MOVE_RULE,
    index: index,
    targetIndex: targetIndex
  };
};
var addAction = function addAction(ruleIndex, action) {
  return {
    type: ActionType.ADD_ACTION,
    ruleIndex: ruleIndex,
    action: action
  };
};
var editAction = function editAction(ruleIndex, actionIndex, action) {
  return {
    type: ActionType.EDIT_ACTION,
    ruleIndex: ruleIndex,
    actionIndex: actionIndex,
    action: action
  };
};
var removeAction = function removeAction(ruleIndex, actionIndex) {
  return {
    type: ActionType.REMOVE_ACTION,
    ruleIndex: ruleIndex,
    actionIndex: actionIndex
  };
};
var addCondition = function addCondition(ruleIndex, condition) {
  return {
    type: ActionType.ADD_CONDITION,
    ruleIndex: ruleIndex,
    condition: condition
  };
};
var editCondition = function editCondition(ruleIndex, conditionIndex, condition) {
  return {
    type: ActionType.EDIT_CONDITION,
    ruleIndex: ruleIndex,
    conditionIndex: conditionIndex,
    condition: condition
  };
};
var editLeftCondition = function editLeftCondition(ruleIndex, conditionIndex, leftCondition) {
  return {
    type: ActionType.EDIT_LEFT_CONDITION,
    ruleIndex: ruleIndex,
    conditionIndex: conditionIndex,
    leftCondition: leftCondition
  };
};
var editRightCondition = function editRightCondition(ruleIndex, conditionIndex, rightCondition) {
  return {
    type: ActionType.EDIT_RIGHT_CONDITION,
    ruleIndex: ruleIndex,
    conditionIndex: conditionIndex,
    rightCondition: rightCondition
  };
};
var removeCondition = function removeCondition(ruleIndex, conditionIndex) {
  return {
    type: ActionType.REMOVE_CONDITION,
    ruleIndex: ruleIndex,
    conditionIndex: conditionIndex
  };
};
var removeOperator = function removeOperator(ruleIndex, conditionIndex) {
  return {
    type: ActionType.REMOVE_OPERATOR,
    ruleIndex: ruleIndex,
    conditionIndex: conditionIndex
  };
};
var commonRulesMapDisToProps = exports.commonRulesMapDisToProps = {
  setRules: setRules,
  setRuleStructure: setRuleStructure,
  addRule: addRule,
  editRule: editRule,
  removeRule: removeRule,
  moveRule: moveRule,
  addAction: addAction,
  editAction: editAction,
  removeAction: removeAction,
  addCondition: addCondition,
  editCondition: editCondition,
  editLeftCondition: editLeftCondition,
  editRightCondition: editRightCondition,
  removeCondition: removeCondition,
  removeOperator: removeOperator
};
var fetchRuleSet = exports.fetchRuleSet = function fetchRuleSet(service, props, version) {
  return _fetchRuleSet(service, props, version).then(function (_ref) {
    var rules = _ref.data;
    props.setRules(rules.data);
  });
};
var _fetchRuleSet = function _fetchRuleSet(service, props, version) {
  return service.loadRuleSet({
    ruleSetHeader: props.ruleSetHeader,
    version: version
  });
};
var _fetchRulesStructure = function _fetchRulesStructure(service, props) {
  return service.getRulesStructure({
    ruleSetHeader: props.ruleSetHeader
  });
};
var fetchData = exports.fetchData = function fetchData(service, props, version) {
  return Promise.all([_fetchRulesStructure(service, props), _fetchRuleSet(service, props, version)]).then(function (_ref2) {
    var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
      ruleStructures = _ref3[0].data,
      rules = _ref3[1].data;
    props.setRuleStructure(ruleStructures.data);
    props.setRules(rules.data);
  });
};
//# sourceMappingURL=CommonRuleRedux.js.map