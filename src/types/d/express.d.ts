import {IExpert} from "../../models/expert";
import {IClient} from "../../models/client";


declare global {
	type UserUnion = (IExpert & { id?: string }) | (IClient & { id?: string });
	namespace Express {
		interface User extends UserUnion{}
	}
}