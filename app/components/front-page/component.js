import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        $('.parallax').parallax();
    }
});
