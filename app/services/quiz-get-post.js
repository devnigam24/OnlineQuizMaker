import Ember from 'ember';

export default Ember.Service.extend({
    postQuiz(quizObject) {
        if (typeof quizObject === "object") {
            window.localStorage.setItem('quizObject', JSON.stringify(quizObject));
        } else {
            window.localStorage.setItem('quizObject', quizObject);
        }
    }
});
