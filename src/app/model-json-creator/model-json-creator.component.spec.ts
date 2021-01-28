import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ModelJsonCreatorComponent} from './model-json-creator.component';
import {Project} from '../../interfaces/project';
import {Model} from '../../interfaces/model';
import {ModelField} from '../../interfaces/modelField';
import {Observable, of} from 'rxjs';
import {ProjectService} from '../../services/project-service/project.service';
import {Resource} from '../../interfaces/resource';

const modelFields: ModelField[] = [{
  name: 'mockName',
  fieldType: 'number'
}];
const modelFields2: ModelField[] = [{
  name: 'mockName',
  fieldType: 'number'
},
  {
    name: 'mockName2',
    fieldType: 'number'
  }
];
const model: Model = {
  name: 'mockModel',
  fields: modelFields
};
const model2: Model = {
  name: 'mockModel2',
  fields: modelFields2
};
const resource: Resource = {
  name: 'mockResource',
  route: '/',
  method: 'DELETE',
  description: 'mock',
  body: 'mockModel'
};
const resource2: Resource = {
  name: 'mockResource2',
  route: '/',
  method: 'DELETE',
  description: 'mock',
  body: 'mockModel2'
};

class MockProjectService {
  public getProjects(): Observable<Project[]> {
    const project: Project = {
      name: 'mockProject',
      fullApiUrl: 'http://mock.com',
      description: 'mock',
      resources: [resource, resource2],
      models: [model, model2]
    };
    return of([project]);
  }
}


describe('ModelJsonCreatorComponent', () => {
  let component: ModelJsonCreatorComponent;
  let mockProjectService: ProjectService;
  let fixture: ComponentFixture<ModelJsonCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelJsonCreatorComponent],
      providers: [ModelJsonCreatorComponent, {provide: ProjectService, useClass: MockProjectService}]
    })
      .compileComponents();
    component = TestBed.inject(ModelJsonCreatorComponent);
    mockProjectService = TestBed.inject(ProjectService);
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ModelJsonCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Should have an <h5> with mockModel', () => {
    component.expandedModel = model.name;
    component.expandedResource = resource;
    component.projectName = 'mockProject';
    component.ngOnChanges();
    fixture.detectChanges();
    const nameElement: HTMLElement = fixture.nativeElement;
    const h5 = nameElement.querySelector('h5');
    expect(h5.textContent.replace(/\s/g, '')).toEqual('mockModel');
  });

  it('Should have 4 <div>, mockModel has only 1 field', () => {
    component.expandedModel = model.name;
    component.expandedResource = resource;
    component.projectName = 'mockProject';
    component.ngOnChanges();
    fixture.detectChanges();
    const nameElement: HTMLElement = fixture.nativeElement;
    const numDiv = nameElement.getElementsByTagName('div').length;
    expect(numDiv).toEqual(4);
  });

  it('Should have 5 <div>, mockModel has 2 fields', () => {
    component.expandedModel = model2.name;
    component.expandedResource = resource2;
    component.projectName = 'mockProject';
    component.ngOnChanges();
    fixture.detectChanges();
    const nameElement: HTMLElement = fixture.nativeElement;
    const numDiv = nameElement.getElementsByTagName('div').length;
    expect(numDiv).toEqual(5);
  });

  it('isDeleted should be false and option should be bg-danger', () => {
    component.expandedModel = model2.name;
    component.expandedResource = resource2;
    component.projectName = 'mockProject';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.isDeleted).toEqual(false);
    expect(component.option).toEqual('bg-danger');
  });
});
