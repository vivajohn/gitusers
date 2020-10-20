import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityChartComponent } from './activity-chart/activity-chart.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [UserDetailsComponent, ActivityChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserDetailsRoutingModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    ChartsModule,
  ]
})
export class UserDetailsModule { }
