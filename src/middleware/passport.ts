import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {comparePassword} from '../utils/hash';
import {User} from '../types/user';

const users: User[] = [
	{ id: 1, email: 'user@example.com', password: '$2b$10$abc123...' },
];

passport.use(
	new LocalStrategy(
		{ usernameField: 'email' },
		async (email, password, done) => {
			const user = users.find((u) => u.email === email);
			if (!user) return done(null, false, { message: 'User not found' });

			try {
				const isMatch = await comparePassword(password, user.password);
				if (!isMatch) return done(null, false, { message: 'Incorrect password' });

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.serializeUser((user: User, done) => {
	done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
	const user = users.find((u) => u.id === id);
	done(null, user || null);
});

export default passport;
