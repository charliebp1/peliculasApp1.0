import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Jsonp, Http } from "@angular/http";


@Injectable({
  providedIn: 'root'
})

export class PeliculasService {

  private apikey:string = "c6cd3a63f903252536cccb5ae16c309d";
  private urlMoviedb:string = "https://api.themoviedb.org/3";

  peliculas: any[] = [];

  constructor(private jsonp:Jsonp) { }

  getCartelera(){

    let desde = new Date();
    let hasta = new Date();

    hasta.setDate(hasta.getDate() + 7);

    let desdeStr = `${ desde.getFullYear() }-0${desde.getMonth()+2}-${ desde.getDate() }`;
    let hastaStr = `${ hasta.getFullYear() }-${ hasta.getMonth()+3}-${ hasta.getDate() }`;
    
    let url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;

   
    return this.jsonp.get(url)
                    .pipe(map(res => res.json().results));
  }
  
  
  
  
  getPopulares(){
    
    let url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get(url)
                    .pipe(map(res => res.json().results));
  }

  getPopularesNinos(){
    
    let url = `${ this.urlMoviedb }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get(url)
                    .pipe(map(res => res.json().results));
  }

  getPelicula(id: string){
    
    //let url = `https://api.themoviedb.org/3/movie/${id}?api_key=c6cd3a63f903252536cccb5ae16c309d&language=es&callback=JSONP_CALLBACK`;

    let url = `${ this.urlMoviedb }/movie/${id}?api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get(url)
                    .pipe(map(res => res.json()));
  }

  buscarPelicula( texto:string ){

    let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url )
                .pipe(map( res =>{
                    this.peliculas = res.json().results;
                    console.log(this.peliculas);
                    return res.json().results
                })
            );
  }
}
