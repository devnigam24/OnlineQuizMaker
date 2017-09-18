import Ember from 'ember';

export default Ember.Route.extend({
    quizService: Ember.inject.service('quiz-get-post'),
    model() {
        return this.get('quizService').getAllQuizzes();
    }
});
