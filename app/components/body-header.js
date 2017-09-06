import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'header',
    classNames: ['navbar-fixed'],
    classNameBindings: ['isSIgnedIn:navPC'],
    actions: {
        signUpButtonPressed() {
            this.set('showJoinButton', false);
        },
        logOut() {
            const id = this.get('sessionData.id');
            Ember.$.post('api/deleteSessionData?id=' + id).then((data) => {
                if (JSON.stringify(data) === "{}") {
                  // TODO logout
                }
            });
        }
    }
});
