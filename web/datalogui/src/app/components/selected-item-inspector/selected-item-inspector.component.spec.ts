import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedItemInspectorComponent } from './selected-item-inspector.component';

describe('SelectedItemInspectorComponent', () => {
  let component: SelectedItemInspectorComponent;
  let fixture: ComponentFixture<SelectedItemInspectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedItemInspectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedItemInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
