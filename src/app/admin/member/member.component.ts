import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MemberComponent } from '../../pages/member/member/member.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member/member.service';
import { MatDividerModule } from '@angular/material/divider';
import { ReusableTableComponent } from "../reusable-table/reusable-table.component";

@Component({
  selector: 'app-member',
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    ReusableTableComponent
],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class AddMemberComponent {

  members: any[] = [];
  isLoading = true;
  displayedColumns: string[] = ['profile', 'name', 'fName', 'contactNumber', 'membership', 'actions'];
   private router = inject(Router);

  constructor(private memberService: MemberService,
    private dialog: MatDialog) {
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

  openMemberEditDialog(id : string){
    const member = this.members.find(m => m.id === id);

  const dialogRef = this.dialog.open(MemberComponent, {
    width: '500px',
    data: { member }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const index = this.members.findIndex(m => m.id === id);
      this.members[index] = { ...this.members[index], ...result };
    }
  });
  }

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

  

   openMemberForm(blog?: any) {
    this.router.navigate(['/admin/add-member', blog.id]);
  }
    deleteMember(member: any) {
    this.members = this.members.filter(m => m.id !== member.id);
  }

}

