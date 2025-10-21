import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisListarComponent } from './pais-listar.component';

describe('PaisListarComponent', () => {
  let component: PaisListarComponent;
  let fixture: ComponentFixture<PaisListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaisListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
