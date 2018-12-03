const Database = require('../../src/database/Database').getTestInstance();
const UsersRouter = require('../../src/routers/UsersRouter');
const utils = require('../../src/database/DatabaseUtils');
const { User } = require('../../src/database/models');
const assert = require('assert');

let user = { 
  facebookId: 'test',
  accessToken: 'test',
  name: 'user',
  email: 'testing@email.com'
};

module.exports = () => {

  describe('UsersRouter', function() {
    describe('#insertUser(db, req, res, next)', function() {
      it('checks insert user router behavior', function(done) {
        const req = {query: user};
        UsersRouter.insertUser(Database, req, {
          status: status => {},
          send: res => {
            assert.strictEqual(res.success, true);
            User.find(res.id, (err, docs) => {
              assert.strictEqual(err, null);
              assert.notStrictEqual(docs, null);
              assert.strictEqual(docs.length, 1);
              UsersRouter.insertUser(Database, { query: null }, {
                status: status => {},
                send: res => {
                  assert.strictEqual(res.success, false);
                  User.deleteMany({}, () => done());
                }
              });
            });
          }
        });
      });
    });

    describe('#updateUser(db, req, res, next)', function() {
      it('checks update user router behavior', function(done) {
        utils.insertIfNotExisting(User, user.facebookId, user, res => {
          user.notifyTime = '86000000';

          const req = {query: {
            facebookId: user.facebookId,
            accessToken: user.accessToken,
            notifyTime: user.notifyTime,
          }};

          UsersRouter.updateUser(Database, req, {
            status: status => {},
            send: res => {
              assert.strictEqual(res.success, true);
              User.find(res.id, (err, docs) => {
                assert.strictEqual(err, null);
                assert.notStrictEqual(docs, null);
                assert.strictEqual(docs.length, 1);
                assert.strictEqual(docs[0].notifyTime, user.notifyTime);
                UsersRouter.updateUser(Database, { query: null }, {
                  status: status => {},
                  send: res => {
                    assert.strictEqual(res.success, false);
                    User.deleteMany({}, () => done());
                  }
                });
              });
            }
          });
        });
      });
    });

    describe('#removeUser(db, req, res, next)', function() {
      it('checks remove user router behavior', function(done) {
        utils.insertIfNotExisting(User, user.facebookId, user, res => {
          const req = {query: {
            facebookId: user.facebookId,
            accessToken: user.accessToken,
          }};

          UsersRouter.removeUser(Database, req, {
            status: status => {},
            send: res => {
              assert.strictEqual(res.success, true);
              User.find(res.id, (err, docs) => {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(docs, []);
                UsersRouter.removeUser(Database, { query: null }, {
                  status: status => {},
                  send: res => {
                    assert.strictEqual(res.success, false);
                    User.deleteMany({}, () => done());
                  }
                });
              });
            }
          });
        });
      });
    });
  });
}