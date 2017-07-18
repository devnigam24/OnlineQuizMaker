import Ember from 'ember';

export default Ember.Component.extend({
  mouseLeave: function() {
    console.log('mouseLeft');
  },
  click: function() {
    console.log('clicked123');
  },
  focusIn: function() {
    console.log('focusIn');
  },
  focusOut: function() {
    console.log('focusOut');
  }
});
