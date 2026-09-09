import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComiteAdministrativo } from './comite-administrativo';

describe('ComiteAdministrativo', () => {
  let component: ComiteAdministrativo;
  let fixture: ComponentFixture<ComiteAdministrativo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComiteAdministrativo],
    }).compileComponents();

    fixture = TestBed.createComponent(ComiteAdministrativo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
