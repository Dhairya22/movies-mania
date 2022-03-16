import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    loader = new BehaviorSubject<Boolean>(false);

    constructor(
        private httpClient: HttpClient
    ) { }

    getMovieList(movie: string){
        const url = `https://api.themoviedb.org/3/search/movie?api_key=f6bb9f69072f0d231a0f04b55854335a&language=en-US&query=${movie}&page=1&include_adult=false`;
        return this.httpClient.get(url);
    }

    getSelectedCategory(selectedCategory: string){
        const url = `https://api.themoviedb.org/3/search/movie?api_key=f6bb9f69072f0d231a0f04b55854335a&language=en-US&query=${selectedCategory}&page=1&include_adult=false`;
        return this.httpClient.get(url);
    }

    getMoviesAccPages(movie: string,page: number = 0){
        const url = `https://api.themoviedb.org/3/search/movie?api_key=f6bb9f69072f0d231a0f04b55854335a&language=en-US&query=${movie}&page=${page}&include_adult=false`;
        return this.httpClient.get(url);
    }
    
}
