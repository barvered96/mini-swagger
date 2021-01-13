import {Resource} from './resource';
import {BaseModel} from './base-model';

export const PROJECT_KEY = 'projects';

export interface Project extends BaseModel {
  resources?: Resource[];
}
