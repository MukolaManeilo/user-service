import {IExpert} from "../../models/expert";
import {IClient} from "../../models/client";

type User = IExpert | IClient;

declare global {
	namespace Express {
		interface User extends User{}
	}
}