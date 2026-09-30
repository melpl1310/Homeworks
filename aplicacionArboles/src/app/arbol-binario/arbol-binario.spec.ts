import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArbolBinario } from './arbol-binario';

describe('ArbolBinario', () => {
  let component: ArbolBinario;
  let fixture: ComponentFixture<ArbolBinario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbolBinario],
    }).compileComponents();

    fixture = TestBed.createComponent(ArbolBinario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
