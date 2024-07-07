import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeolocationSearchPage } from './geolocation-search.page';

describe('GeolocationSearchPage', () => {
  let component: GeolocationSearchPage;
  let fixture: ComponentFixture<GeolocationSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
