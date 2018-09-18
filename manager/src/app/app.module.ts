import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WidgetComponent } from './widget/widget.component';
import { HeaderComponent } from './widget/header/header.component';
import { ContentComponent } from './widget/content/content.component';
import { DialogComponent } from './widget/content/dialog/dialog.component';
import { FormComponent } from './widget/content/form/form.component';
import { NavigationComponent } from './widget/content/navigation/navigation.component';
import { AlertComponent } from './widget/content/alert/alert.component';

import { WebSocketService } from './services/web-socket.service'

@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
    HeaderComponent,
    ContentComponent,
    DialogComponent,
    FormComponent,
    NavigationComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
