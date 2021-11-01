import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainLinkComponentComponent } from './domain-link-component.component';

describe('DomainLinkComponentComponent', () => {
  let component: DomainLinkComponentComponent;
  let fixture: ComponentFixture<DomainLinkComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainLinkComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainLinkComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
