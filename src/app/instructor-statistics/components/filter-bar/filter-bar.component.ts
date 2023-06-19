import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InstructorStatisticsFilterValues } from '../../model';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBarComponent implements OnInit {

  @Input() filterValues: InstructorStatisticsFilterValues|null = null;

  @Output() onFilter = new EventEmitter<InstructorStatisticsFilterValues>();

  form = this.fb.group({
    semesterNames: [[]],
    subjectCodes: [[]],
    subjectNames: [[]],
    teacherNames: [[]],
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  reset() {
    this.form.setValue({
      semesterNames: [],
      subjectCodes: [],
      subjectNames: [],
      teacherNames: [],
    });
  }

  submit() {
    this.onFilter.emit(this.form.value as InstructorStatisticsFilterValues);
  }

  useAll() {
    if (this.filterValues) {
      this.form.setValue(this.filterValues as any);
    }
  }

}
