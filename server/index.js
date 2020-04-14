require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  db.query('SELECT "productId", "name", "price", "image", "shortDescription" FROM "products"')
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (!parseInt(productId, 10)) {
    return res.status(400).json({ error: 'productId must be a positive integer' });
  } else {
    const sql = `SELECT * FROM "products"
    WHERE "productId" = $1`;
    db.query(sql, [productId])
      .then(result => res.json(result.rows[0]))
      .catch(err => next(new ClientError(`cannot ${req.method} ${req.originalUrl} ${err}`, 404)));
  }
});

app.get('/api/cart', (req, res, next) => {
  const { cartId } = req.session;
  if (!cartId) {
    res.send([]);
  } else {
    const sql = `
    select "c"."cartItemId",
       "c"."price",
       "p"."productId",
       "p"."image",
       "p"."name",
       "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartId" = $1`;
    db.query(sql, [cartId])
      .then(result => res.json(result.rows))
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;
  if (!parseInt(productId, 10)) {
    return res.status(400).json({ error: 'productId is required and must be a positive integer' });
  } else {
    db.query('SELECT "price" FROM "products" WHERE "productId" = $1', [productId])
      .then(price => {
        if (price.rows.length === 0) {
          throw new ClientError(`productId ${productId} not found in products database`, 400);
        } else {
          if (req.session.cartId) {
            return { cartId: req.session.cartId, price: price.rows[0].price };
          } else {
            const sql = `
            INSERT INTO "carts" ("cartId", "createdAt")
              VALUES (default, default)
              RETURNING "cartId";`;
            return db.query(sql).then(cartId => Object.assign(cartId.rows[0], price.rows[0]));
          }
        }
      })
      .then(cartIdPriceObj => {
        req.session.cartId = cartIdPriceObj.cartId;
        const sql = `
        INSERT INTO "cartItems" ("cartId", "productId", "price")
          VALUES ($1, $2, $3)
          RETURNING "cartItemId"`;
        const params = [cartIdPriceObj.cartId, productId, cartIdPriceObj.price];
        return db.query(sql, params).then(cartItemId => cartItemId.rows[0].cartItemId);
      })
      .then(cartItemId => {
        const sql = `
        SELECT "c"."cartItemId",
            "c"."price",
            "p"."productId",
            "p"."image",
            "p"."name",
            "p"."shortDescription"
          FROM "cartItems" AS "c"
          JOIN "products" AS "p" USING ("productId")
          WHERE "c"."cartItemId" = $1`;
        return db.query(sql, [cartItemId]).then(result => res.status(201).json(result.rows[0]));
      })
      .catch(err => next(err));
  }
});

app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const { cartItemId } = req.params;
  if (!parseInt(cartItemId, 10)) return res.status(400).json({ error: 'productId must be a positive integer' });
  else {
    const sql = `
    DELETE FROM "cartItems"
      WHERE "cartItemId" = $1
      RETURNING *;`;
    db.query(sql, [cartItemId])
      .then(result => {
        const deletedItem = result.rows[0];
        if (!deletedItem) return res.status(404).json({ error: `No cartItem with ${deletedItem} found` });
        else return res.json(deletedItem);
      })
      .catch(err => {
        console.error(err.stack);
        next(err);
        res.status(500).json({ error: 'An unexpected error occured' });
      });
  }
});

app.post('/api/orders', (req, res, next) => {
  const { name, creditCard, shippingAddress } = req.body;
  const { cartId } = req.session;
  if (!cartId) return res.status(400).json({ error: `cartId not found ${cartId}` });
  if (!name || !creditCard || !shippingAddress) return res.status(400).json({ error: 'name, creditcard and shippingAddress are required fields' });
  const sql = `INSERT INTO "orders" ("cartId", "name", "creditCard", "shippingAddress")
                VALUES($1, $2, $3, $4) RETURNING *;`;
  db.query(sql, [cartId, name, creditCard, shippingAddress])
    .then(order => {
      delete req.session.cartId;
      res.status(201).json(order.rows[0]);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
