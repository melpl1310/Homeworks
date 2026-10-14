import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestorArchivos } from './gestor-archivos';

describe('GestorArchivos', () => {
  let component: GestorArchivos;
  let fixture: ComponentFixture<GestorArchivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorArchivos],
    }).compileComponents();

    fixture = TestBed.createComponent(GestorArchivos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
