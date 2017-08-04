import Ember from 'ember';

export default Ember.Service.extend({
    createSession(userID) {
        Ember.$.post('api/createSession', JSON.stringify(userID)).then((data) => {
            return data;
        });
    }
});
