import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the graph management page', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Personas y ciudades');
    expect(compiled.querySelector('#titulo-grafo')?.textContent).toContain('Grafo de relaciones');
  });

  it('should register a person, connect it to a city, and show it in the city query', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.nombreCiudad = 'Cali';
    app.agregarCiudad();
    const city = app.ciudades[0];

    app.nombrePersona = 'Melanie';
    app.edadPersona = 20;
    app.ciudadSeleccionada = city.id;
    app.agregarPersona();
    app.ciudadConsulta = city.id;
    app.consultarHabitantes();
    fixture.detectChanges();

    expect(app.nodos).toHaveLength(2);
    expect(app.aristas).toEqual([{ origen: app.personas[0].id, destino: city.id }]);
    expect(app.habitantes.map((persona) => persona.nombre)).toEqual(['Melanie']);
    expect(fixture.nativeElement.textContent).toContain('Melanie');
    expect(fixture.nativeElement.querySelectorAll('svg .nodo')).toHaveLength(2);
    expect(fixture.nativeElement.querySelectorAll('svg .enlace')).toHaveLength(1);
  });
});
