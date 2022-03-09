import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {

  movieForm!: FormGroup;
  movieList: Array<any> = [];
  imgPath: any;

  imbd: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.imbd = "src/assets/imbd.jpg";
    this.movieForm = new FormGroup({
      movieName: new FormControl('', Validators.required),
    });

    const checkbox: any = document.getElementById('checkbox');

    checkbox.addEventListener('change', ()=>{
  document.body.classList.toggle('dark');
})
  }

  onSubmit() {
    const { movieName } = this.movieForm.getRawValue();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=f6bb9f69072f0d231a0f04b55854335a&language=en-US
                &query=${movieName}&page=1&include_adult=false`;
    this.http.get(url).subscribe((response: any) => {
        if(response){
            this.movieList = response?.results;
            this.movieList.map(items => {
                this.imgPath = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${items.poster_path}`;
                console.log("🚀 ~ file: movie-list.component.ts ~ line 33 ~ MovieListComponent ~ this.http.get ~ this.imgPath", this.imgPath)
            })
            console.log("🚀 ~ file: movie-list.component.ts ~ line 30 ~ MovieListComponent ~ this.http.get ~ this.movieList", this.movieList)
        }
    });
  }
}
