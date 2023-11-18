import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDegreeComponent } from './button-degree.component';

describe('ButtonDegreeComponent', () => {
  let component: ButtonDegreeComponent;
  let fixture: ComponentFixture<ButtonDegreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonDegreeComponent]
    });
    fixture = TestBed.createComponent(ButtonDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
