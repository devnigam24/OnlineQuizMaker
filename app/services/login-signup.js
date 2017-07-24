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
        var authenticateUserPromise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.getJSON('api/getAuthenticationObjects?username=' + userObject.username).then(function(obj) {
                if (obj.error === 'not found') {
                    reject(null);
                } else {
                    resolve(obj.password === userObject.password);
                }
            });
        });

        authenticateUserPromise.then((data) => {
            console.log(data);
            return data;
        });
    },

    mockcalltobackendSignUP(userObject) {
        return Ember.RSVP.hash({
            userInserted: this.pushObjectInDB(userObject),
            emailInserted: this.pushEmailInDB(userObject.username, userObject.password)
        });
    },

    callAuthenticateUser(loginObj) {
        const _this = this;
        var authenticateUserPromise = new Ember.RSVP.Promise(function(resolve, reject) {
            _this.authenticateUser(loginObj).then(function(data) {
                resolve(data);
                reject(data);
            });
        });

        authenticateUserPromise.then((data) => {
            console.log(data);
            return data;
        });
    }
});
