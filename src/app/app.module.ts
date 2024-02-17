import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';

// Store -- https://betterprogramming.pub/angular-state-management-with-ngxs-8b17719def29
// https://dev.to/siddheshthipse/beginner-s-guide-of-state-management-using-ngxs-35dn
// Style Guide: https://www.ngxs.io/recipes/style-guide
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextComponent } from './text/text.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { StatsComponent } from './stats/stats.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { ErrorDataState } from './state/errorData.state';
import { StatsState } from './state/stats.state';
import { KeyboardState } from './state/keyboard.state';

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    KeyboardComponent,
    StatsComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // UI
    MatSlideToggleModule,
    MatProgressBarModule,
    MatChipsModule,
    MatToolbarModule,
    // Store
    NgxsModule.forRoot([ErrorDataState, StatsState, KeyboardState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
