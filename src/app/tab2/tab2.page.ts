import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OpenLibraryShort } from './openlibrary.short';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from './book';
import { OpenLibraryLong } from './openlibrary.long';
import { isNullOrUndefined } from 'util';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    urlStart = 'https://openlibrary.org/api/books?bibkeys=ISBN:';
    urlShortEnd = '&jscmd=details&format=json';
    urlLongEnd = '&jscmd=data&format=json';
    form: FormGroup;
    asked: boolean;
    book: Book;

    constructor(private http: HttpClient,
                private formBuilder: FormBuilder,
                private loadingController: LoadingController,
                private toastController: ToastController) {
        this.asked = false;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            isbn: ['', [Validators.required]],
        });
    }

    async search() {
        this.asked = false;
        const isbn = Object.assign({}, this.form.value).isbn;

        const loading = await this.loadingController.create({
            message: ' Buscando...',
        });
        await loading.present();

        this.http.get(this.urlStart + isbn + this.urlShortEnd)
            .pipe(map(data => this.parseShortJson(data)))
            .subscribe(async (result: OpenLibraryShort) => {
                if (!isNullOrUndefined(result)) {
                    this.http.get(this.urlStart + isbn + this.urlLongEnd)
                        .pipe(map(data => this.parseLongJson(data)))
                        .subscribe(async (result2: OpenLibraryLong) => {
                            let description;
                            if (!isNullOrUndefined(result.details.description)) {
                                description = this.returnDataIfNotUndefined(result.details.description.value);
                            }
                            const subtitle = this.returnDataIfNotUndefined(result.details.subtitle);
                            let cover;
                            if (!isNullOrUndefined(result2.cover)) {
                                cover = this.returnDataIfNotUndefined(result2.cover.medium);
                            }

                            this.book = {
                                isbn,
                                number_of_pages: result.details.number_of_pages,
                                title: result.details.title,
                                subtitle,
                                publishers: result.details.publishers,
                                description,
                                physical_format: result.details.physical_format,
                                publish_places: result.details.publish_places,
                                publish_date: result.details.publish_date,
                                cover,
                                subjects: this.fillArray(result2.subjects),
                                authors: this.fillArray(result2.authors),
                            };
                            this.asked = true;
                            await loading.dismiss();
                        });
                } else {
                    await loading.dismiss();
                    const toast = await this.toastController.create({
                        message: 'No hay resultados',
                        duration: 2000
                    });
                    await toast.present();
                }
            });
    }

    private parseShortJson(data: any): OpenLibraryShort {
        const dataKeys = Object.keys(data);
        const [firstKey] = dataKeys;
        return data[firstKey];
    }

    private parseLongJson(data: any): OpenLibraryLong {
        const dataKeys = Object.keys(data);
        const [firstKey] = dataKeys;
        return data[firstKey];
    }

    private fillArray(data: any) {
        let result;
        if (data !== undefined) {
            result = [];
            data.forEach(element => result.push(element.name));
        }
        return result;
    }

    private returnDataIfNotUndefined(data: any) {
        if (!isNullOrUndefined(data)) {
            return data;
        } else { return; }
    }

}
