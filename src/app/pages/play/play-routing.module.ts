import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayPage } from './play.page';


const routes: Routes = [
  {
    path: '',
    component: PlayPage,
    children: [
      {
        path: 'summary/:id',
        loadChildren: () => import('./home-summary/home-summary.module').then(m => m.HomeSummaryPageModule)
      },
      {
        path: 'summary',
        loadChildren: () => import('./home-summary/home-summary.module').then(m => m.HomeSummaryPageModule)
      },
      {
        path: 'fullschedule/:id',
        loadChildren: () => import('./home-fullschedule/home-fullschedule.module').then(m => m.HomeFullschedulePageModule)
      },
      {
        path: 'fullschedule',
        loadChildren: () => import('./home-fullschedule/home-fullschedule.module').then(m => m.HomeFullschedulePageModule)
      },
      {
        path: 'fullhistory/:id',
        loadChildren: () => import('./home-fullhistory/home-fullhistory.module').then(m => m.HomeFullhistoryPageModule)
      },
      {
        path: 'fullhistory',
        loadChildren: () => import('./home-fullhistory/home-fullhistory.module').then(m => m.HomeFullhistoryPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./browse-users/browse-users.module').then( m => m.BrowseUsersPageModule)
      },
      {
        path: 'activities',
        loadChildren: () => import('./activities/activities.module').then( m => m.ActivitiesPageModule)
      },
      {
        path: 'activity-details/:id',
        loadChildren: () => import('./activity-details/activity-details.module').then( m => m.ActivityDetailsPageModule)
      },
      {
        path: 'activity-form',
        loadChildren: () => import('./activity-form/activity-form.module').then( m => m.ActivityFormPageModule)
      },
      {
        path: 'activity-form/:id',
        loadChildren: () => import('./activity-form/activity-form.module').then( m => m.ActivityFormPageModule)
      },
      {
        path: 'scores-form/:id',
        loadChildren: () => import('./scores-form/scores-form.module').then( m => m.ScoresFormPageModule)
      },
      {
        path: 'ranking-xp',
        loadChildren: () => import('./ranking-xp/ranking-xp.module').then( m => m.RankingXpPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
      },
      {
        path: 'superadmin-admins',
        loadChildren: () => import('./superadmin-admins/superadmin-admins.module').then( m => m.SuperadminAdminsPageModule)
      },
      {
        path: 'superadmin-xp',
        loadChildren: () => import('./superadmin-xp/superadmin-xp.module').then( m => m.SuperadminXpPageModule)
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayPageRoutingModule {}