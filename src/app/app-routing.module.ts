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

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'about-us', component: AboutUsComponent, children: [
    { path: "mission",component: MissionComponent},
    { path: "history",component: HistoryComponent},
    { path: "team",component: TeamComponent},
    { path: "donors-and-partners",component: DonorsAndPartnersComponent},
  ]},
  {path: 'activity', component: ActivityComponent, children: [
    { path: "courses",component: CoursesComponent},
    { path: "projects",component: ProjectsComponent},
    { path: "service",component: ServiceComponent},
    { path: "trainings-and-seminars",component:TrainingsAndSeminarsComponent},
  ]},
  {path: 'publications', component: PublicationsComponent, children: [
    { path: "accounts",component: AccountsComponent},
    { path: "blogs",component: BlogsComponent},
    { path: "newsletter",component: NewsletterComponent},
    { path: "studies",component: StudiesComponent},
  ]},
  {path: 'gallery', component: GalleryComponent, children: [
    { path: "photos",component: PhotosComponent},
    { path: "videos",component: VideosComponent},
  ]},
  {path: 'contact', component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
