import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvocatFormComponent } from './avocat-form.component';

describe('AvocatFormComponent', () => {
  let component: AvocatFormComponent;
  let fixture: ComponentFixture<AvocatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvocatFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvocatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
