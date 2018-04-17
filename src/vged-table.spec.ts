import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';

import { VgedTableModule } from './index.module';
import { VgedTableComponent, VgedTableConfig } from './vged-table.component';

describe('module: vged-button', () => {

    let comp: VgedTableComponent;
    let fixture: ComponentFixture<VgedTableComponent>;
    const config: VgedTableConfig = {
        paging: true,
        pagingMsg: true,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
    };
    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VgedTableComponent ], // declarar el componente
            imports: [
                CommonModule,
                FormsModule,
                PaginationModule.forRoot(),
                Ng2TableModule
            ]
        }).compileComponents(); // compilar el componente
    }));

    // sync beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(VgedTableComponent);
        comp = fixture.componentInstance;
        comp.itemsPerPage = 2;
        comp.length = 0;
        comp.page = 1;
        comp.rows = [];
        comp.numPages = 1;
        comp.maxSize = 5;
        comp.data = [{
            name: 'Crystal',
            position: 'Zoxy',
            office: 'Cayman Islands',
            ext: '3452.1005',
            startDate: 'Sun Mar 18 2012 13:50:46 GMT+0000 (UTC)',
            salary: 4000
        }];
        comp.columns = [
            {title: 'Nombre', name: 'name', filtering: {filterString: '', placeholder: 'Filtrar por nombre'}},
            {
                title: 'Eempresa',
                name: 'position',
                sort: false,
                filtering: {filterString: '', placeholder: 'Filtrar por empresa'}
            },
            {title: 'Oficina', className: ['office-header', 'text-success'],
                name: 'office', sort: 'asc'},
            {title: 'Extn.', name: 'ext', sort: '',
                filtering: {filterString: '', placeholder: 'Filtrar por extn.'}},
            {title: 'Fecha Inicio', className: 'text-warning', name: 'startDate'},
            {title: 'Salario', name: 'salary'}
        ];
        comp.config = config;
        comp.ngOnInit();
    });

    it('should be defined', () => {
        expect(VgedTableModule).toBeDefined();
        expect(comp).toBeDefined();
    });
});
