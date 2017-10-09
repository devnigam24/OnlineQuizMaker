import Ember from 'ember';

export default Ember.Service.extend({
    postQuiz(quizObject) {
        let quizArray = window.localStorage.getItem('allQuizes');
        if (quizArray === null) {
            quizArray = [];
        } else {
            quizArray = JSON.parse(quizArray);
        }
        if (typeof quizObject === "object") {
            quizArray.push(quizObject);
        } else {
            quizArray.push(JSON.stringify(quizObject));
        }
        window.localStorage.setItem('allQuizes', JSON.stringify(quizArray));
    },

    getAllQuizzes() {
        // return JSON.parse(window.localStorage.getItem('allQuizes'));
        return Ember.$.getJSON('api/mockAllQuiz');
    },

    getQuizz(id) {
        // return JSON.parse(window.localStorage.getItem('allQuizes'));
        return Ember.$.getJSON('api/mockQuiz?id=' + id);
    },

    getMyQuizzes(userName) {
        return Ember.$.getJSON('api/mockMyQuiz?id=' + userName);
    }
});
