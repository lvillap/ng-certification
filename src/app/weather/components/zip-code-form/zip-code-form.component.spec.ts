import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipCodeFormComponent } from './zip-code-form.component';

describe('ZipCodeFormComponent', () => {
  let component: ZipCodeFormComponent;
  let fixture: ComponentFixture<ZipCodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipCodeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
