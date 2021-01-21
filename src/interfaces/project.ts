import {Resource} from './resource';
import {Model} from './model';

export const PROJECT_KEY = 'projects';

export interface Project {
  name: string;
  fullApiUrl: string;
  description: string;
  resources?: Resource[];
  models?: Model[];
}
