const testDatabseUtils = require('./testDatabseUtils');
const testModels = require('./testModels');

module.exports = () => {
  describe('Database', function() {
    testDatabseUtils();
    testModels();
  });
}
