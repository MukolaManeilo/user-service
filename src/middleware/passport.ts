import passport from 'passport';
import Expert, {IExpert} from '../models/Expert';
import Client, {IClient} from '../models/Client';
import {Strategy as LocalStrategy} from 'passport-local';
import {comparePassword} from '../utils/hash';

passport.use(
	'expert',
	new LocalStrategy(
		{ usernameField: 'email', passwordField: 'password' },
		async (email, password, done) => {
			try {
				const user = await Expert.findOne({ email }).select('+password');
				if (!user) return done(null, false, { message: 'User not found' });

				const isMatch = await comparePassword(password, user.password);
				if (!isMatch) return done(null, false, { message: 'Incorrect password' });

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);


passport.use(
	'client',
	new LocalStrategy(
		{ usernameField: 'email', passwordField: 'password' },
		async (email, password, done) => {
			try {
				const user: IClient | null = await Client.findOne({ email }).select('+password');
				if (!user) return done(null, false, { message: 'User not found' });

				const isMatch = await comparePassword(password, user.password);
				if (!isMatch) return done(null, false, { message: 'Incorrect password' });

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);


type User = IExpert | IClient;

passport.serializeUser((user, done) => {
	done(null, (user as IExpert | IClient).id);
});

passport.deserializeUser(async (id: string, done) => {
	try {
		const expert = await Expert.findById(id);
		if (expert) return done(null, expert);

		const client = await Client.findById(id);
		if (client) return done(null, client);

		return done(null, null);
	} catch (error) {
		return done(error);
	}
});


export default passport;
