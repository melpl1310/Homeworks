import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navegador } from './navegador';

describe('Navegador', () => {
  let component: Navegador;
  let fixture: ComponentFixture<Navegador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navegador],
    }).compileComponents();

    fixture = TestBed.createComponent(Navegador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
