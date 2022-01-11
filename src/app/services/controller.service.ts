import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private readonly apiUrl = "http://localhost:3455"

  constructor() { }

  getServerSentEvent(): Observable<any>{
    return new Observable(observer => {
      const eventSource = new EventSource(this.apiUrl + "/stream-sse");
      eventSource.addEventListener("TEXT", function(e){
        observer.next(e);
      })
    })
  }

  config = {headers: new HttpHeaders().set('Content-Type', 'application/json')} //used in post requests




}
