import Ember from 'ember';

export default Ember.Service.extend({

    pushObjectInDB(userObject) {
        Ember.$.post('api/pushNewUser', JSON.stringify(userObject)).then((data) => {
            return data;
        });
    },

    pushEmailInDB(emilID, password) {
        const objectToInsert = {
            userName: emilID,
            password: password
        }
        Ember.$.post('api/pushNewEmail', JSON.stringify(objectToInsert)).then((data) => {
            return data;
        });
    },

    checkValidEmailId(emailID) {
        Ember.$.getJSON('api/getAuthenticationObjects').then(function(data) {
            return data.includes(emailID) ? true : false;
        });
    },

    mockcalltobackend(userObject) {
        return Ember.RSVP.hash({
            userInserted: this.pushObjectInDB(userObject),
            emailInserted: this.pushEmailInDB(userObject.username, userObject.password),
            isValidEmail: this.checkValidEmailId(userObject.username)
        });
    }
});
