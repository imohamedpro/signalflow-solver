import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private readonly apiUrl = "http://localhost:8082"

  constructor(private http: HttpClient) { }

  getServerSentEvent(): Observable<any>{
    return new Observable(observer => {
      const eventSource = new EventSource(this.apiUrl + "/stream");
      eventSource.addEventListener("TEXT", function(e){
        observer.next(e);
      })
    })
  }

  config = {headers: new HttpHeaders().set('Content-Type', 'application/json')} //used in requests

  addMachine(){
    return this.http.put(this.apiUrl + "/machine/add", null, this.config)
  }

  deleteMachine(id: number){
    return this.http.put(this.apiUrl + "/machine/delete", id, this.config)
  }

  addQueue(){
    return this.http.put(this.apiUrl + "/queue/add", null, this.config)
  }

  deleteQueue(id: number){
    return this.http.put(this.apiUrl + "/queue/delete", id, this.config)
  }

  removeInput(machineID: number, queueID: number){
    let params = new HttpParams().append("machineID", machineID).append("queueID", queueID);
    let conf = {headers: new HttpHeaders().set('Content-Type', 'application/json'),
                params: params}
    return this.http.put(this.apiUrl + "/remove/input", null, conf)
  }

  removeOutput(machineID: number){
    let params = new HttpParams().append("machineID", machineID);
    let conf = {headers: new HttpHeaders().set('Content-Type', 'application/json'),
                params: params}
    return this.http.put(this.apiUrl + "/remove/input", null, conf)
  }

  start(){
    return this.http.put(this.apiUrl + "/start", null, this.config)
  }

  stop(){
    return this.http.put(this.apiUrl + "/stop", null, this.config)
  }

  restart(){
    return this.http.put(this.apiUrl + "/restart", null, this.config)
  }
}
