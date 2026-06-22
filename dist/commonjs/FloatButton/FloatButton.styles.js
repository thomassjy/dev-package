"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mainFloatIcon = exports.listIcon = exports.listButtonChildren = exports.labelText = exports.labelContainer = exports.floatButtonChildren = exports["float"] = exports.childIcon = exports.buttonChildren = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _css = require("@emotion/css");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
var listIcon = exports.listIcon = (0, _css.css)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  position: fixed;\n  right: 40px;\n  padding-bottom: 20px;\n  bottom: 80px;\n  z-index: 1;\n\n  &:hover {\n    visibility: visible;\n    opacity: 1;\n  }\n"])));
var buttonChildren = exports.buttonChildren = (0, _css.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: #fff;\n  border-radius: 50%;\n  text-align: center;\n  box-shadow: 0 2px 4px 0 rgba(163, 200, 214, 0.2);\n  border: 1px solid #e0e6ed;\n  width: 50px;\n  height: 50px;\n  display: block;\n  padding-top: 13px;\n  cursor: pointer;\n  transition: background-color 0.4s ease;\n  label: buttonChildrenLabel;\n\n  & > a {\n    color: #434343;\n  }\n"])));
var childIcon = exports.childIcon = (0, _css.css)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 1.2em;\n"])));
var _float = exports["float"] = (0, _css.css)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n  position: fixed;\n  width: 50px;\n  height: 50px;\n  bottom: 40px;\n  right: 40px;\n  background-color: #f36;\n  color: #fff;\n  border-radius: 50%;\n  text-align: center;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  z-index: 1;\n  cursor: pointer;\n"])));
var labelContainer = exports.labelContainer = (0, _css.css)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2["default"])(["\n  text-align: right;\n  position: fixed;\n  margin-top: 16px;\n  right: 100px;\n  opacity: 0;\n  label: labelContainerLabel;\n"])));
var floatButtonChildren = exports.floatButtonChildren = (0, _css.css)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2["default"])(["\n  vertical-align: middle;\n  margin-top: 10px;\n\n  &:hover [class$=\"buttonChildrenLabel\"] {\n    background-color: #f9f9f9;\n  }\n\n  &:hover [class$=\"labelContainerLabel\"] {\n    opacity: 1;\n  }\n"])));
var labelText = exports.labelText = (0, _css.css)(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2["default"])(["\n  color: #fff;\n  background: rgb(48, 50, 61);\n  vertical-align: middle;\n  padding: 3px 10px;\n  border-radius: 3px;\n  font-size: 12px;\n"])));
var listButtonChildren = exports.listButtonChildren = (0, _css.css)(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2["default"])(["\n  list-style: none;\n"])));
var mainFloatIcon = exports.mainFloatIcon = (0, _css.css)(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2["default"])(["\n  width: 20px;\n  height: 15px;\n  margin-left: 13px;\n  margin-top: 14px;\n  cursor: pointer;\n"])));
//# sourceMappingURL=FloatButton.styles.js.map