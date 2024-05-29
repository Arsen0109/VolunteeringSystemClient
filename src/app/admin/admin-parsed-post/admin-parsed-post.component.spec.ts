import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParsedPostComponent } from './admin-parsed-post.component';

describe('AdminParsedPostComponent', () => {
  let component: AdminParsedPostComponent;
  let fixture: ComponentFixture<AdminParsedPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminParsedPostComponent]
    });
    fixture = TestBed.createComponent(AdminParsedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
