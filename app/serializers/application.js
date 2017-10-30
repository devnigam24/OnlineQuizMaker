import DS from 'ember-data';

export default DS.JSONSerializer.extend({
    serialize: function(record, options) {
        var json = this._super.apply(this, arguments); // Get default serialization

        json.id = record.id; // tack on the id

        return json;
    }
});
