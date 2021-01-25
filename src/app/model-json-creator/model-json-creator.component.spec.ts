import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelJsonCreatorComponent } from './model-json-creator.component';

xdescribe('ModelJsonCreatorComponent', () => {
  let component: ModelJsonCreatorComponent;
  let fixture: ComponentFixture<ModelJsonCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelJsonCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelJsonCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
