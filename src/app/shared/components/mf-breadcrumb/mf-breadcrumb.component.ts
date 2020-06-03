import { Component, OnInit, Input } from '@angular/core';

import { Breadcrumb } from '../../../interfaces/breadcrumb.interface';

@Component({
  selector: 'mf-breadcrumb',
  templateUrl: './mf-breadcrumb.component.html',
  styleUrls: ['./mf-breadcrumb.component.scss']
})
export class MfBreadCrumbComponent {

  @Input()
  breadcrumbs: Breadcrumb[];
}
