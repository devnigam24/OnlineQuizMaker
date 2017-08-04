import Ember from 'ember';

export default Ember.Controller.extend({
    sessionData: {},
    actions: {
        logOut() {
            const id = this.get('sessionData.id');
            Ember.$.post('api/deleteSessionData?id=' + id).then((data) => {
                if (JSON.stringify(data) === "{}") {
                    this.transitionToRoute('log-in');
                }
            });
        }
    }
});
