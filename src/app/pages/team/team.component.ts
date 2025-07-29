import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberService } from '../../services/member/member.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MemberdetailmodalComponent } from '../memberdetailmodal/memberdetailmodal.component';
import { GlobalLoaderComponent } from '../../shared/global-loader/global-loader.component';

@Component({
  selector: 'app-team',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    GlobalLoaderComponent,
  ],

  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  members: any[] = [];
  filteredMembers: any[] = [];
  searchTerm = '';

  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20];
  totalPages = 1;
  isLoading: boolean = false;

  constructor(private memberService: MemberService, private dialog: MatDialog) {
    this.getAllMembers();
  }

  getAllMembers() {
    this.isLoading = true;
    this.memberService.getActiveMembers().subscribe({
      next: (data) => {
        console.log('loading members');
        this.members = data;
        this.filteredMembers = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load members', err);
        this.isLoading = false;
      },
    });
  }

  getMembershipEmoji(membership: number): string {
    if (membership === 300) return '🪙';
    if (membership === 500) return '💎';
    if (membership === 1000) return '👑';
    return '✨';
  }

  openMemberModal(member: any): void {
    this.dialog.open(MemberdetailmodalComponent, {
      width: '400px',
      data: member,
    });
  }
  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return this.startIndex + this.pageSize;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  applySearch(): void {
    this.currentPage = 1;
    this.filteredMembers = this.members.filter(
      (member) =>
        member.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.address?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Add this if you want real-time search:
  ngOnChanges() {
    this.applySearch();
  }
}
