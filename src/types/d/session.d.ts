// noinspection ES6UnusedImports
import session from 'express-session';

declare module 'express-session' {
	export interface Session {
		views: number;
	}
}