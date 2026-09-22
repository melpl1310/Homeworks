import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioLibros } from './formulario-libros';

describe('FormularioLibros', () => {
  let component: FormularioLibros;
  let fixture: ComponentFixture<FormularioLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioLibros],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioLibros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
