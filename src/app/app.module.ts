import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from './Customer/Components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
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
import { CarouselModule } from 'primeng/carousel';
import { FooterComponent } from './Customer/Components/footer/footer.component';
import { NewsComponent } from './Customer/news/news.component';
import { NewsDetailComponent } from './Customer/news/news-detail/news-detail.component';
import { ShortNewsComponent } from './Customer/news/short-news/short-news.component';
import { DetailHeaderComponent } from './Customer/Components/detail-header/detail-header.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons'
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { DetailInfoComponent } from './Customer/activity/detail-info/detail-info.component';
import { ProjectsDetailComponent } from './Customer/activity/projects/projects-detail/projects-detail.component'
import { AdminComponent } from './Admin/admin.component';
import { SidebarComponent } from './Admin/Components/sidebar/sidebar.component';
import { AdminBlogsComponent } from './Admin/Pages/blogs/blogs.component';
import { CalendarModule } from 'primeng/calendar';
import { AdminBlogUpsertComponent } from './Admin/Pages/blogs/upsert/upsert.component';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast";
import { AdminNewsUpsertComponent } from './Admin/Pages/news/upsert/upsert.component';
import { AdminNewsComponent } from './Admin/Pages/news/news.component';
import { TabViewModule } from 'primeng/tabview';
import { AdminGalleryComponent } from './Admin/Pages/gallery/gallery.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateVideoComponent } from './Admin/Pages/gallery/create-video/create-video.component';
import { AdminProjectsComponent } from './Admin/Pages/projects/projects.component';
import { AdminProjectsUpsertComponent } from './Admin/Pages/projects/upsert/upsert.component';
import { DropdownModule } from 'primeng/dropdown';
import { StatusesComponent } from './Admin/Pages/statuses/statuses.component';
import { CreateStatusComponent } from './Admin/Pages/statuses/create-status/create-status.component';
import { AdminCoursesUpsertComponent } from './Admin/Pages/courses/upsert/upsert.component';
import { AdminCoursesComponent } from './Admin/Pages/courses/courses.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AdminTrainingsComponent } from './Admin/Pages/trainings/trainings.component';
import { AdminTrainingsUpsertComponent } from './Admin/Pages/trainings/upsert/upsert.component';
import { AdminServiceUpsertComponent } from './Admin/Pages/service/upsert/upsert.component';
import { AdminServiceComponent } from './Admin/Pages/service/service.component';
import { AdminPartnersComponent } from './Admin/Pages/partners/partners.component';
import { AdminRequestsComponent } from './Admin/Pages/requests/requests.component';
import { LoginComponent } from './Auth/login/login.component';
import { tokenInterceptor } from './Auth/TokenInterceptor';
import { RefreshTokenInterceptor } from './Auth/RefreshTokenInterceptor';
import { PaginationComponent } from './Customer/Components/pagination/pagination.component';
import { AdminTeamUpsertComponent } from './Admin/Pages/team/upsert/upsert.component';
import { AdminTeamComponent } from './Admin/Pages/team/team.component';
import { BlogsDetailComponent } from './Customer/publications/blogs/blogs-detail/blogs-detail.component';
import { AdminAccountsUpsertComponent } from './Admin/Pages/accounts/upsert/upsert.component';
import { AdminAccountsComponent } from './Admin/Pages/accounts/accounts.component';
import { AccountsDetailComponent } from './Customer/publications/accounts/accounts-detail/accounts-detail.component';
import { AdminResearchComponent } from './Admin/Pages/research/research.component';
import { AdminResearchUpsertComponent } from './Admin/Pages/research/upsert/upsert.component';
import { AdminNewsletterUpsertComponent } from './Admin/Pages/newsletter/upsert/upsert.component';
import { AdminNewsletterComponent } from './Admin/Pages/newsletter/newsletter.component';
import {EditorModule} from 'primeng/editor';
import { SearchResultComponent } from './Customer/search-result/search-result.component';
import { HtmldecoderPipe } from './Models/HtmldecoderPipe.pipe';
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
    HtmldecoderPipe,
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
    ContactComponent,
    FooterComponent,
    NewsComponent,
    NewsDetailComponent,
    ShortNewsComponent,
    DetailHeaderComponent,
    DetailInfoComponent,
    ProjectsDetailComponent,
    AdminComponent,
    SidebarComponent,
    AdminBlogsComponent,
    AdminNewsComponent,
    AdminBlogUpsertComponent,
    AdminNewsUpsertComponent,
    AdminGalleryComponent,
    CreateVideoComponent,
    AdminProjectsComponent,
    AdminProjectsUpsertComponent,
    StatusesComponent,
    CreateStatusComponent,
    AdminCoursesComponent,
    AdminCoursesUpsertComponent,
    AdminServiceComponent,
    AdminServiceUpsertComponent,
    AdminTrainingsComponent,
    AdminTrainingsUpsertComponent,
    AdminPartnersComponent,
    AdminRequestsComponent,
    LoginComponent,
    PaginationComponent,
    AdminTeamComponent,
    AdminTeamUpsertComponent,
    BlogsDetailComponent,
    AdminAccountsUpsertComponent,
    AdminAccountsComponent,
    AccountsDetailComponent,
    AdminResearchComponent,
    AdminResearchUpsertComponent,
    AdminNewsletterUpsertComponent,
    AdminNewsletterComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ProgressSpinnerModule,
    HttpClientModule,
    ToastModule,
    EditorModule,
    MatDialogModule,
    FormsModule,
    DropdownModule,
    ConfirmPopupModule,
    CalendarModule,
    InputSwitchModule,
    TabViewModule,
    TableModule,
    MatMenuModule,
    ShareButtonsModule.withConfig({ debug: true }),
    ShareIconsModule,
    CarouselModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },

    })
  ],
  providers: [
    ConfirmationService,
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
