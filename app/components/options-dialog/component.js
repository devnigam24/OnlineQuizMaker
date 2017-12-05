import Ember from 'ember';
import Utils from '../../helpers/utils';

export default Ember.Component.extend({
    question: null,
    tagName: 'input',
    type: 'radio',
    classNames: ['with-gap'],
    name: null,
    attributeBindings: ['type', 'name'],
    quizAnswers: Ember.A([]),
    didInsertElement() {
        this.$().after(`<label for="${this.get('elementId')}">${this.get('option')}</label>`);
    },

    change: function() {
        const answerGiven = {
            'text': this.get('option'),
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
