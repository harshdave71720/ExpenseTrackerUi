import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesPaginatorComponent } from './expenses-paginator.component';

describe('ExpensesPaginatorComponent', () => {
  let component: ExpensesPaginatorComponent;
  let fixture: ComponentFixture<ExpensesPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
