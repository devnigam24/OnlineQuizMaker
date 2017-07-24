import Ember from 'ember';

export default Ember.Component.extend({
    mouseLeave: function() {
        console.log('mouseLeft');
    },

    obj1 : undefined,
    obj2 : true,

    micMuteButtonFeatureFlag: Ember.computed('obj2', 'obj1', function(){
      return this.obj2 && this.obj1;
    }).readOnly(),

    init() {
        this._super(...arguments);
        console.log(this.micMuteButtonFeatureFlag);
        console.log(this.get('micMuteButtonFeatureFlag'));
    }

});
