import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from './Customer/Components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { SocialMediaComponent } from './Customer/Components/social-media/social-media.component';
import { MainComponent } from './Customer/main/main.component';
import { AboutUsComponent } from './Customer/about-us/about-us.component';
import { MissionComponent } from './Customer/about-us/mission/mission.component';
import { HistoryComponent } from './Customer/about-us/history/history.component';
import { TeamComponent } from './Customer/about-us/team/team.component';
import { DonorsAndPartnersComponent } from './Customer/about-us/donors-and-partners/donors-and-partners.component';
import { ActivityComponent } from './Customer/activity/activity.component';
import { ProjectsComponent } from './Customer/activity/projects/projects.component';
import { ServiceComponent } from './Customer/activity/service/service.component';
import { CoursesComponent } from './Customer/activity/courses/courses.component';
import { TrainingsAndSeminarsComponent } from './Customer/activity/trainings-and-seminars/trainings-and-seminars.component';
import { PublicationsComponent } from './Customer/publications/publications.component';
import { StudiesComponent } from './Customer/publications/studies/studies.component';
import { AccountsComponent } from './Customer/publications/accounts/accounts.component';
import { BlogsComponent } from './Customer/publications/blogs/blogs.component';
import { NewsletterComponent } from './Customer/publications/newsletter/newsletter.component';
import { GalleryComponent } from './Customer/gallery/gallery.component';
import { PhotosComponent } from './Customer/gallery/photos/photos.component';
import { VideosComponent } from './Customer/gallery/videos/videos.component';
import { ContactComponent } from './Customer/contact/contact.component';
import {CarouselModule} from 'primeng/carousel';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SocialMediaComponent,
    MainComponent,
    AboutUsComponent,
    MissionComponent,
    HistoryComponent,
    TeamComponent,
    DonorsAndPartnersComponent,
    ActivityComponent,
    ProjectsComponent,
    ServiceComponent,
    CoursesComponent,
    TrainingsAndSeminarsComponent,
    PublicationsComponent,
    StudiesComponent,
    AccountsComponent,
    BlogsComponent,
    NewsletterComponent,
    GalleryComponent,
    PhotosComponent,
    VideosComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    CarouselModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
