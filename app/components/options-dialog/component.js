import Ember from 'ember';

export default Ember.Component.extend({
    question: null,
    tagName: 'input',
    type: 'radio',
    classNames: ['with-gap'],
    id: null,
    name: null,
    attributeBindings: ['type', 'name', 'id'],

    didInsertElement() {
        this.set('name', this.get('name'));
        this.set('id', this.get('id'));
        const label = `<label for=${this.option}>${this.option}</label>`;
        this.$().after(label);
    },

    change: function() {
        console.log(this.get('id'));
        this.testActions();
        this.send('testActions');
    },

    testActions: function(){
      console.log('1');
    }
});
