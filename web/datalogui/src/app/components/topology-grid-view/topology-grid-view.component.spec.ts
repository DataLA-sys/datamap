import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologyGridViewComponent } from './topology-grid-view.component';

describe('TopologyGridViewComponent', () => {
  let component: TopologyGridViewComponent;
  let fixture: ComponentFixture<TopologyGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopologyGridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologyGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
