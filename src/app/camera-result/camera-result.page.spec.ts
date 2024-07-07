import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraResultPage } from './camera-result.page';

describe('CameraResultPage', () => {
  let component: CameraResultPage;
  let fixture: ComponentFixture<CameraResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
