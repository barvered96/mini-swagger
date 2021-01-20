import {Resource} from './resource';

export const PROJECT_KEY = 'projects';

export interface Project {
  name: string;
  fullApiUrl: string;
  description: string;
  resources?: Resource[];
}
