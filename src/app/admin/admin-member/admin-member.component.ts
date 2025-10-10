import { Component, inject } from '@angular/core';
import { ReusableTableComponent } from "../reusable-table/reusable-table.component";
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { MemberService } from '../../services/member/member.service';
import { Router } from '@angular/router';
import { MemberComponent } from '../../pages/member/member/member.component';
import { AddMemberComponent } from '../member/member.component';

@Component({
  selector: 'app-admin-member',
  imports: [
    ReusableTableComponent,
     MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatDividerModule,
        ReusableTableComponent,
  ],
  templateUrl: './admin-member.component.html',
  styleUrl: './admin-member.component.scss'
})
export class AdminMemberComponent {
    members: any[] = [];
  isLoading = true;
  displayedColumns: string[] = [
    'profile',
    'name',
    'fName',
    'contactNumber',
    'membership',
    'actions',
  ];

     private router = inject(Router);
   constructor(private memberService: MemberService, private dialog: MatDialog) {
      this.getAllMembers();
    }
  
    getAllMembers() {
      this.isLoading = true;
      this.memberService.getActiveMembers().subscribe({
        next: (data) => {
          console.log('loading members');
          this.members = data;
          // this.filteredMembers = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load members', err);
          this.isLoading = false;
        },
      });
    }
  
    openMemberEditDialog(id: string) {
      const member = this.members.find((m) => m.id === id);
  
      const dialogRef = this.dialog.open(AddMemberComponent, {
        width: '500px',
        data: { member },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const index = this.members.findIndex((m) => m.id === id);
          this.members[index] = { ...this.members[index], ...result };
        }
      });
    }
  
    openMemberDialog(member?: any) {
      const dialogRef = this.dialog.open(MemberComponent, {
        width: '500px',
        data: member ? { member } : null,
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          if (member) {
            // Update existing member
            const index = this.members.findIndex((m) => m.id === member.id);
            this.members[index] = { ...this.members[index], ...result };
          } else {
            // Add new member
            this.members.push({ id: Date.now(), ...result });
          }
        }
      });
    }
  
    // openMemberForm(member?: any) {
    //   this.router.navigate(['/admin/member', member.id]);
    // }

    openMemberForm(member: any) {
        const dialogRef = this.dialog.open(AddMemberComponent, {
          width: '400px',
          data: member,
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 'updated') {
            // Refresh list or show snackbar
            //this.fetchRequests(); // example refresh method
          }
        });
      }

    deleteMember(member: any) {
      this.members = this.members.filter((m) => m.id !== member.id);
    }
}
