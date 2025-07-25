import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberService } from '../../services/member/member.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule
  ],

  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
    members: any[] = [];
  filteredMembers: any[] = [];
  searchTerm = '';

  pageSize = 4;
  currentPage = 1;

     constructor(private memberService: MemberService) {
       this.memberService.getMembers().subscribe((data) => {
      this.members = data;
      this.applySearch();
    });
     }
 get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return this.startIndex + this.pageSize;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredMembers.length / this.pageSize);
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
    this.filteredMembers = this.members.filter(member =>
      (member.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       member.address?.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  // Add this if you want real-time search:
  ngOnChanges() {
    this.applySearch();
  }  


}
