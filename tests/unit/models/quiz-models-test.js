import { moduleForModel, test } from 'ember-qunit';

moduleForModel('quiz-models', 'Unit | Model | quiz models', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
