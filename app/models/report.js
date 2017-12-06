import DS from 'ember-data';

export default DS.Model.extend({
  reportedFor: DS.attr('string'),
  topic: DS.attr('string'),
  quizId: DS.attr('string'),
  question: DS.attr('string'),
  reports: DS.attr()
});
