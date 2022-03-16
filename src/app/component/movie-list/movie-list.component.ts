import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

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
        { name: 'Crime' }
    ];
    selectCategory: any;
    totalPages: Array<any> = [];

    constructor(
        private http: HttpClient,
        private cs: CommonService) { }

    ngOnInit(): void {
        this.inspectEleemnt();
        this.imbd = 'src/assets/imbd.jpg';
        this.movieForm = new FormGroup({
            movieName: new FormControl('', Validators.required),
        });

        const checkbox: any = document.getElementById('checkbox');

        checkbox.addEventListener('change', () => {
            document.body.classList.toggle('dark');
        });
    }

    inspectEleemnt() {
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        document.addEventListener('copy', function(e) {
            e.preventDefault();
        });

        document.addEventListener('paste', (e) => {
            e.preventDefault();
        });

        document.addEventListener('scroll', (e) => {
            e.preventDefault();
        })
    }

    getMovieList(data: any) {
        console.log("🚀 ~ file: movie-list.component.ts ~ line 58 ~ MovieListComponent ~ getMovieList ~ data", data)
        const { movieName } = this.movieForm.getRawValue();
        
        if(typeof data === 'object' && data != null){
            localStorage.setItem('category',data.name);
            let category: any = localStorage.getItem('category');
            console.log("🚀 ~ file: movie-list.component.ts ~ line 61 ~ MovieListComponent ~ getMovieList ~ category", category)
            if(category){
                this.selectCategory = category.toString();
                this.movieForm.patchValue({
                    movieName: this.selectCategory,
                });
            }
        }

        if (typeof data === 'object' && data != null) {
            console.log("🚀 ~ file: movie-list.component.ts ~ line 69 ~ MovieListComponent ~ this.cs.getSelectedCategory ~ this.selectCategory", this.selectCategory)
            this.cs.getSelectedCategory(this.selectCategory).subscribe((response: any) => {
                console.log("🚀 ~ response", response);
                if (response && response.total_results != 0) {
                    this.showError = false;
                    this.movieList = response?.results;
                    this.movieList.map((items) => {
                        this.imgPath = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${items.poster_path}`;
                    });
                    this.totalPages = Array.from(Array(response?.total_pages).keys());
                } else {
                    this.movieList = [];
                    this.showError = true;
                    this.errorMsg = 'No records found.';
                }
            });
        } else if (typeof data === 'number' && data != null) {
            window.scrollTo(0,0)
            const url = `https://api.themoviedb.org/3/search/movie?api_key=f6bb9f69072f0d231a0f04b55854335a&language=en-US&query=${movieName}&page=${data}&include_adult=false`;
            this.cs.getMoviesAccPages(movieName, data).subscribe((response: any) => {
                console.log("🚀 ~ response", response)
                if (response && response.total_results != 0) {
                    this.showError = false;
                    this.movieList = response?.results;
                    this.movieList.map((items) => {
                        this.imgPath = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${items.poster_path}`;
                    });
                    this.totalPages = Array.from(Array(response?.total_pages).keys());
                } else {
                    this.movieList = [];
                    this.showError = true;
                    this.errorMsg = 'No records found.';
                }
            });
        } else if(data !== null && movieName){
            console.log("none called");
            this.cs.getMovieList(movieName).subscribe((response: any) => {
                console.log("🚀 ~ file: movie-list.component.ts ~ line 125 ~ MovieListComponent ~ this.cs.getMovieList ~ response", response)
                if (response && response.total_results != 0) {
                    this.showError = false;
                    this.movieList = response?.results;
                    this.movieList.map((items) => {
                        this.imgPath = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${items.poster_path}`;
                    });
                    this.totalPages = Array.from(Array(response?.total_pages).keys());
                } else {
                    this.movieList = [];
                    this.showError = true;
                    this.errorMsg = 'No records found.';
                }
            });
        } else if(data == null || !data || data == ''){
            this.movieList = [];
            this.totalPages = [];
            this.showError = true;
            this.errorMsg = 'Please Enter a movie name !!';
        }
    }
}
