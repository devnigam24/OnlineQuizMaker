import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['card'],
    didInsertElement(){
      console.log(this.get('report'));
    }
});
