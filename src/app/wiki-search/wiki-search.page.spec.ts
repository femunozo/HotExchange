import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WikiSearchPage } from './wiki-search.page';

describe('WikiSearchPage', () => {
  let component: WikiSearchPage;
  let fixture: ComponentFixture<WikiSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
