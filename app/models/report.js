import DS from 'ember-data';

export default DS.Model.extend({
  questionId: DS.attr('string'),
  quizId: DS.attr('string'),
  ReportedBy: DS.attr('string'),
  comments: DS.attr('string')
});
