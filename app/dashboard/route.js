import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        Ember.$.getJSON('api/sessionData').then((data) => {
            if (data.length) {
                Ember.$.getJSON('api/userById?id=' + data[0].username).then((userData) => {
                    this.controllerFor('application').set('isSIgnedIn', true);
                    this.controllerFor('application').set('sessionData', userData);
                    this.controller.set('sessionData', userData);
                });
            } else {
                this.controller.send('goBackToHomePage')
            }
        });
    },

    afterModel: function() {
        this.controllerFor('application').set('showLoginButton', false);
        this.controllerFor('application').set('showJoinButton', false);
    }
});
