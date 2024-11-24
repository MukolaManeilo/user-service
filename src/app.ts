import express from 'express';
import RedisStore from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';

const app = express();
const PORT = 3000;

const redisClient = Redis.createClient();
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "ssp:",
  ttl: 3600,
});


app.use(express.json());

app.use(
  session({
    store: redisStore,
    saveUninitialized: false,
    secret: 'keyboard cat',
    resave: false,
  })
)

app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`<h1>View count: ${req.session.views}</h1>`);
  } else {
    req.session.views = 1;
    res.send('<h1>Welcome! This is your first visit.</h1>');
  }
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:3000');
});
