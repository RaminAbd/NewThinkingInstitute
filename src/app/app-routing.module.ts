import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Customer/main/main.component';
import { AboutUsComponent } from './Customer/about-us/about-us.component';
import { MissionComponent } from './Customer/about-us/mission/mission.component';
import { HistoryComponent } from './Customer/about-us/history/history.component';
import { TeamComponent } from './Customer/about-us/team/team.component';
import { DonorsAndPartnersComponent } from './Customer/about-us/donors-and-partners/donors-and-partners.component';
import { ActivityComponent } from './Customer/activity/activity.component';
import { CoursesComponent } from './Customer/activity/courses/courses.component';
import { ProjectsComponent } from './Customer/activity/projects/projects.component';
import { ServiceComponent } from './Customer/activity/service/service.component';
import { TrainingsAndSeminarsComponent } from './Customer/activity/trainings-and-seminars/trainings-and-seminars.component';
import { PublicationsComponent } from './Customer/publications/publications.component';
import { AccountsComponent } from './Customer/publications/accounts/accounts.component';
import { BlogsComponent } from './Customer/publications/blogs/blogs.component';
import { NewsletterComponent } from './Customer/publications/newsletter/newsletter.component';
import { StudiesComponent } from './Customer/publications/studies/studies.component';
import { GalleryComponent } from './Customer/gallery/gallery.component';
import { PhotosComponent } from './Customer/gallery/photos/photos.component';
import { VideosComponent } from './Customer/gallery/videos/videos.component';
import { ContactComponent } from './Customer/contact/contact.component';
import { NewsDetailComponent } from './Customer/news/news-detail/news-detail.component';
import { DetailInfoComponent } from './Customer/activity/detail-info/detail-info.component';
import { ProjectsDetailComponent } from './Customer/activity/projects/projects-detail/projects-detail.component';
import { AdminComponent } from './Admin/admin.component';
import { NewsComponent } from './Customer/news/news.component';
import { AdminNewsComponent } from './Admin/Pages/news/news.component';
// import { NewsComponent } from './Admin/Pages/news/news.component';
import { AdminBlogsComponent } from './Admin/Pages/blogs/blogs.component';
import { AdminBlogUpsertComponent } from './Admin/Pages/blogs/upsert/upsert.component';
import { AdminNewsUpsertComponent } from './Admin/Pages/news/upsert/upsert.component';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'news-detail', component: NewsDetailComponent},
  {path: 'about-us', component: AboutUsComponent,children: [
    { path: "mission",component: MissionComponent},
    { path: "history",component: HistoryComponent},
    { path: "team",component: TeamComponent},
    { path: "donors-and-partners",component: DonorsAndPartnersComponent},

  ]},
  {path: 'activity', component: ActivityComponent, children: [
    { path: "courses",component: CoursesComponent},
    { path: "projects",component: ProjectsComponent},
    { path: "projects-detail",component: ProjectsDetailComponent},
    { path: "service",component: ServiceComponent},
    { path: "trainings-and-seminars",component:TrainingsAndSeminarsComponent},
    { path: "detail-info",component: DetailInfoComponent},
  ]},
  {path: 'publications', component: PublicationsComponent, children: [
    { path: "accounts",component: AccountsComponent},
    { path: "blogs",component: BlogsComponent},
    { path: "newsletter",component: NewsletterComponent},
    { path: "studies",component: StudiesComponent},
    { path: "news",component: NewsComponent},
  ]},
  {path: 'gallery', component: GalleryComponent, children: [
    { path: "photos",component: PhotosComponent},
    { path: "videos",component: VideosComponent},
  ]},

  {path: 'contact', component: ContactComponent},
  {path: '', component: MainComponent},

  {path: 'admin', component: AdminComponent, children:[
    {path: 'news', component: AdminNewsComponent},
    {path: 'news-item/:id', component: AdminNewsUpsertComponent},
    {path: 'blogs', component: AdminBlogsComponent},
    {path: 'blog/:id', component: AdminBlogUpsertComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
