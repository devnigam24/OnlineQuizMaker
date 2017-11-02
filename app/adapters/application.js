import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    namespace: '',
    host: 'http://localhost:3000',
    headers: function(data) {
        var headers = {};
        headers['Content-Type'] = 'application/vnd.api+json';
        return headers;
    },
    save: function() {
        return this._super();
    }
});
