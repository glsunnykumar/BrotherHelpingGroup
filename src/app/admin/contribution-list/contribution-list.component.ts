import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ContributionDialogComponent } from '../contribution-dialog/contribution-dialog.component';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-contribution-list',
  imports: [MatButtonModule],
  templateUrl: './contribution-list.component.html',
  styleUrl: './contribution-list.component.scss'
})
export class ContributionListComponent {
 contributions$!: Observable<any[]>;
  displayedColumns: string[] = ['contributorName', 'amount', 'date', 'notes', 'actions'];

  constructor(
    private dialog: MatDialog,
    private firestore: Firestore
  ) {}


   ngOnInit(): void {
    const contributionsRef = collection(this.firestore, 'contributions');
    this.contributions$ = collectionData(contributionsRef, { idField: 'id' }) as Observable<any[]>;
  }

  openContributionDialog(contribution?: any) {
    const dialogRef = this.dialog.open(ContributionDialogComponent, {
      width: '500px',
      data: contribution ? { contribution } : null
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const contributionsRef = collection(this.firestore, 'contributions');
        if (contribution) {
          // Update
          const docRef = doc(this.firestore, `contributions/${contribution.id}`);
          await updateDoc(docRef, result);
        } else {
          // Add
          await addDoc(contributionsRef, result);
        }
      }
    });
  }

  async deleteContribution(contribution: any) {
    const docRef = doc(this.firestore, `contributions/${contribution.id}`);
    await deleteDoc(docRef);
  }
}

