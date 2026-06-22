import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { post, postFile } from "@traveloka/soya-components/lib/utils/ServiceUtil";
var CommonRuleService = function () {
  function CommonRuleService() {
    _classCallCheck(this, CommonRuleService);
  }
  return _createClass(CommonRuleService, [{
    key: "getAccessToken",
    value: function getAccessToken() {
      return localStorage.getItem("access_token");
    }
  }, {
    key: "loadRuleSet",
    value: function loadRuleSet(data) {
      return post("/api/v2/rules/loadRuleSet", this.getAccessToken(), data);
    }
  }, {
    key: "getAllVersions",
    value: function getAllVersions(data) {
      return post("/api/v2/rules/getVersions", this.getAccessToken(), data);
    }
  }, {
    key: "saveRuleSet",
    value: function saveRuleSet(data) {
      return post("/api/v2/rules/saveRuleSet", this.getAccessToken(), data);
    }
  }, {
    key: "getRulesStructure",
    value: function getRulesStructure(data) {
      return post("/api/v2/rules/getRulesStructure", this.getAccessToken(), data);
    }
  }, {
    key: "importRuleSet",
    value: function importRuleSet(data, file) {
      return postFile("/api/v2/rules/importRuleSet", this.getAccessToken(), data, {
        "data.rules": file
      });
    }
  }, {
    key: "exportRuleSet",
    value: function exportRuleSet(data) {
      return post("/api/v2/rules/exportRuleSet", this.getAccessToken(), data);
    }
  }]);
}();
export default CommonRuleService;
//# sourceMappingURL=CommonRuleService.js.map