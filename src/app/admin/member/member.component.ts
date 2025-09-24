import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MemberComponent } from '../../pages/member/member/member.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-member',
  imports: [
    MatIconModule,
    MatTableModule ,
    MatButtonModule
  ],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class AddMemberComponent {

   members: any[] = [];
  displayedColumns: string[] = ['profile', 'name', 'fName', 'contactNumber', 'membership', 'actions'];

  constructor(private dialog: MatDialog) {}

  openMemberDialog(member?: any) {
    const dialogRef = this.dialog.open(MemberComponent, {
      width: '500px',
      data: member ? { member } : null
    });

       dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (member) {
          // Update existing member
          const index = this.members.findIndex(m => m.id === member.id);
          this.members[index] = { ...this.members[index], ...result };
        } else {
          // Add new member
          this.members.push({ id: Date.now(), ...result });
        }
      }
    });
  }

    deleteMember(member: any) {
    this.members = this.members.filter(m => m.id !== member.id);
  }

}

