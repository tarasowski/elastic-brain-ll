'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.input = exports.courses = exports.cards = exports.visibilityFilter = exports.todos = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require('../actions/index');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var todo = function todo() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (action) {
        switch (action.type) {
            case _index.ADD_TODO:
                return {
                    id: action.id,
                    text: action.text,
                    completed: false
                };
            case _index.TOGGLE_TODO:
                return state.id === action.id ? _extends({}, state, { completed: !state.completed }) : state;
            default:
                return state;
        }
    };
};

var todos = exports.todos = function todos() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return function (action) {
        switch (action.type) {
            case _index.ADD_TODO:
                return [].concat(_toConsumableArray(state), [todo(state)(action)]);
            case _index.TOGGLE_TODO:
                return state.map(function (td) {
                    return todo(td)(action);
                });
            default:
                return state;
        }
    };
};

var visibilityFilter = exports.visibilityFilter = function visibilityFilter() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SHOW_ALL';
    return function (action) {
        switch (action.type) {
            case _index.SET_VISIBILITY_FILTER:
                return action.filter;
            default:
                return state;
        }
    };
};

var card = function card() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (action) {
        switch (action.type) {
            case _index.ADD_CARD:
                return {
                    id: action.id,
                    question: action.question,
                    answer: action.answer,
                    course: action.course
                };
            default:
                return state;
        }
    };
};

var cards = exports.cards = function cards() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return function (action) {
        switch (action.type) {
            case _index.ADD_CARD:
                return [].concat(_toConsumableArray(state), [card(state)(action)]);
            case _index.REMOVE_CARD:
                return state.filter(function (c) {
                    return c.id !== action.id;
                });
            default:
                return state;
        }
    };
};

var course = function course() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (action) {
        switch (action.type) {
            case _index.ADD_COURSE:
                return {
                    id: action.id,
                    course: action.course
                };
        }
    };
};

var courses = exports.courses = function courses() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return function (action) {
        switch (action.type) {
            case _index.ADD_COURSE:
                return [].concat(_toConsumableArray(state), [course(state)(action)]);
            case _index.REMOVE_COURSE:
                return state.filter(function (c) {
                    return c.id !== action.id;
                });
            default:
                return state;
        }
    };
};

var input = exports.input = function input() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (action) {
        switch (action.type) {
            case _index.INPUT_COURSE:
                return _extends({}, state, { courseName: action.courseName });
            default:
                return state;
        }
    };
};