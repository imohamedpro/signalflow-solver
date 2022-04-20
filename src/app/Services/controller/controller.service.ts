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
    return this.http.put<number>(this.apiUrl + "/node/add", null, this.config)
  }

  deleteNode(nodeID: number): Observable<Array<number>> {
    let queryParams = new HttpParams().append('nodeID', nodeID);
    return this.http.delete<Array<number>>(this.apiUrl + "/node/delete", { params: queryParams });
  }

  addEdge(gain: number) {
    let queryParams = new HttpParams().append("gain", gain);
    return this.http.put<number>(this.apiUrl + "/edge/add", { params: queryParams });
  }

  editEdgeGain(edgeID: number, gain: number) {
    let queryParams = new HttpParams().append("edgeID", edgeID).append("gain", gain);
    return this.http.put<number>(this.apiUrl + "/edge/editGain", null, { params: queryParams });
  }

  deleteEdge(edgeID: number) {
    let queryParams = new HttpParams().append("edgeID", edgeID);
    return this.http.delete(this.apiUrl + "/edge/delete", { params: queryParams });
  }

  solve(inputNodeID: number, outputNodeID: number): Observable<string> {
    let queryParams = new HttpParams().append("inputNodeID", inputNodeID).append("outputNodeID", outputNodeID);
    return this.http.get<string>(this.apiUrl + "/solve", { params: queryParams });
  }

  clear() {
    return this.http.put(this.apiUrl + "/clear", null, this.config);
  }

}