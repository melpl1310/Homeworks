import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPersona } from './lista-persona';

describe('ListaPersona', () => {
  let component: ListaPersona;
  let fixture: ComponentFixture<ListaPersona>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPersona],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPersona);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
