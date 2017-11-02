import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    namespace: '',
    host: 'http://localhost:3000'
});
