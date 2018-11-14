const testEventsQueryValidator = require('./testEventsQueryValidator');
const testItemsQueryValidator = require('./testItemsQueryValidator');
const testUsersQueryValidator = require('./testUsersQueryValidator');
const testValidatorUtils = require('./testValidatorUtils');

module.exports = () => {
  describe('Validators', function() {
    testEventsQueryValidator();
    testItemsQueryValidator();
    testUsersQueryValidator();
    testValidatorUtils();
  });
}
