import {IExpert} from '../models/Expert';
import {IClient} from '../models/Client';

declare global {
	namespace Express {
		interface User extends IExpert, IClient {}
	}
}
