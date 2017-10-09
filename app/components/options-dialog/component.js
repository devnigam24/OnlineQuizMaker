import Ember from 'ember';
import Utils from '../../helpers/utils';

export default Ember.Component.extend({
    question: null,
    tagName: 'input',
    type: 'radio',
    classNames: ['with-gap'],
    id: null,
    name: null,
    attributeBindings: ['type', 'name', 'id'],
    quizAnswers: Ember.A([]),
    didInsertElement() {
        this.set('name', this.get('name'));
        this.set('id', this.get('id'));
        const label = `<label for="${this.option}">${this.option}</label>`;
        this.$().after(label);
    },

    change: function() {
        const answerGiven = {
            'text': this.get('id'),
            'questionNumber': this.get('name')
        };
        let quizAnswers = this.get('quizAnswers');
        let quizAnswersGiven = quizAnswers.findBy('questionNumber', answerGiven.questionNumber);

        if (Utils.isValidObject(quizAnswersGiven)) {
            const replacingIndex = quizAnswers.indexOf(quizAnswersGiven);
            quizAnswers[replacingIndex] = answerGiven;
        } else {
            quizAnswers.push(answerGiven);
        }

        const evaluation = {
          'quizId' : this.get('quizId'),
          'answersToCheck':quizAnswers
        };

        this.sendAction('checkAnswer', evaluation);
    }
});
