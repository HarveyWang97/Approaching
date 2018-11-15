// static authorize(object, callback = () => {}, onSuccess = () => {}) {
//   if (!object || !(object.facebookId) || !(object.accessToken)) {
//     callback(this.failure('Authorization failed.'));
//   }
//   const conditions = { facebookId: object.facebookId };
//   models.User.findOne(conditions, (err, doc) => {
//     if (err || !doc || doc.accessToken !== object.accessToken) {
//       callback(this.failure('Authorization failed.'));
//     } else {        
//       onSuccess();
//     }
//   });
// }

// static insert(schema, object, callback = () => {}) {    
//   const doc = new schema(object);    
//   this._save(doc, callback);
// }

// static insertIfNotExisting(schema, primaryKey, object, callback = () => {}) {
//   const conditions = {};
//   conditions[primaryKey] = object[primaryKey];
//   schema.findOne(conditions, (err, doc) => {
//     if (err) {
//       callback(this.failure(err));
//     }
//     if (doc) {
//       for (let field in object) {
//         if (object.hasOwnProperty(field)) {
//           doc[field] = object[field];
//         }
//       }
//       this._save(doc, callback);
//     } else {
//       this.insert(schema, object, callback);
//     }
//   });
// }

// static update(schema, primaryKey, object, callback = () => {}) {
//   const conditions = {};
//   conditions[primaryKey] = object[primaryKey];
//   schema.findOne(conditions, (err, doc) => {      
//     if (err || !doc) {
//       callback(this.failure(err ? err : "Entry not found."));
//     } else {
//       for (let field in object) {
//         if (object.hasOwnProperty(field)) {
//           doc[field] = object[field];
//         }
//       }
//       this._save(doc, callback);
//     }
//   });
// }

// static remove(schema, primaryKey, object, callback = () => {}) {
//   const conditions = {};
//   conditions[primaryKey] = object[primaryKey];
//   schema.findOneAndDelete(conditions, (err, doc) => {
//     if (err || !doc) {
//       callback(this.failure(err ? err : "Entry not found."));
//     } else {
//       callback(this.success(doc._id));
//     }
//   });
// }

// static getItems(owner, callback = () => {}) {
//   models.Item.find({ owner: owner }, (err, items) => {
//     if (err) {
//       callback({ success: false });
//     } else {
//       callback({
//         success: true,
//         items: items
//       });
//     }
//   });
// }

// static getEvents(owner, callback = () => {}) {
//   models.Event.find({ owner: owner }, (err, events) => {
//     if (err) {
//       callback({ success: false });
//     } else {
//       callback({
//         success: true,
//         events: this.reformatEvents(events)
//       });
//     }
//   });
// }

// static reformatEvents(events) {
//   events.sort((a, b) => (a.time > b.time));
//   const result = {};

//   console.log((new Date(2018, 11, 25, 20)).getTime());
//   console.log((new Date(2019, 0, 1, 0)).getTime());
//   for (let event of events) {
//     const time = new Date(Number(event.time));
//     const year = time.getFullYear();
//     const month = time.getMonth() + 1;
//     const date = time.getDate();
//     if (!(year in result))              { result[year] = {}; }
//     if (!(month in result[year]))       { result[year][month] = {}; }
//     if (!(date in result[year][month])) { result[year][month][date] = []; }
//     const hour = time.getHours();
//     const minute = time.getMinutes();
//     const hourMinute = `${hour > 9 ? hour : `0${hour}`}:${minute > 9 ? minute : `0${minute}`}`;      
//     event.time = hourMinute;
//     result[year][month][date].push(event);
//   }

//   return result;
// }

// static _save(doc, callback = () => {}) {
//   doc.save((err, doc) => {
//     if (err) {
//       callback(this.failure(err));
//     } else {
//       callback(this.success(doc._id));
//     }
//   });
// }


const { success, failure, authorize, insert, insertIfNotExisting, 
  update, remove, getItems, getEvents, reformatEvents, _save } 
  = require('../../database/DatabaseUtils');
const assert = require('assert');

module.exports = () => {
  describe('DatabaseUtils', function() {
    describe('#success(id)', function() {
      it('return correct response used for success', function() {
        assert.deepStrictEqual(success('testid'), { success: true, id: 'testid' });
      });
    });
    describe('#failure(error)', function() {
      it('return correct response used for failure', function() {
        assert.deepStrictEqual(failure({ code: 123, msg: 'error message' }), {
          success: false,
          message: { code: 123, msg: 'error message' }
        });
      });
    });
  });
}