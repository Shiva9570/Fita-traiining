import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsShowComponent } from './grids-show.component';

describe('GridsShowComponent', () => {
  let component: GridsShowComponent;
  let fixture: ComponentFixture<GridsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridsShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
