import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'header',
    classNames: ['navbar-fixed'],
    classNameBindings: ['isSIgnedIn:navPC'],
    actions: {
      signUpButtonPressed() {
        this.set('showJoinButton', false);
      }
    }
});
