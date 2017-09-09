import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'ul',
    classNames: ['side-nav', 'fixed'],
    classNameBindings: ['isSIgnedIn:show:hide'],
    isSIgnedIn: false,
    elementId: 'nav-mobile',
    didInsertElement() {
        $('.button-collapse').sideNav({
            menuWidth: 300, // Default is 300
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true, // Choose whether you can drag to open on touch screens,
            onOpen: function() {}, // A function to be called when sideNav is opened
            onClose: function() {}, // A function to be called when sideNav is closed
        });
    }
});
