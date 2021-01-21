import {Model} from './model';

export interface Resource {
  name: string;
  route: string;
  description: string;
  method: string;
  model?: Model;
}
