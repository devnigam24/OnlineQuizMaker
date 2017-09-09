export default function(server) {
  server.loadFixtures('users');
  server.loadFixtures('authenticationobjects');
  server.loadFixtures('sessions');
  server.loadFixtures('mocks');
}
