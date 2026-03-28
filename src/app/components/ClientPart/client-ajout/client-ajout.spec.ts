import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAjout } from './client-ajout';

describe('ClientAjout', () => {
  let component: ClientAjout;
  let fixture: ComponentFixture<ClientAjout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAjout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAjout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
