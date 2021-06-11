//BUILT-IN MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//3RD PARTY PACKAGE MODULE
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

//APP-ROOT COMPONENT
import { AppComponent } from './app.component';

//CUSTOM COMPONENTS
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { LoginComponent } from './components/login/login.component';

//MODAL COMPONENTS
import { DetailsModalComponent } from './modals/details-modal/details-modal.component';
import { EmployeeDeleteModalComponent } from './modals/employee-delete-modal/employee-delete-modal.component';

//SERVICES
import { DataService } from './services/data.service';
import { ToastService } from './services/toast.service';
import { ModalService } from './services/modal.service';
import { AuthenticationService } from './services/authentication.service';

//PIPES
import { FilterPipe } from './pipes/filter.pipe';

//GUARDS
import { AuthGuard } from './guards/auth.guard';

//INTERCEPTOR SERVICES
import { TokenInterceptorService } from './interceptor/token-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EditEmployeeComponent,
    PageNotFoundComponent,
    ToasterComponent,
    DetailsModalComponent,
    EmployeeDeleteModalComponent,
    LoginComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule

  ],
  providers: [
    DataService,
    ToastService,
    ModalService,
    AuthenticationService,
    AuthGuard,
    TokenInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
