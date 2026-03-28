import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRecherche } from './client-recherche';

describe('ClientRecherche', () => {
  let component: ClientRecherche;
  let fixture: ComponentFixture<ClientRecherche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientRecherche]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRecherche);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
