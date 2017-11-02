import Ember from 'ember';
import Utils from '../helpers/utils';

export default Ember.Route.extend({
    quizService: Ember.inject.service('quiz-get-post'),

    sessionService: Ember.inject.service('session'),

    myQuizzes: Ember.A([]),

    setupController(controller, model) {
        this._super(controller, model);
        const userData = this.get('sessionService').getUserDataFromSession();
        const userSignedIn = this.get('sessionService').isUserSignedIn();
        if (Utils.isValidObject(userData)) {
            controller.set('userInsession', userData);
            controller.set('isSIgnedIn', userSignedIn);
            controller.set('isStudent', userData.isStudent);
        } else {
            this.get('sessionService').clearSession();
        }
    },

    model() {
        const userData = this.get('sessionService').getUserDataFromSession();
        if (userData.isStudent) {
            return Ember.RSVP.hash({
                data: this.get('store').findAll('quiz').then((quizzes) => {
                  return quizzes.filter((quiz) => {
                    return quiz.data.postedFor.includes(userData.emailId)
                  });
                })
            });
        } else {
            return Ember.RSVP.hash({
                data: this.get('store').findAll('quiz')
            });
        }
    },

    action: {

    }
});
