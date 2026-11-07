import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadosComponent } from './resultado';

describe('ResultadosComponent', () => {
  let component: ResultadosComponent;
  let fixture: ComponentFixture<ResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
