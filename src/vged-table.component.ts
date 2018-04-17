import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface VgedTableConfig {
    paging: boolean;
    pagingMsg: boolean;
    sorting: { columns: any[] };
    filtering: { filterString: string };
    className: string[];
}

@Component({
    selector: 'vged-table',
    template: `<div class="row  justify-content-end">
                    <div class="col-md-4">
                        <input *ngIf="config.filtering" placeholder="Busqueda"
                               [ngTableFiltering]="config.filtering"
                               class="form-control"
                               (tableChanged)="onChangeTable(config)"/>
                    </div>
                    </div>
                    <br>
                    <ng-table [config]="config"
                              (tableChanged)="onChangeTable(config)"
                              (cellClicked)="onCellClick($event)"
                              [rows]="rows"
                              [columns]="columns">
                    </ng-table>
                    <pagination *ngIf="config.paging"
                                class="pagination-sm justify-content-center"
                                [(ngModel)]="page"
                                [totalItems]="length"
                                [itemsPerPage]="itemsPerPage"
                                [maxSize]="maxSize"
                                [boundaryLinks]="true"
                                [rotate]="false"
                                (pageChanged)="onChangeTable(config, $event)"
                                (numPages)="numPages = $event">
                    </pagination>
                    <pre *ngIf="config.pagingMsg && config.paging" class="card card-block card-header">Page: {{page}} / {{numPages}}</pre>
                    `
})
export class VgedTableComponent implements OnInit {

    @Input() public page: number = 1;
    @Input() public itemsPerPage: number = 5;
    @Input() public maxSize: number = 5;
    @Input() public numPages: number = 1;
    @Input() public length: number = 0;
    @Input() public columns: any[] = [];
    @Input() public rows: any[] = [];
    @Input() public data: any[] = [];
    @Input() public config: VgedTableConfig = {
        paging: true,
        pagingMsg: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: [ 'table-striped', 'table-bordered' ]
    };

    @Output()
    public cellClicked = new EventEmitter<any>();

    @Output()
    public tableChanged = new EventEmitter<any>();

    public onCellClick(data: any): void {
        this.cellClicked.emit(data);
    }

    public onChangeTable(
        config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
        this.tableChanged.emit(page);
    }

    public ngOnInit(): void {
        this.length = this.data.length;
        this.onChangeTable(this.config);
    }
}
