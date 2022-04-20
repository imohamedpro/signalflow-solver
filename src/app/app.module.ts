import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { ToolbarComponent } from './Components/toolbar/toolbar.component';
import { SketchComponent } from './Components/sketch/sketch.component';
import { HttpClientModule } from '@angular/common/http';
import { NodeComponent } from './Components/node/node.component';
import { EdgeComponent } from './Components/edge/edge.component';
import { FormsModule } from '@angular/forms';
import { AnswerComponent } from './Components/answer/answer.component';
import { SymbolsTableComponent } from './Components/symbols-table/symbols-table.component';
import { KatexModule } from 'ng-katex';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    SketchComponent,
    NodeComponent,
    EdgeComponent,
    AnswerComponent,
    SymbolsTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    KatexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
