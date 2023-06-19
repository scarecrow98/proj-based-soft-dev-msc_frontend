import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { InstructorStatisticsItem, InstructorStatisticsResults } from '../../model';

@Component({
  selector: 'app-stat-results',
  templateUrl: './stat-results.component.html',
  styleUrls: ['./stat-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatResultsComponent implements OnInit {

  @Input() results: InstructorStatisticsResults|null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
