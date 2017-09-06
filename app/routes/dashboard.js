import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        Ember.$.getJSON('api/sessionData').then((data) => {
            if (data.length) {
                return Ember.$.getJSON('api/userById?id=' + data[0].username).then((userData) => {
                    this.controller.set('sessionData', userData);
                });
            } else {
                this.controller.send('goBackToHomePage')
            }
        });
    }
});
