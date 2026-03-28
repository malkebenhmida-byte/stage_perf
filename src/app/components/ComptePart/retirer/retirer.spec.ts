import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Retirer } from './retirer';

describe('Retirer', () => {
  let component: Retirer;
  let fixture: ComponentFixture<Retirer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Retirer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Retirer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
