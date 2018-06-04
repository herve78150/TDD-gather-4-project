const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.get('/items/:id', async (req, res, next) => {
  const id = req.params.id;
  const item = await Item.findById(id);
  res.render('single.layout.handlebars', {item});
});

router.post('/items/create', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', {newItem: newItem});
  } else {
    await newItem.save();
    res.redirect('/');
  }

});

router.post('/items/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  await Item.remove({ _id: id }, (err) => {
    if (err) {
      res.send(error);
    } else {
      res.redirect("/");
    }
  });
});


router.get('/items/:id/update', async (req, res, next) => {
  const id = req.params.id;
  const item = await Item.findById({_id: id});

  res.render('update.layout.handlebars', {item});
});

router.post("/items/:id/update", async (req, res, next) => {
  const id = req.params.id;
  const {title, description, imageUrl} = req.body;
  const item = {title, description, imageUrl};
   
  console.log(JSON.stringify(item, null, 4));

  await Item.findOneAndUpdate({ _id: id }, item, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/');
    }
  });  

});

module.exports = router;
  