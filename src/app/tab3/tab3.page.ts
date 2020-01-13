import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { MovieModalComponent } from './modal/movieModal.page';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
    apiKey = '?api_key=e50d63dbcb5c1a6c703ea83cfed8cb7c';
    apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTBkNjNkYmNiNWMxYTZjNzAzZWE4M2NmZWQ4Y2I3YyIsInN1YiI6IjVjMTM2NTZkMGUwYTI2MDM4MjNiNzI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j3Nvb6Jyo8e5janjKjkHLr8PiU1wFLANJV1LTAoxBWA';
    language = '&language=es';
    image = 'https://image.tmdb.org/t/p/original/';
    query = '&query=';
    searchUrl = 'https://api.themoviedb.org/3/';
    credits = '&append_to_response=credits';
    form: FormGroup;
    selectedRadioGroup: any;
    isSearched: boolean;
    item: any;

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder,
        private modalController: ModalController) {
        this.isSearched = false;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: ['', [Validators.required]],
        });
    }

    search() {
        const title = Object.assign({}, this.form.value).title;
        let finalQuery = this.searchUrl + 'search/';

        if (this.selectedRadioGroup === 'Pelicula') {
            finalQuery += 'movie';
        } else {
            finalQuery += 'tv';
        }

        finalQuery += this.apiKey + this.query + title + this.language;
        this.presentModal(finalQuery);
    }

    radioGroupChange(event) {
        this.selectedRadioGroup = event.detail.value;
        this.isSearched = false;
    }

    async presentModal(query) {
        const modal = await this.modalController.create({
            component: MovieModalComponent,
            componentProps: {
                'query': query,
                'format': this.selectedRadioGroup,
            }
        });
        await modal.present();

        try {
            const { data } = await modal.onWillDismiss();

            if (this.selectedRadioGroup === 'Pelicula') {
                this.loadMovie(data.response);
            } else {
                this.loadTv(data.response);
            }
        } catch (error) { }
    }

    private loadMovie(id) {
        this.http.get(this.searchUrl + 'movie/' + id + this.apiKey + this.language + this.credits)
            .subscribe(data => {
                this.item = data;
                this.isSearched = true;
                console.log(data);
            });
    }

    private loadTv(id) {
        this.http.get(this.searchUrl + 'tv/' + id + this.apiKey + this.language + this.credits)
            .subscribe(data => {
                this.item = data;
                this.isSearched = true;
                console.log(data);
            });
    }
}
