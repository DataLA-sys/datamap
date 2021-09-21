import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedItemInfoComponent } from './selected-item-info.component';

describe('SelectedItemInfoComponent', () => {
  let component: SelectedItemInfoComponent;
  let fixture: ComponentFixture<SelectedItemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedItemInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedItemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
