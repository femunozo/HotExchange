import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeolocationResultPage } from './geolocation-result.page';

describe('GeolocationResultPage', () => {
  let component: GeolocationResultPage;
  let fixture: ComponentFixture<GeolocationResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
