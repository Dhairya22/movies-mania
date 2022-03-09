import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface category {
    name: string;
}

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
    movieForm!: FormGroup;
    movieList: Array<any> = [];
    imgPath: any;
    showError: Boolean = false;
    errorMsg = '';
    imbd: any;
    category: Array<category> = [
        { name: 'Comedy' },
        { name: 'Thriller' },
        { name: 'Horror' },
        { name: 'Action' },
        { name: 'Sci-Fi' },
    ];
    selectCategory: any;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.imbd = 'src/assets/imbd.jpg';
        this.movieForm = new FormGroup({
            movieName: new FormControl('', Validators.required),
        });

        const checkbox: any = document.getElementById('checkbox');

        checkbox.addEventListener('change', () => {
            document.body.classList.toggle('dark');
        });
    }

    onSubmit() {
        const { movieName } = this.movieForm.getRawValue();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=f6bb9f69072f0d231a0f04b55854335a&language=en-US
                      &query=${movieName}&page=1&include_adult=false`;
        this.http.get(url).subscribe(
            (response: any) => {
                // this.showError = false;
                if (response && response.total_results != 0) {
                    this.showError = false;
                    this.movieList = response?.results;
                    this.movieList.map((items) => {
                        this.imgPath = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${items.poster_path}`;
                    });
                } else {
                    this.movieList = [];
                    this.showError = true;
                    this.errorMsg = 'No records found.';
                }
            },
            (error) => {
                if (error) {
                    this.movieList = [];
                    this.showError = true;
                    this.errorMsg = 'Please enter a Movie name.';
                }
            }
        );
    }

    selectedCategory(category: any) {
        this.selectCategory = category.name;
        this.movieForm.patchValue({
            movieName: this.selectCategory,
        });

        const url = `https://api.themoviedb.org/3/search/movie?api_key=f6bb9f69072f0d231a0f04b55854335a&language=en-US
                      &query=${this.selectCategory}&page=1&include_adult=false`;
        this.http.get(url).subscribe(
            (response: any) => {
                // this.showError = false;
                if (response && response.total_results != 0) {
                    this.showError = false;
                    this.movieList = response?.results;
                    this.movieList.map((items) => {
                        this.imgPath = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${items.poster_path}`;
                    });
                } else {
                    this.movieList = [];
                    this.showError = true;
                    this.errorMsg = 'No records found.';
                }
            },
            (error) => {
                if (error) {
                    this.movieList = [];
                    this.showError = true;
                    this.errorMsg = 'Please enter a Movie name.';
                }
            }
        );
    }
}
