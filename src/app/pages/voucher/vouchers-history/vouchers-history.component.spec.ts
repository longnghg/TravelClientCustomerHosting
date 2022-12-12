import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersHistoryComponent } from './vouchers-history.component';

describe('VouchersHistoryComponent', () => {
  let component: VouchersHistoryComponent;
  let fixture: ComponentFixture<VouchersHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VouchersHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VouchersHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
