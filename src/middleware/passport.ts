import passport from 'passport';
import Expert from '../models/Expert';
import Client from '../models/Client';
import {Strategy as LocalStrategy} from 'passport-local';
import {comparePassword} from '../utils/hash';
import {User} from "../types/d/express";

passport.use(
	'local',
	new LocalStrategy(
		{ usernameField: 'email', passwordField: 'password' },
		async (email, password, done) => {
			try {

				let user: User = await Expert.findOne({ email }).select('+password');
				if(!user) user = await Client.findOne({ email }).select('+password');

				if (!user) return done(Error('User not found'), false);

				const isMatch = await comparePassword(password, user.password);
				if (!isMatch) return done(Error('Incorrect password'), false);

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);



passport.serializeUser((user, done) => {
	done(null, (user as User).id);
});


passport.deserializeUser(async (id: string, done) => {
	try {
		const client = await Client.findById(id);
		if (client) return done(null, client);

		const expert = await Expert.findById(id);
		if (expert) return done(null, expert);

		return done(null, null);
	} catch (error) {
		return done(error);
	}
});


export default passport;
