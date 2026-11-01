import { TestBed } from '@angular/core/testing';
import { GrafoService } from './grafo.service';

describe('GrafoService', () => {
  let service: GrafoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrafoService);
  });

  it('creates a city and connects each person to that city', () => {
    service.agregarCiudad('Cali');
    const city = service.obtenerCiudades()[0];

    service.agregarPersona('Melanie', 20, city.id);
    const person = service.obtenerPersonas()[0];

    expect(service.obtenerNodos()).toEqual([
      { id: city.id, tipo: 'ciudad', nombre: 'Cali' },
      { id: person.id, tipo: 'persona', nombre: 'Melanie', edad: 20 },
    ]);
    expect(service.obtenerAristas()).toEqual([
      { origen: person.id, destino: city.id },
    ]);
    expect(service.personasPorCiudad(city.id)).toEqual([person]);
  });

  it('rejects people without a registered city', () => {
    expect(() => service.agregarPersona('Melanie', 20, 'missing-city'))
      .toThrow('Debes seleccionar una ciudad existente.');
    expect(service.obtenerPersonas()).toEqual([]);
    expect(service.obtenerNodos()).toEqual([]);
  });

  it('rejects the same person name in another city regardless of case, accents, or surrounding spaces', () => {
    service.agregarCiudad('Cali');
    service.agregarCiudad('Bogotá');
    const [cali, bogota] = service.obtenerCiudades();
    service.agregarPersona('María López', 20, cali.id);

    expect(() => service.agregarPersona('  MARIA LOPEZ  ', 25, bogota.id))
      .toThrow('Ya existe una persona registrada con ese nombre.');
    expect(service.obtenerPersonas()).toHaveLength(1);
    expect(service.obtenerNodos()).toHaveLength(3);
    expect(service.obtenerAristas()).toHaveLength(1);
  });

  it('allows one city to have many people but rejects a second city for a person', () => {
    service.agregarCiudad('Cali');
    service.agregarCiudad('Bogotá');
    const [cali, bogota] = service.obtenerCiudades();
    service.agregarPersona('Melanie', 20, cali.id);
    service.agregarPersona('Laura', 19, cali.id);
    const melanie = service.obtenerPersonas()[0];

    expect(() => service.addEdge(melanie.id, bogota.id))
      .toThrow('Una persona solo puede estar asociada a una ciudad.');
    expect(service.personasPorCiudad(cali.id)).toHaveLength(2);
    expect(service.personasPorCiudad(bogota.id)).toHaveLength(0);
    expect(service.obtenerAristas()).toHaveLength(2);
  });

  it('only allows connections between a person and a city', () => {
    service.agregarCiudad('Cali');
    service.agregarCiudad('Bogotá');
    const [cali, bogota] = service.obtenerCiudades();

    expect(() => service.addEdge(cali.id, bogota.id))
      .toThrow('Las conexiones deben ser entre una persona y una ciudad.');
    expect(service.obtenerAristas()).toEqual([]);
  });

  it('removes a city and all people linked to it', () => {
    service.agregarCiudad('Cali');
    const city = service.obtenerCiudades()[0];
    service.agregarPersona('Melanie', 20, city.id);

    service.removeNode(city.id);

    expect(service.obtenerCiudades()).toEqual([]);
    expect(service.obtenerPersonas()).toEqual([]);
    expect(service.obtenerNodos()).toEqual([]);
    expect(service.obtenerAristas()).toEqual([]);
  });
});
