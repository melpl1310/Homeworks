import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Tareas } from './tareas';
import { Tarea, TareasService } from '../../services/tareas.service';

describe('Tareas', () => {
  let component: Tareas;
  let fixture: ComponentFixture<Tareas>;
  type DuplicateError = { code: string; message: string };
  const tareasServiceMock = {
    listarTareas: vi.fn(async (): Promise<{ data: Tarea[]; error: null }> => ({
      data: [{
        id: 1,
        titulo: 'Comprar pan',
        completada: false,
        user_id: 'usuario-1',
        created_at: '2026-01-01T00:00:00Z'
      }],
      error: null
    })),
    crearTarea: vi.fn(async (_titulo: string): Promise<{
      data: null;
      error: DuplicateError | null;
    }> => ({ data: null, error: null })),
    actualizarTarea: vi.fn(),
    eliminarTarea: vi.fn()
  };

  beforeEach(async () => {
    tareasServiceMock.listarTareas.mockClear();
    tareasServiceMock.crearTarea.mockClear();
    tareasServiceMock.crearTarea.mockResolvedValue({
      data: null,
      error: null
    });

    await TestBed.configureTestingModule({
      imports: [Tareas],
      providers: [
        { provide: TareasService, useValue: tareasServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tareas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows tasks loaded during initialization without requiring a click', () => {
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Comprar pan');
    expect(text).toContain('Total de tareas: 1');
  });

  it('prevents adding a task with the same title ignoring case and spaces', async () => {
    component.titulo = '  COMPRAR PAN  ';

    await component.agregarTarea();

    expect(tareasServiceMock.crearTarea).not.toHaveBeenCalled();
    expect(component.mensaje).toBe('Ya existe una tarea con ese nombre.');
  });

  it('shows a friendly message when the database rejects a duplicate', async () => {
    tareasServiceMock.crearTarea.mockResolvedValue({
      data: null,
      error: { code: '23505', message: 'duplicate key' }
    });
    component.titulo = 'Comprar leche';

    await component.agregarTarea();

    expect(component.mensaje).toBe('Ya existe una tarea con ese nombre.');
  });
});
