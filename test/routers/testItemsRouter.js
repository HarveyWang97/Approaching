const Database = require('../../src/database/Database').getTestInstance();
const ItemsRouter = require('../../src/routers/ItemsRouter');
const utils = require('../../src/database/DatabaseUtils');
const { User, Item } = require('../../src/database/models');
const assert = require('assert');

const user = { 
  facebookId: 'test',
  accessToken: 'test',
  name: 'user',
  email: 'testing@email.com'
};

let item = { 
  facebookId: user.facebookId,
  accessToken: user.accessToken,
  name: 'item',
  picture: '',
  expireDate: '1545740663411',
  location: JSON.stringify(['home']),
  description: '',
  eventList: '',
};

module.exports = () => {
  describe('#insertIfNotExisting(model, primaryKey, object, callback)', function() {
    it ('checks proper user account is set up', function(done) {
      utils.insertIfNotExisting(User, user.facebookId, user, res => {
        assert.strictEqual(res.success, true);
        done();
      });
    });
  });

  describe('ItemsRouter', function() {
    describe('#insertItem(db, req, res, next)', function() {
      it('checks insert item router behavior', function(done) {
        const req = {query: item};
        ItemsRouter.insertItem(Database, req, {
          status: status => {},
          send: res => {
            assert.strictEqual(res.success, true);
            Item.find(res.id, (err, docs) => {
              assert.strictEqual(err, null);
              assert.notStrictEqual(docs, null);
              assert.strictEqual(docs.length, 1);
              ItemsRouter.insertItem(Database, { query: null }, {
                status: status => {},
                send: res => {
                  assert.strictEqual(res.success, false);
                  Item.deleteMany({}, () => done());
                }
              });
            });
          }
        });
      });
    });

    describe('#updateItem(db, req, res, next)', function() {
      it('checks update item router behavior', function(done) {
        item.owner = item.facebookId;
        utils.insert(Item, item, res => {
          item.description = 'This is an item';
          item._id = res.id;

          const req = {query: {
            facebookId: item.facebookId,
            accessToken: item.accessToken,
            _id: item._id,
            description: item.description,
          }};

          ItemsRouter.updateItem(Database, req, {
            status: status => {},
            send: res => {
              assert.strictEqual(res.success, true);
              Item.find(item._id, (err, docs) => {
                assert.strictEqual(err, null);
                assert.notStrictEqual(docs, null);
                assert.strictEqual(docs.length, 1);
                assert.strictEqual(docs[0].description, item.description);
                ItemsRouter.updateItem(Database, { query: null }, {
                  status: status => {},
                  send: res => {
                    assert.strictEqual(res.success, false);
                    Item.deleteMany({}, () => done());
                  }
                });
              });
            }
          });
        });
      });
    });

    describe('#removeItem(db, req, res, next)', function() {
      it('checks remove item router behavior', function(done) {
        utils.insert(Item, item, res => {
          item._id = res.id;

          const req = {query: {
            facebookId: item.facebookId,
            accessToken: item.accessToken,
            _id: item._id,
          }};

          ItemsRouter.removeItem(Database, req, {
            status: status => {},
            send: res => {
              assert.strictEqual(res.success, true);
              Item.find(item._id, (err, docs) => {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(docs, []);
                ItemsRouter.removeItem(Database, { query: null }, {
                  status: status => {},
                  send: res => {
                    assert.strictEqual(res.success, false);
                    Item.deleteMany({}, () => done());
                  }
                });
              });
            }
          });
        });
      });
    });

    describe('#remove(model, primaryKey, object, callback)', function() {
      it ('removes the user account', function(done) {
        utils.remove(User, user.facebookId, user, res => {
          assert.strictEqual(res.success, true);
          done();
        });
      });
    });
  });
}