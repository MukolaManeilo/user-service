import { IExpert } from '../models/expert';
import { IClient } from '../models/client';

export type UserUnion = (IExpert & { id?: string }) | (IClient & { id?: string });
