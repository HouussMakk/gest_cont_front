import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadeLitigeFormComponent } from './stade-litige-form.component';

describe('StadeLitigeFormComponent', () => {
  let component: StadeLitigeFormComponent;
  let fixture: ComponentFixture<StadeLitigeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StadeLitigeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StadeLitigeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
