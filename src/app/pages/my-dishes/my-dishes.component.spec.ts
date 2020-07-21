import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDishesComponent } from './my-dishes.component';

describe('MyDishesComponent', () => {
  let component: MyDishesComponent;
  let fixture: ComponentFixture<MyDishesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDishesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
