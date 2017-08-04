import Ember from 'ember';

export default Ember.Component.extend({
    showLoginButton: true,
    showJoinButton: true,
    init() {
        this._super(...arguments);
        
    },
    didRender() {
        Ember.$.getJSON('api/sessionData').then((data) => {
            if (data.length > 0) {
              this.set('showJoinButton', false);
              this.set('showLoginButton', false);
            } else {
              this.set('showJoinButton', true);
              this.set('showLoginButton', true);
            }
        });
    }
});
