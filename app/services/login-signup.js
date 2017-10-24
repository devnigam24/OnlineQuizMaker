import Ember from 'ember';

export default Ember.Service.extend({

    pushObjectInDB(userObject) {
        Ember.$.post('api/pushNewUser', JSON.stringify(userObject)).then((data) => {
            return data;
        });
    },

    pushEmailInDB(objectToInsert) {
        Ember.$.post('api/pushNewEmail', JSON.stringify(objectToInsert)).then((data) => {
            return data;
        });
    },

    storeUserRegistration(userObject) {
        const objectToInsert = {
            'id': userObject.username,
            'password': userObject.password
        }
        const returnObj = {
            'userPushed': this.pushObjectInDB(userObject),
            'emailPushed': this.pushEmailInDB(objectToInsert)
        }
        return returnObj;
    },

    callAuthenticateUser(userObject) {
        return Ember.$.getJSON('http://localhost:3000/users/' + userObject.username).done((responseJSON, status) => {
            if (status === "success") {
                if (responseJSON.password === userObject.password) {
                    return responseJSON;
                } else {
                    return "LOGIN_IN_VALID";
                }
            }
        }).fail((responseJSON, status) => {
            if (status === "error") {
                return responseJSON.statusText;
            }
        });
    }

});
