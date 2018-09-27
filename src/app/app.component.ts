import { Component } from "@angular/core";
//[] = Grid Properties
//() = Grid Events
//nothing = 
//column definitions are in the columnDefs
@Component({
  selector: "app-root",
  template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    [rowData]="rowData"
    class="ag-theme-material"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    [enableSorting]="true"
    [enableFilter]="true"
    [enableColResize]="true"
    (gridSizeChanged)="gridresize($event)"
    (columnResized)="onColumnResized($event)"
    (gridReady)="onGridReady($event)" 
    colResizeDefault='shift' 
    >
    </ag-grid-angular>`
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;
  private rowData: any[];

  private columnDefs;
  private resizeFlag;

  constructor() {
    this.columnDefs = [
      {
        field: "name",
        cellClass: "cell-wrap-text",
        width: 100
      },
      {
        field: "autoA",
        cellClass: "cell-wrap-text",
        autoHeight: true
      },
      {
        field: "autoB",
        cellClass: "cell-wrap-text",
        autoHeight: true
      },
      {
        field: "autoC",
        cellClass: "cell-wrap-text",
        autoHeight: true
      }
    ];
    this.rowData = createRowData();
    this.resizeFlag = false;
  }

  gridresize(event) {
    event.api.sizeColumnsToFit();
  };

  onColumnResized(event) {
    if (event.finished) {
      this.gridApi.resetRowHeights();
    }
  }

  onGridReady(event) {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;

    setTimeout(function() {
      event.api.resetRowHeights();
    }, 500);
  }
}

function createRowData() {
  var latinSentence =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
  var latinWords = latinSentence.split(" ");
  var rowData = [];
  function generateRandomSentence(row, col) {
    var wordCount = ((row + 1) * (col + 1) * 733 * 19) % latinWords.length;
    var parts = [];
    for (var i = 0; i < wordCount; i++) {
      parts.push(latinWords[i]);
    }
    var sentence = parts.join(" ");
    return sentence + ".";
  }
  for (var i = 0; i < 100; i++) {
    var item = {
      name: "Row " + i,
      autoA: generateRandomSentence(i, 1),
      autoB: generateRandomSentence(i, 2),
      autoC: generateRandomSentence(i, 3)
    };
    rowData.push(item);
  }
  return rowData;
}
