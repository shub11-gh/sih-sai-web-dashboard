const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

const rules = auth.rewriter({
  users: 600
});

app.use(cors());
app.db = router.db;

app.use(rules);
app.use(auth);
app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`JSON Server with auth running on http://localhost:${PORT}`);
});
