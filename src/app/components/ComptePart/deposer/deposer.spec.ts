import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deposer } from './deposer';

describe('Deposer', () => {
  let component: Deposer;
  let fixture: ComponentFixture<Deposer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deposer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deposer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
