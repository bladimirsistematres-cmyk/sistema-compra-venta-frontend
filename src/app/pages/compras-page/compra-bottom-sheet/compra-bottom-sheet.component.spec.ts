import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraBottomSheetComponent } from './compra-bottom-sheet.component';

describe('CompraBottomSheetComponent', () => {
  let component: CompraBottomSheetComponent;
  let fixture: ComponentFixture<CompraBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraBottomSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
