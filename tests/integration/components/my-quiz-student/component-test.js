import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('my-quiz-student', 'Integration | Component | my quiz student', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{my-quiz-student}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#my-quiz-student}}
      template block text
    {{/my-quiz-student}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
