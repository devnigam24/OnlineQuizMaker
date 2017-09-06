import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card','profile-card'],
  didInsertElement() {
    console.log(this.sessionData);
  }
});
