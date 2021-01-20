import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceActionsComponent } from './resource-actions.component';

describe('ResourceComponent', () => {
  let component: ResourceActionsComponent;
  let fixture: ComponentFixture<ResourceActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
