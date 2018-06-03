const { assert } = require('chai');
const { parseTextFromHTML, seedItemToDatabase, buildItemObject } = require('../test-utils');
const { connectDatabaseAndDropData, diconnectDatabase } = require('../setup-teardown-utils');
const Item = require('../../models/item');

describe('User views item after creating it', () => {

  it('and looks at title, image and description', async () => {
    const itemToCreate = buildItemObject();

    browser.url('/items/create');
    browser.setValue('#title-input', itemToCreate.title);
    browser.setValue('#description-input', itemToCreate.description);
    browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
    browser.click('#submit-button');
    const itemCreated = await Item.findOne(itemToCreate);
    //browser.click('.item-card a'); 
    //below, I don't know if this regular, in french we say 'Ce n'est pa catholique!'.
    // I translate like that: This is not catholic !""
    // let me know your point of view
    await browser.click('a[href="/items/' + itemCreated._id +'"]');
    const textBody = await browser.getHTML('body');
    console.log(textBody);

    assert.include(textBody, itemToCreate.title);
    assert.include(textBody, `img src="${itemToCreate.imageUrl}"`);
    //ssert.include(browser.getAttribute('body img', 'src'), itemToCreate.imageUrl);
    //assert.include(browser.getAttribute('body img', 'src'), itemToCreate.imageUrl);
  });
});