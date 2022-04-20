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

  addNode(): Observable<number> {
    return this.http.get<number>(this.apiUrl + "/node/add", this.config);
  }

  deleteNode(nodeID: number) {
    let queryParams = new HttpParams().append('nodeID', nodeID);
    return this.http.delete(this.apiUrl + "/node/delete", { params: queryParams });
  }

  addEdge(fromNodeID: number, toNodeID: number, gain: number) {
    let queryParams = new HttpParams().append("fromNodeID", fromNodeID)
                                      .append("toNodeID", toNodeID)
                                      .append("gain", gain);
    return this.http.get<number>(this.apiUrl + "/edge/add", { params: queryParams });
  }

  reverseEdge(edgeID: number) {
    let queryParams = new HttpParams().append('edgeID', edgeID);
    return this.http.put(this.apiUrl + "/edge/reverse", null, { params: queryParams });
  }

  updateGain(edgeID: number, gain: number) {
    let queryParams = new HttpParams().append("edgeID", edgeID)
                                      .append("gain", gain);
    return this.http.put(this.apiUrl + "/edge/gain", null, { params: queryParams });
  }

  deleteEdge(edgeID: number) {
    let queryParams = new HttpParams().append("edgeID", edgeID);
    return this.http.delete(this.apiUrl + "/edge/delete", { params: queryParams });
  }

  solve(inputNodeID: number, outputNodeID: number): Observable<string> {
    let queryParams = new HttpParams().append("inputNodeID", inputNodeID)
                                      .append("outputNodeID", outputNodeID);
    return this.http.get<string>(this.apiUrl + "/result", { params: queryParams });
  }

  clear() {
    return this.http.put(this.apiUrl + "/clear", null, this.config);
  }

}