'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.store = undefined;

var _combineReducers = require('../utils/combine-reducers');

var _index = require('../reducers/index');

var store = exports.store = (0, _combineReducers.combineReducers)({
    cards: _index.cards, // key = state field, value = reducer function
    courses: _index.courses, // key = state field, value = reducer function
    input: _index.input // key = state field, value = reducer function
});