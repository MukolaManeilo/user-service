import express from 'express';
import passport from 'passport';
import session from 'express-session';
import {Strategy as LocalStrategy} from 'passport-local';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';
import bcrypt from 'bcrypt';
import {User} from './types/user';

const app = express();
const PORT = 3000;


const redisClient = Redis.createClient();
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'ssp:',
  ttl: 3600,
});


app.use(
    session({
      store: redisStore,
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
    })
);


app.use(passport.initialize());
app.use(passport.session());


const users: User[] = [
  { id: 1, email: 'user@example.com', password: '$2b$10$abc123...' },
];


passport.use(
    new LocalStrategy(
        {
          usernameField: 'email',
        },
        (email: string, password: string, done: Function) => {
          const user = users.find((u) => u.email === email);
          if (!user) return done(null, false, { message: 'User not found' });

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch) return done(null, false, { message: 'Incorrect password' });

            return done(null, user);
          });
        }
    )
);


passport.serializeUser((user: User, done) => {
  done(null, user.id);
});


passport.deserializeUser((id: number, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});


app.post('/register', (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');

    const newUser: User = {
      id: users.length + 1,
      email,
      password: hashedPassword,
    };

    users.push(newUser);


    req.login(newUser, (err) => {
      if (err) return res.status(500).send('Error logging in after registration');
      res.status(200).send('User registered and logged in');
    });
  });
});


app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
}));


app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Welcome, ${req.user?.email}!</h1>`);
  } else {
    res.redirect('/login');
  }
});


app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send('Logout error');
    res.redirect('/');
  });
});


app.get('/', (req, res) => {
  res.send('<h1>Welcome to the app!</h1>');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
