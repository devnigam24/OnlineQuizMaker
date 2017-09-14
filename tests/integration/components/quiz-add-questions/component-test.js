import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('quiz-add-questions', 'Integration | Component | quiz add questions', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{quiz-add-questions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#quiz-add-questions}}
      template block text
    {{/quiz-add-questions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
