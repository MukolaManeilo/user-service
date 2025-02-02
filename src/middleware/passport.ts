import passport from 'passport';
import Expert from '../models/expert';
import Client from '../models/client';
import { Strategy as LocalStrategy } from 'passport-local';
import { comparePassword } from '../utils/hash';
import { InputValidationError, LoggingUserError, NotFoundError } from '../types/errorTypes';
import { errorValidator } from '../utils/errorHandler';

passport.use(
	'local',
	new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
		try {
			let user = await Expert.findOne({ email }).select('+password');
			if (!user) user = await Client.findOne({ email }).select('+password');

			if (!user) return done(new NotFoundError('User not found'), false);

			const isMatch = await comparePassword(password, user.password);
			if (!isMatch) return done(new InputValidationError('Incorrect password'), false);
			return done(null, user);
		} catch (err) {
			return done(errorValidator(err, new LoggingUserError()));
		}
	})
);

passport.serializeUser((user, done) => {
	if (user instanceof Expert || user instanceof Client) {
		done(null, user.id);
	} else {
		done(null, null);
	}
});

passport.deserializeUser(async (id: string, done) => {
	try {
		const client = await Client.findById(id);
		if (client) return done(null, client);

		const expert = await Expert.findById(id);
		if (expert) return done(null, expert);

		return done(null, null);
	} catch (err) {
		return done(errorValidator(err, 'Deserialize user error'));
	}
});

export default passport;
