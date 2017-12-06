import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['card'],
    noOfStudentsRepoted: Ember.computed('report', function() {
      return this.get('report.reports').length;
    }),
    didInsertElement(){
      $('.collapsible').collapsible();
    }
});
