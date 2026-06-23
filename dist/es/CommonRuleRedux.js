import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
import update from "immutability-helper";
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
update.extend("$autoObject", function (value, object) {
  return object ? update(object, value) : update({}, value);
});
update.extend("$autoArray", function (value, object) {
  return object ? update(object, value) : update([], value);
});
export var commonRulesSelector = {
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
export var commonRulesReducers = _defineProperty({}, namespace, function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case ActionType.SET_RULES:
      {
        return update(state, {
          rules: {
            $set: action.data.rules
          }
        });
      }
    case ActionType.SET_RULE_STRUCTURE:
      {
        return update(state, {
          rulestructures: {
            $set: action.rulestructures
          }
        });
      }
    case ActionType.ADD_RULE:
      {
        return update(state, {
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
        return update(state, {
          rules: _defineProperty({}, action.index, {
            $set: action.rule
          })
        });
      }
    case ActionType.REMOVE_RULE:
      {
        return update(state, {
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
        return update(state, {
          rules: {
            $set: nextRules
          }
        });
      }
    case ActionType.ADD_ACTION:
      {
        return update(state, {
          rules: _defineProperty({}, action.ruleIndex, {
            actions: {
              $push: [action.action]
            }
          })
        });
      }
    case ActionType.EDIT_ACTION:
      {
        return update(state, {
          rules: _defineProperty({}, action.ruleIndex, {
            actions: _defineProperty({}, action.actionIndex, {
              $set: action.action
            })
          })
        });
      }
    case ActionType.REMOVE_ACTION:
      {
        return update(state, {
          rules: _defineProperty({}, action.ruleIndex, {
            actions: {
              $splice: [[[action.actionIndex], 1]]
            }
          })
        });
      }
    case ActionType.ADD_CONDITION:
      {
        return update(state, {
          rules: _defineProperty({}, action.ruleIndex, {
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
            condIndex = _defineProperty({}, idx, {
              $set: action.condition
            });
          } else {
            condIndex = _defineProperty({}, idx, condIndex);
          }
        }
        return update(state, {
          rules: _defineProperty({}, action.ruleIndex, {
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
            condLeftIndex = _defineProperty({}, _idx, {
              leaf: {
                $set: left
              }
            });
          } else {
            condLeftIndex = _defineProperty({}, _idx, condLeftIndex);
          }
        }
        return update(state, {
          rules: _defineProperty({}, action.ruleIndex, {
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
            condRightIndex = _defineProperty({}, _idx2, {
              leaf: {
                1: {
                  $set: right
                }
              }
            });
          } else {
            condRightIndex = _defineProperty({}, _idx2, condRightIndex);
          }
        }
        return update(state, {
          rules: _defineProperty({}, action.ruleIndex, {
            conditions: condRightIndex
          })
        });
      }
    case ActionType.REMOVE_CONDITION:
      {
        var rmCondIndex = {};
        for (var _i3 = action.conditionIndex.length - 1; _i3 >= 0; _i3--) {
          var _idx3 = action.conditionIndex[_i3];
          if (!isNaN(_idx3)) {
            _idx3 = Number(_idx3);
          }
          if (_i3 === action.conditionIndex.length - 1) {
            rmCondIndex = _defineProperty({}, _idx3, {
              $set: {}
            });
          } else {
            rmCondIndex = _defineProperty({}, _idx3, rmCondIndex);
          }
        }
        if (rmCondIndex.length === 1 && action.conditionIndex.length === 1 && action.conditionIndex[0] === 0) {
          rmCondIndex = [];
        }
        return update(state, {
          rules: _defineProperty({}, action.ruleIndex, {
            conditions: rmCondIndex
          })
        });
      }
    case ActionType.REMOVE_OPERATOR:
      {
        var conditionIndex = action.conditionIndex.map(function (idx) {
          return isNaN(idx) ? idx : Number(idx);
        });
        var conditions = JSON.parse(JSON.stringify(state.rules[action.ruleIndex].conditions || []));
        var parent = null;
        var parentKey = null;
        var node = conditions;
        for (var _i4 = 0; _i4 < conditionIndex.length; _i4++) {
          parent = node;
          parentKey = conditionIndex[_i4];
          node = node == null ? undefined : node[conditionIndex[_i4]];
        }
        if (node == null || parent == null || parentKey == null) {
          return state;
        }
        var children = [];
        if (node.leaf && node.leaf.length > 0) {
          if (node.leaf[0] && Object.keys(node.leaf[0]).length > 0) {
            children.push(node.leaf[0]);
          }
          if (node.leaf.length > 1 && node.leaf[1] && Object.keys(node.leaf[1]).length > 0) {
            children.push(node.leaf[1]);
          }
        }
        var inPlace = children.length > 0 ? children[0] : {};
        var lifted = children.slice(1);
        parent[parentKey] = inPlace;
        var _iterator = _createForOfIteratorHelper(lifted),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            conditions.push(child);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return update(state, {
          rules: _defineProperty({}, action.ruleIndex, {
            conditions: {
              $set: conditions
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
export var commonRulesMapDisToProps = {
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
export var fetchRuleSet = function fetchRuleSet(service, props, version) {
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
export var fetchData = function fetchData(service, props, version) {
  return Promise.all([_fetchRulesStructure(service, props), _fetchRuleSet(service, props, version)]).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      ruleStructures = _ref3[0].data,
      rules = _ref3[1].data;
    props.setRuleStructure(ruleStructures.data);
    props.setRules(rules.data);
  });
};
//# sourceMappingURL=CommonRuleRedux.js.map