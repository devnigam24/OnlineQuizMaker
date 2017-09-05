import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'footer',
    classNames: ['page-footer'],
    classNameBindings: ['isSIgnedIn:navPC'],
    isSIgnedIn: false
});
