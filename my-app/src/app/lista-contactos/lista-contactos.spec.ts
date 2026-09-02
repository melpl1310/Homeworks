import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaContactos } from './lista-contactos';

describe('ListaContactos', () => {
  let component: ListaContactos;
  let fixture: ComponentFixture<ListaContactos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaContactos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaContactos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
