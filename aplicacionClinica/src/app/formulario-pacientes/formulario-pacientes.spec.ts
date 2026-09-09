import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioPacientes } from './formulario-pacientes';

describe('FormularioPacientes', () => {
  let component: FormularioPacientes;
  let fixture: ComponentFixture<FormularioPacientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPacientes],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPacientes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
