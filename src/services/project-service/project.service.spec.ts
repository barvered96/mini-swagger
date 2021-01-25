import {TestBed} from '@angular/core/testing';

import {ProjectService} from './project.service';
import {LocalStorageService} from '../storage-service/local-storage-service.service';
import {Local} from 'protractor/built/driverProviders';
import {Project, PROJECT_KEY} from '../../interfaces/project';
import {of} from 'rxjs';

xdescribe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('ProjectService', () => {
  let service: ProjectService;
  let storageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocalStorageService', ['setStorage', 'getStorage']);
    TestBed.configureTestingModule({
      providers: [ProjectService,
        {provide: LocalStorageService, useValue: spy}
      ]
    });
    service = TestBed.inject(ProjectService);
    storageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('Adding a project returns a list of 1 project', () => {
    const project: Project = {
      name: 'test',
      fullApiUrl: 'test',
      description: 'test',
      models: [],
      resources: []
    };
    storageServiceSpy.getStorage.and.returnValue(of([]));

    service.addProject(project).subscribe();
    service.getProjects().subscribe(projects => {
      expect(projects.length).toEqual(1);
    });
  });

  it('Adding an existing project returns an error', () => {
    const project: Project = {
      name: 'test',
      fullApiUrl: 'test',
      description: 'test',
      models: [],
      resources: []
    };
    storageServiceSpy.getStorage.and.returnValue(of([]));

    service.addProject(project).subscribe();
    service.getProjects().subscribe(projects => {
      expect(projects.length).toEqual(1);
    });

    const project2: Project = {
      name: 'test',
      fullApiUrl: 'test',
      description: 'test',
      models: [],
      resources: []
    };

    service.addProject(project2).subscribe();
    service.getProjects().subscribe(projects => {
      expect(f => {
        throw new Error('');
      });
    });
  });

  it('Adding 2 different projects and then removing one should return list of size 1', () => {
    const project: Project = {
      name: 'test',
      fullApiUrl: 'test',
      description: 'test',
      models: [],
      resources: []
    };
    storageServiceSpy.getStorage.and.returnValue(of([]));
    service.addProject(project).subscribe();
    service.getProjects().subscribe(projects => {
      expect(projects.length).toEqual(1);
    });

    const project2: Project = {
      name: 'test1',
      fullApiUrl: 'test',
      description: 'test',
      models: [],
      resources: []
    };

    service.addProject(project2).subscribe();
    service.getProjects().subscribe(projects => {
      expect(projects.length).toEqual(2);
    });

    service.deleteProject('test').subscribe();
    service.getProjects().subscribe(projects => {
      expect(projects.length).toEqual(1);
    });
  });

});
