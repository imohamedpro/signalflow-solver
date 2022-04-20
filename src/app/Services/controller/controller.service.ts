import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private readonly apiUrl = "http://localhost:8082"

  constructor(private http: HttpClient) { }

  config = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  addNode() {
    return this.http.get<number>(this.apiUrl + "/node/add", this.config)
  }

  deleteNode(id: number) {
    return this.http.put(this.apiUrl + "/node/delete", id, this.config)
  }

  addEdge(fromNode: number, toNode: number, gain: number) { 
    let conf = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params:  new HttpParams().append("fromNodeID", fromNode)
                               .append("toNodeID", toNode)
                               .append("gain", gain)
    }
    return this.http.put<number>(this.apiUrl + "/edge/add", null, conf)
  }

  reverseEdge(id: number) {
    return this.http.put(this.apiUrl + "/edge/reverse", id, this.config)
  }

  updateGain(id: number, gain: number){
    let conf = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params:  new HttpParams().append("id", id)
                               .append("gain", gain)
    }
    return this.http.put<number>(this.apiUrl + "/edge/gain", null, conf)
  }

  deleteEdge(id: number) {
    return this.http.put(this.apiUrl + "/edge/delete", id, this.config)
  }

  solve(sourceID: number, destID: number) {
    let params = new HttpParams().append("sourceID", sourceID).append("destID", destID);
    let conf = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: params
    }
    return this.http.get(this.apiUrl + "/result", conf)
  }

  clear() {
    return this.http.put(this.apiUrl + "/clear", null, this.config)
  }

}