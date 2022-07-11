import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  template: string;
  templateParams: string;
  domain: boolean;
}

@Component({
  selector: 'project-dialog',
  templateUrl: './projectDialog.component.html',
  styleUrls: ['./projectDialog.component.css']
})
export class ProjectDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
