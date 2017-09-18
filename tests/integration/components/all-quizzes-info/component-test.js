import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('all-quizzes-info', 'Integration | Component | all quizzes info', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{all-quizzes-info}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#all-quizzes-info}}
      template block text
    {{/all-quizzes-info}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
