import Ember from 'ember';
import Utils from '../helpers/utils';

export default Ember.Route.extend({
    quizService: Ember.inject.service('quiz-get-post'),

    sessionService: Ember.inject.service('session'),

    setupController(controller, model) {
        this._super(controller, model);
        const userData = this.get('sessionService').getUserDataFromSession();
        const userSignedIn = this.get('sessionService').isUserSignedIn();
        if (Utils.isValidObject(userData)) {
            controller.set('userInsession', userData);
            controller.set('isSIgnedIn', userSignedIn);
        } else {
            this.get('sessionService').clearSession();
        }
    },

    model() {
        return this.get('quizService').getAllQuizzes();
    }
});
