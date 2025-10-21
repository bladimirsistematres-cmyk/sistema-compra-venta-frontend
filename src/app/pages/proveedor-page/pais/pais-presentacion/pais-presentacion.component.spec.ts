import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisPresentacionComponent } from './pais-presentacion.component';

describe('PaisPresentacionComponent', () => {
  let component: PaisPresentacionComponent;
  let fixture: ComponentFixture<PaisPresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisPresentacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaisPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
