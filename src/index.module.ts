import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';

import { VgedTableComponent } from './vged-table.component';

export { VgedTableConfig } from './vged-table.component';

@NgModule({
    declarations: [
        VgedTableComponent
    ],
    exports: [
        VgedTableComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PaginationModule.forRoot(),
        Ng2TableModule
    ]
})
export class VgedTableModule {}
