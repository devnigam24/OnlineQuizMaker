import Ember from 'ember';
import Utils from '../helpers/utils';

export default Ember.Route.extend({
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
        return Ember.RSVP.hash({
            data: this.get('store').findAll('user').then((users) => {
              return this.createParticipantsObject(users.get('content'));
            })
        });
    },

    createParticipantsObject(users) {
      const userData = users.map((user) => {
        return user._data;
      });

      let particiapantsObj = {};
      userData.forEach((user) => {
        particiapantsObj[`${user.firstName} ${user.lastName}`] = 'fakeRequestImage/'+user.emailId;
      });

      return particiapantsObj;
    }
});
