import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaPrimaListarCardComponent } from './materia-prima-listar-card.component';

describe('MateriaPrimaListarCardComponent', () => {
  let component: MateriaPrimaListarCardComponent;
  let fixture: ComponentFixture<MateriaPrimaListarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriaPrimaListarCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriaPrimaListarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
