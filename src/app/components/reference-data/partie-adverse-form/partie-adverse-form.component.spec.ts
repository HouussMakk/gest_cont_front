import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieAdverseFormComponent } from './partie-adverse-form.component';

describe('PartieAdverseFormComponent', () => {
  let component: PartieAdverseFormComponent;
  let fixture: ComponentFixture<PartieAdverseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartieAdverseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartieAdverseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
