import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourceComponent } from './create-resource.component';

describe('ResourceComponent', () => {
  let component: CreateResourceComponent;
  let fixture: ComponentFixture<CreateResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
