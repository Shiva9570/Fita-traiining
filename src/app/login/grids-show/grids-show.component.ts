import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule, ColDef } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);
interface UserRow {
  id: number;
  name: string;
  age: number;
  email: string;
}

@Component({
  selector: 'app-grids-show',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './grids-show.component.html',
  styleUrls: ['./grids-show.component.css'],
})
export class GridShowComponent {
  // theme: 'legacy' = 'legacy';

  columnDefs: ColDef<UserRow>[] = [
    { field: 'id', editable: false, flex: 1 },
    { field: 'name', editable: true, flex: 1 },
    { field: 'age', editable: true, flex: 1 },
    { field: 'email', editable: true, flex: 2 }, // email gets more space
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  rowData = [
    { id: 1, name: 'Mishra', age: 25, email: 'mishra@gmail.com' },
    { id: 2, name: 'Rohan', age: 22, email: 'rohan@mail.com' },
    { id: 3, name: 'Sneha', age: 26, email: 'sneha@gmail.com' },
  ];

  onCellValueChanged(event: any) {
    console.log('Edited Row Data:', event.data);
  }

  ngOnInit() {
    console.log('ROW DATA:', this.rowData);
    console.log('COLUMN DEFS:', this.columnDefs);
  }
}
