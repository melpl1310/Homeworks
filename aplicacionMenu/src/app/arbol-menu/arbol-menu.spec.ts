import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArbolMenu } from './arbol-menu';

describe('ArbolMenu', () => {
  let component: ArbolMenu;
  let fixture: ComponentFixture<ArbolMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbolMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(ArbolMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
