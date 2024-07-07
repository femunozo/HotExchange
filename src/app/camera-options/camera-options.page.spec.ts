import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraOptionsPage } from './camera-options.page';

describe('CameraOptionsPage', () => {
  let component: CameraOptionsPage;
  let fixture: ComponentFixture<CameraOptionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
