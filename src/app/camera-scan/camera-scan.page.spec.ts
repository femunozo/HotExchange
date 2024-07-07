import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraScanPage } from './camera-scan.page';

describe('CameraScanPage', () => {
  let component: CameraScanPage;
  let fixture: ComponentFixture<CameraScanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
