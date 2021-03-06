const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  
  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  // Write your test blocks below:
  it('GET item with _id', async () => {
    const newItem = await seedItemToDatabase();
    const response = await request(app)
      .get(`/items/${newItem._id}`);
    assert.include(parseTextFromHTML(response.text, '#item-title'), newItem.title);
    assert.include(parseTextFromHTML(response.text, '#item-description'), newItem.description);
  });
  
  
});
