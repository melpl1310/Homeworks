import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RotacionMedicos } from './rotacion-medicos';

describe('RotacionMedicos', () => {
  let component: RotacionMedicos;
  let fixture: ComponentFixture<RotacionMedicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotacionMedicos],
    }).compileComponents();

    fixture = TestBed.createComponent(RotacionMedicos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
