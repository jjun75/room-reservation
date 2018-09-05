import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { TimelineComponentModule } from './timeline/timeline.module';

@NgModule({
  declarations: [
  ],
  imports: [IonicModule],
  exports: [TimelineComponentModule]
})
export class ComponentsModule {}
