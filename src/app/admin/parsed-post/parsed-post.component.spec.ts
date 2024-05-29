import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsedPostComponent } from './parsed-post.component';

describe('ParsedPostComponent', () => {
  let component: ParsedPostComponent;
  let fixture: ComponentFixture<ParsedPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParsedPostComponent]
    });
    fixture = TestBed.createComponent(ParsedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
