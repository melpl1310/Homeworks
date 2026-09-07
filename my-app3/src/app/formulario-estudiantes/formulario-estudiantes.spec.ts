import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioEstudiantes } from './formulario-estudiantes';

describe('FormularioEstudiantes', () => {
  let component: FormularioEstudiantes;
  let fixture: ComponentFixture<FormularioEstudiantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEstudiantes],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioEstudiantes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
