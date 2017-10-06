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
  this.route('show-all-quiz');
  this.route('controller');
  this.route('my-created-quizzes');
});

export default Router;
