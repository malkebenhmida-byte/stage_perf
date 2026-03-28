import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModif } from './client-modif';

describe('ClientModif', () => {
  let component: ClientModif;
  let fixture: ComponentFixture<ClientModif>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientModif]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientModif);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
