import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        Ember.$.getJSON('api/sessionData').then((data) => {
            if (data.length > 0) {
                this.controller.set('controller.showJoinButton', false);
                this.controller.set('controller.showLoginButton', false);
                console.log(data);
            } else {
                this.controller.set('controller.showJoinButton', true);
                this.controller.set('controller.showLoginButton', true);
            }
        });
    }
});
