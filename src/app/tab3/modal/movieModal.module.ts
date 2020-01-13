import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieModalComponent } from './movieModal.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [MovieModalComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [],
    providers: [],
})
export class MovieModalModule { }
