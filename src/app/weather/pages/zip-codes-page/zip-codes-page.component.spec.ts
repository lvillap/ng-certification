import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipCodesPageComponent } from './zip-codes-page.component';

describe('ZipCodesPageComponent', () => {
  let component: ZipCodesPageComponent;
  let fixture: ComponentFixture<ZipCodesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipCodesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipCodesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
