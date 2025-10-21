import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraListarCardComponent } from './compra-listar-card.component';

describe('CompraListarCardComponent', () => {
  let component: CompraListarCardComponent;
  let fixture: ComponentFixture<CompraListarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraListarCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraListarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
