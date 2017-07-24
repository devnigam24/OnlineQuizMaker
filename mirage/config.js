import Ember from 'ember';

export default function() {
    this.namespace = '/api';

    this.post('/pushNewUser', function(db, request) {
        const userInserted = db.db.users.insert(JSON.parse(request.requestBody));
        if (!Ember.isEmpty(userInserted)) {
            return userInserted;
        } else {
            return null;
        }
    });

    this.post('/pushNewEmail', function(db, request) {
        const usernameInserted = db.db.authenticationobjects.insert(JSON.parse(request.requestBody));
        if (!Ember.isEmpty(usernameInserted)) {
            return usernameInserted;
        } else {
            return null;
        }
    });

    this.get('/getAuthenticationObjects', function(db, request) {
        return db.db.authenticationobjects.find(request.queryParams.username);
    });

    this.get('/getUsers', function(db) {
        console.log(db.db.users);
    });
}
