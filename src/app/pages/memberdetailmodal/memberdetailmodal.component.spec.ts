import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberdetailmodalComponent } from './memberdetailmodal.component';

describe('MemberdetailmodalComponent', () => {
  let component: MemberdetailmodalComponent;
  let fixture: ComponentFixture<MemberdetailmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberdetailmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberdetailmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
