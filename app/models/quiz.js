import DS from 'ember-data';

export default DS.Model.extend({
    topic: DS.attr('string'),
    noOfQuestions: DS.attr('number'),
    timeLimit: DS.attr('number'),
    type: DS.attr('string'),
    questions: DS.attr(),
    fromDate: DS.attr('date'),
    toDate: DS.attr('date'),
    postedBy: DS.attr('string'),
    postedFor: DS.attr()
});
