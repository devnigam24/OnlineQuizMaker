import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    isFormInputsValid() {
      return Ember.isEmpty(this.get('serverSideFormError'));
    }
  }
});
