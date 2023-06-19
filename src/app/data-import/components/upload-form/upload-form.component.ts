import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImportResult } from '../../models';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFormComponent implements OnInit {

  private _uploadedFile$ = new BehaviorSubject<File|null>(null);

  @ViewChild('fileInput', { read: ElementRef })
  fileInput?: ElementRef<HTMLInputElement>;

  @Output()
  onUpload = new EventEmitter<File|null>();

  @Input()
  loading = false;

  @Input()
  importResult: ImportResult|null = null;

  vm$ = combineLatest([
    this._uploadedFile$
  ]).pipe(
    map(([ uploadedFile ]) => ({ uploadedFile }))
  )

  constructor() { }

  ngOnInit(): void {
  }

  onFileUploaded(event: Event) {
    this._uploadedFile$.next((event.target as HTMLInputElement).files?.item(0) || null);
  }

  removeFile() {
    this._uploadedFile$.next(null);
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

}
