import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-up');
  this.route('log-in');
  this.route('dashboard');
  this.route('create-quiz');
  this.route('attempt-quiz');
  this.route('controller');
});

export default Router;
