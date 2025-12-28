const { SceHttpServer } = require('../util/SceHttpServer');

function main() {
  const API_ENDPOINTS = [
    __dirname + '/routes/'
  ];
  const dessertServer = new SceHttpServer(API_ENDPOINTS, 8084, '/');
  dessertServer.init().then(() => {
    dessertServer.openConnection();
  });
}

main();