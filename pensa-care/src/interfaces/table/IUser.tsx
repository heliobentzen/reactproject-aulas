import { IClient } from "./IClient";

export interface IUser extends IClient{
  id: string;
  name: string;
  username: string;
  email: string;
  clients?: IClient[];
}