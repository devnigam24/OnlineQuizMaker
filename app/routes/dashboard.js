import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        Ember.$.getJSON('api/sessionData').then((data) => {
            if (data.length > 0) {
                return Ember.$.getJSON('api/userById?id=' + data[0].username).then((userData) => {
                    this.controller.set('sessionData', userData);
                });
            } else {
              const _this = this;
              Ember.run.later(() => {
                _this.transitionToRoute('log-in');
              }, 100);
            }
        });
    }
});
