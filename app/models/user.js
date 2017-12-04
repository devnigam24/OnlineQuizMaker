import DS from 'ember-data';

export default DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    emailId: DS.attr('string'),
    phone: DS.attr('string'),
    password: DS.attr('string'),
    cwid: DS.attr('string'),
    streetAddress: DS.attr('string'),
    city: DS.attr('string'),
    pincode: DS.attr('string'),
    country: DS.attr('string'),
    desc: DS.attr('string'),
    isStudent: DS.attr('boolean')
});
