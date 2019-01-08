'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.profile = exports.navigation = exports.courses = exports.cards = exports.visibilityFilter = exports.todos = undefined;

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
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (action) {
        switch (action.type) {
            case _index.SET_VISIBILITY_FILTER:
                return _extends({}, state, { showCourse: action.filter, showAnswer: false, currentQuestionId: 0 });
            case _index.SET_SHOW_QUESTION:
                return _extends({}, state, { showAnswer: true });
            case _index.LEARN_NEXT_QUESTION:
                return _extends({}, state, { showAnswer: false, currentQuestionId: state.currentQuestionId + 1 });
            case _index.LEARN_START_OVER:
                return {};
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
                    course: { id: action.course.id, course: action.course }
                };
            default:
                return state;
        }
    };
};

var cards = exports.cards = function cards() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{
        id: 0,
        question: "my #1 question",
        answer: "my #1 answer",
        course: {
            course: "course-0"
        }
    }, {
        id: 1,
        question: "my #2 question",
        answer: "my #2 answer",
        course: {
            course: "course-0"
        }
    }, {
        id: 2,
        question: "my #3 question",
        answer: "my #3 answer",
        course: {
            course: "course-0"

        }
    }];
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
                    courseName: action.courseName
                };
            default:
                return state;
        }
    };
};

var courses = exports.courses = function courses() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{
        id: "course-0",
        courseName: "first"
    }];
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

var navigation = exports.navigation = function navigation() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { url: '/' };
    return function (action) {
        switch (action.type) {
            case _index.CHANGE_URL:
                return _extends({}, state, { url: action.url });
            default:
                return state;
        }
    };
};

var profile = exports.profile = function profile() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { isOnline: false };
    return function (action) {
        switch (action.type) {
            case _index.REGISTRATION_SUCCESS:
                return _extends({}, state, {
                    username: action.payload.user.username,
                    userId: action.payload.userSub,
                    confirmed: action.payload.userConfirmed,
                    isOnline: false
                });
            case _index.CONFIRMATION_SUCCESS:
                return _extends({}, state, {
                    confirmed: true,
                    isOnline: false
                });
            case _index.LOGIN_SUCCESS:
                return _extends({}, state, {
                    username: action.payload.username,
                    userId: action.payload.signInUserSession.idToken.payload.sub,
                    accessToken: action.payload.signInUserSession.accessToken.jwtToken,
                    confirmed: true,
                    isOnline: true
                });
            default:
                return state;
        }
    };
};