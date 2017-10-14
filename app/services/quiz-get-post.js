import Ember from 'ember';

export default Ember.Service.extend({
    postQuiz(quizObject) {
        this.post(quizObject, 'allQuizes');
    },

    post(object, name) {
        let array = window.localStorage.getItem(name);
        if (array === null) {
            array = [];
        } else {
            array = JSON.parse(array);
        }
        if (typeof object === "object") {
            array.push(object);
        } else {
            array.push(JSON.stringify(object));
        }
        window.localStorage.setItem(name, JSON.stringify(array));
    },

    getAllQuizzes() {
        // return JSON.parse(window.localStorage.getItem('allQuizes'));
        return Ember.$.getJSON('api/mockAllQuiz');
    },

    getQuizz(id) {
        return Ember.$.getJSON('api/mockQuiz?id=' + id);
    },

    getMyQuizzes(userName) {
        return Ember.$.getJSON('api/mockMyQuiz?id=' + userName);
    },

    postResults(result) {
        this.post(result, 'allResults');
    },

    getAllResults() {
        // return JSON.parse(window.localStorage.getItem('allResults'));
        return Ember.$.getJSON('api/mockResults');
    }
});
