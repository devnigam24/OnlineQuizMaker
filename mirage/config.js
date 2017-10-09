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

    this.get('/sessionData', function(db) {
        return db.db.sessions;
    });

    this.get('/usersAll', function(db) {
        return db.db.users;
    });

    this.post('/deleteSessionData', function(db, request) {
        const id = request.queryParams.id;
        return db.db.sessions.remove(id);
    });

    this.get('/userById', (db, request) => {
        const id = request.queryParams.id;
        return db.db.users.find(id);
    });

    this.get('/mockUserData', (db) => {
        return db.db.mockUsers;
    });

    this.get('/mockAllQuiz', (db) => {
        return db.db.mockQuizzes;
    });

    this.get('/mockQuiz', (db, request) => {
        return db.db.mockQuizzes.find(request.queryParams.id);
    });

    this.get('/mockMyQuiz', (db, request) => {
        return db.db.mockQuizzes.where({
            postedBy: request.queryParams.id
        });
    });


}
