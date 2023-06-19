import { Component, Input, OnInit } from '@angular/core';
import { SurvivalStatistic } from '../../models.';

@Component({
  selector: 'app-stat-results',
  templateUrl: './stat-results.component.html',
  styleUrls: ['./stat-results.component.scss']
})
export class StatResultsComponent implements OnInit {

  @Input() stats: SurvivalStatistic|null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
