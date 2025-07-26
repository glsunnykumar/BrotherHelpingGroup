import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemberStatusComponent } from './update-member-status.component';

describe('UpdateMemberStatusComponent', () => {
  let component: UpdateMemberStatusComponent;
  let fixture: ComponentFixture<UpdateMemberStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMemberStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMemberStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
