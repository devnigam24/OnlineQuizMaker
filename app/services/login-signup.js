import Ember from 'ember';

export default Ember.Service.extend({

    pushObjectInDB(userObject) {
        Ember.$.post('api/pushNewUser', JSON.stringify(userObject)).then((data) => {
            return data;
        });
    },

    pushEmailInDB(emilID, password) {
        const objectToInsert = {
            'id': emilID,
            'password': password
        }
        Ember.$.post('api/pushNewEmail', JSON.stringify(objectToInsert)).then((data) => {
            return data;
        });
    },

    authenticateUser(userObject) {

    },

    mockcalltobackendSignUP(userObject) {
        return Ember.RSVP.hash({
            userInserted: this.pushObjectInDB(userObject),
            emailInserted: this.pushEmailInDB(userObject.username, userObject.password)
        });
    },

    callAuthenticateUser(userObject) {
        return Ember.$.getJSON('api/getAuthenticationObjects?username=' + userObject.username).then(function(obj) {
            if (obj.error === 'not found') {
                return "USERNAME_NOT_EXISTS";
            } else if (obj.password === userObject.password) {
                return "LOGIN_VALID";;
            } else {
                return "LOGIN_INVALID";
            }
        });
    }
});
