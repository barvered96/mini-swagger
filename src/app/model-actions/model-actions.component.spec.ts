import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelActionsComponent } from './model-actions.component';

describe('ModelActionsComponent', () => {
  let component: ModelActionsComponent;
  let fixture: ComponentFixture<ModelActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
