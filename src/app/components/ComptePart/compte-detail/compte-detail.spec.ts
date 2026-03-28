import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteDetail } from './compte-detail';

describe('CompteDetail', () => {
  let component: CompteDetail;
  let fixture: ComponentFixture<CompteDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
