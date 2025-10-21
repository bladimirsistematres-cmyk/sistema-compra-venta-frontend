import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaPrimaBottomSheetComponent } from './materia-prima-bottom-sheet.component';

describe('MateriaPrimaBottomSheetComponent', () => {
  let component: MateriaPrimaBottomSheetComponent;
  let fixture: ComponentFixture<MateriaPrimaBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriaPrimaBottomSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriaPrimaBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
