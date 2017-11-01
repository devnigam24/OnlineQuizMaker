import DS from 'ember-data';

export default DS.Model.extend({
    quizAttemped: DS.attr('string'),
    quizId: DS.attr('string'),
    timeAttempedAt: DS.attr('string'),
    result: DS.attr(),
    attempedBy: DS.attr('string'),
    postedBy: DS.attr('string')
});
