import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioPersona } from './formulario-persona';

describe('FormularioPersona', () => {
  let component: FormularioPersona;
  let fixture: ComponentFixture<FormularioPersona>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPersona],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPersona);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
