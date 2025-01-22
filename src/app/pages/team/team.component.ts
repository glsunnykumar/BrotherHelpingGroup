import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
   // Expose Math to the template
   Math = Math;
 // Array of team members
 teamMembers = Array.from({ length: 50 }, (_, i) => ({
  name: `Member ${i + 1}`,
  role: `Role ${i % 10 + 1}`, // Simulate multiple roles
  photo: `https://i.pravatar.cc/150?img=${i + 1}` // Example random profile pictures
}));

 // Filtered team members (for search functionality)
 filteredMembers = [...this.teamMembers];

 // Pagination variables
 currentPage = 1;
 pageSize = 20;

  // Getter for paginated members
  get paginatedMembers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredMembers.slice(startIndex, startIndex + this.pageSize);
  }

   // Search functionality
   search(query: string) {
    const lowerQuery = query.toLowerCase();
    this.filteredMembers = this.teamMembers.filter(member =>
      member.name.toLowerCase().includes(lowerQuery)
    );
    this.currentPage = 1; // Reset to the first page after search
  }

  // Pagination controls
  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredMembers.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
