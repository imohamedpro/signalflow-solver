import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InfoComponent } from './Components/info/info.component';
import { HomeComponent } from './Components/home/home.component';
import { ToolbarComponent } from './Components/toolbar/toolbar.component';
import { SketchComponent } from './Components/sketch/sketch.component';
import { HttpClientModule } from '@angular/common/http';
import { QueueComponent } from './Components/queue/queue.component';
import { MachineComponent } from './Components/machine/machine.component';
import { EdgeComponent } from './Components/edge/edge.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    HomeComponent,
    ToolbarComponent,
    SketchComponent,
    QueueComponent,
    MachineComponent,
    EdgeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
