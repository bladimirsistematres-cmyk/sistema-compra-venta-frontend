import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraListarTableComponent } from './compra-listar-table.component';

describe('CompraListarTableComponent', () => {
  let component: CompraListarTableComponent;
  let fixture: ComponentFixture<CompraListarTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraListarTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraListarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
