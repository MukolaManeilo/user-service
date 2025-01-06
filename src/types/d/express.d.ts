import {IExpert} from "../../models/Expert";
import {IClient} from "../../models/Client";

type User = IExpert | IClient;

declare global {
	namespace Express {
		interface User extends User{}
	}
}