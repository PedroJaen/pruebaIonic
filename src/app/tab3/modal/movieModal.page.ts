import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-movie-modal',
    templateUrl: './movieModal.page.html',
})
export class MovieModalComponent implements OnInit {
    @Input() query: string;
    @Input() format: string;
    image = 'https://image.tmdb.org/t/p/original/';
    items: any;
    loaded: boolean;
    selectedRadioGroup: any;

    constructor(private navParams: NavParams,
        private modalController: ModalController,
        private http: HttpClient) {
        navParams.get('firstName');
        navParams.get('format');

        this.items = [];
        this.loaded = false;
    }

    ngOnInit(): void {
        this.http.get(this.query).subscribe((data: any) => {
            this.items = data.results;
            this.loaded = true;
        });
    }

    dismiss() {
        this.modalController.dismiss({ response: this.selectedRadioGroup });
    }

    radioGroupChange(event) {
        this.selectedRadioGroup = event.detail.value;
    }
}

