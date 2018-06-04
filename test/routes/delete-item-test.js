const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/delete', () => {
  
  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  // Write your test blocks below:
  it('POST delete item with _id', async () => {
    const newItem = await seedItemToDatabase();
    const response = await request(app)
        .post(`/items/${newItem._id}/delete`)
        .send();
        
    assert.equal(response.status, 302);
    assert.equal(response.headers.location, '/');
  });
  
  
});
