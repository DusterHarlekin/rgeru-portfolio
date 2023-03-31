import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissionsComponent } from './comissions.component';

describe('ComissionsComponent', () => {
  let component: ComissionsComponent;
  let fixture: ComponentFixture<ComissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
