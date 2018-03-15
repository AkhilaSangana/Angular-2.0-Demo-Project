import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import{MessageService} from './message.service';

import{ HttpClient,HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {

  heroes:Hero[];
  
 
 private heroesUrl = 'api/heroes';  // URL to web api

  constructor(public messageService:MessageService, private http:HttpClient ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe( 
      tap(heroes => this.log(`fetched heroes`)), 
      catchError(this.handleError('getHeroes', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`; /* backticks ( ` ) that define a JavaScript template literal for embedding the id */
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}


updateHero(hero:Hero):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.put(this.heroesUrl,hero,httpOptions)
  .pipe(
  tap(_=>this.log(`updated Hero: ${hero.id}`)),
  catchError(this.handleError<Hero>(`updated id=${hero.id}`))
); 
}

addHero(hero:Hero):Observable<Hero>{
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );

}

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add('HeroService: ' + message);
}

}
