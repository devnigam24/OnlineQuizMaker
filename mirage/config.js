import Ember from 'ember';

export default function() {
    this.namespace = '/api';

    this.get('/allUsersEmail', function(db) {
        return db.db.allEmailIds;
    });

    this.post('/pushNewUser', function(db, request) {
        const userInserted = db.db.users.insert(JSON.parse(request.requestBody));
        if (!Ember.isEmpty(userInserted)) {
            return userInserted;
        } else {
            return null;
        }

    });
}
