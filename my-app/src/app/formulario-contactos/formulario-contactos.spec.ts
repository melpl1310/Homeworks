import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioContactos } from './formulario-contactos';

describe('FormularioContactos', () => {
  let component: FormularioContactos;
  let fixture: ComponentFixture<FormularioContactos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioContactos],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioContactos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
