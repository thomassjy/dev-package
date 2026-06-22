"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _ServiceUtil = require("@traveloka/soya-components/lib/utils/ServiceUtil");
var CommonRuleService = function () {
  function CommonRuleService() {
    (0, _classCallCheck2["default"])(this, CommonRuleService);
  }
  return (0, _createClass2["default"])(CommonRuleService, [{
    key: "getAccessToken",
    value: function getAccessToken() {
      return localStorage.getItem("access_token");
    }
  }, {
    key: "loadRuleSet",
    value: function loadRuleSet(data) {
      return (0, _ServiceUtil.post)("/api/v2/rules/loadRuleSet", this.getAccessToken(), data);
    }
  }, {
    key: "getAllVersions",
    value: function getAllVersions(data) {
      return (0, _ServiceUtil.post)("/api/v2/rules/getVersions", this.getAccessToken(), data);
    }
  }, {
    key: "saveRuleSet",
    value: function saveRuleSet(data) {
      return (0, _ServiceUtil.post)("/api/v2/rules/saveRuleSet", this.getAccessToken(), data);
    }
  }, {
    key: "getRulesStructure",
    value: function getRulesStructure(data) {
      return (0, _ServiceUtil.post)("/api/v2/rules/getRulesStructure", this.getAccessToken(), data);
    }
  }, {
    key: "importRuleSet",
    value: function importRuleSet(data, file) {
      return (0, _ServiceUtil.postFile)("/api/v2/rules/importRuleSet", this.getAccessToken(), data, {
        "data.rules": file
      });
    }
  }, {
    key: "exportRuleSet",
    value: function exportRuleSet(data) {
      return (0, _ServiceUtil.post)("/api/v2/rules/exportRuleSet", this.getAccessToken(), data);
    }
  }]);
}();
var _default = exports["default"] = CommonRuleService;
//# sourceMappingURL=CommonRuleService.js.map