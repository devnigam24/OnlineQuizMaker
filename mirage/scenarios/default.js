export default function(server) {
  server.loadFixtures('users');
  server.loadFixtures('authenticationobjects');
  server.loadFixtures('sessions');
  server.loadFixtures('mock-users');
  server.loadFixtures('mock-quizzes');
}
