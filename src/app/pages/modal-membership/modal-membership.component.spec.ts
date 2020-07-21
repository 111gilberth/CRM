import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMembershipComponent } from './modal-membership.component';

describe('ModalMembershipComponent', () => {
  let component: ModalMembershipComponent;
  let fixture: ComponentFixture<ModalMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
