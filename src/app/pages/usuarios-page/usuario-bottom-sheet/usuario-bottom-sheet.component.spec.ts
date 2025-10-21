import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioBottomSheetComponent } from './usuario-bottom-sheet.component';

describe('UsuarioBottomSheetComponent', () => {
  let component: UsuarioBottomSheetComponent;
  let fixture: ComponentFixture<UsuarioBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioBottomSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
