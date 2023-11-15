import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFavoriteComponent } from './button-favorite.component';

describe('ButtonFavoriteComponent', () => {
  let component: ButtonFavoriteComponent;
  let fixture: ComponentFixture<ButtonFavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonFavoriteComponent]
    });
    fixture = TestBed.createComponent(ButtonFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
