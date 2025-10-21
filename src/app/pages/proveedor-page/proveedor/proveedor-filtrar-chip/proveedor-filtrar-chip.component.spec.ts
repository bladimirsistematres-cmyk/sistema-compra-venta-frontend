import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFiltrarChipComponent } from './proveedor-filtrar-chip.component';

describe('ProveedorFiltrarChipComponent', () => {
  let component: ProveedorFiltrarChipComponent;
  let fixture: ComponentFixture<ProveedorFiltrarChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorFiltrarChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorFiltrarChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
