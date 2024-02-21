import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationComponent,
    AddTaskComponent,
    CustomDropdownComponent,
    TaskComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
