import Ember from 'ember';

export default Ember.Component.extend({
    question: null,
    tagName: 'input',
    type: 'radio',
    classNames: ['with-gap'],
    id: null,
    name: null,
    answerGiven: null,
    attributeBindings: ['type', 'name', 'id'],

    didInsertElement() {
        this.set('name', this.get('name'));
        this.set('id', this.get('id'));
        const label = `<label for="${this.option}">${this.option}</label>`;
        this.$().after(label);
    },

    change: function() {
        const answerGiven = {
            'text': this.get('id'),
            'questionNumber': this.get('name'),
            'quizId': this.get('quizId')
        };
        this.sendAction('checkAnswer', answerGiven);
    }

});
