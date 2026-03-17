import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EventService } from '../event.service';

@Component({
  selector: 'app-add-edit-event',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-edit-event.component.html',
  styleUrl: './add-edit-event.component.scss',
})
export class AddEditEventComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);

  // Event ID (for edit mode)
  eventId: string | null = null;

  // Image preview
  previewImage: string | null = null;

  // Selected file
  selectedFile!: File;

  // Loading state
  isLoading = false;

  eventForm = this.fb.group({
    title: ['', Validators.required],
    eventDate: ['', Validators.required],
    location: ['', Validators.required],
    sponsor: [''],
    videoUrl: [''],
    description: [''],
    imageUrl: [''],
  });

  async ngOnInit() {
    // Get ID from route
    this.eventId = this.route.snapshot.paramMap.get('id');

    // If editing → load event
    if (this.eventId) {
      this.isLoading = true;

      const eventData: any = await this.eventService.getEventById(this.eventId);

      if (eventData) {
        this.eventForm.patchValue({
          title: eventData.title,
          eventDate: eventData.eventDate,
          location: eventData.location,
          sponsor: eventData.sponsor,
          videoUrl: eventData.videoUrl,
          description: eventData.description,
        });

        this.previewImage = eventData.imageUrl;
      }
      this.isLoading = false;
    }
  }

  // Handle file upload
  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.previewImage = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  // Submit form
  async submit() {
    if (this.eventForm.invalid) return;

    this.isLoading = true;

    let imageUrl = this.previewImage;

    // Upload new image if selected
    if (this.selectedFile) {
      imageUrl = await this.eventService.uploadImage(this.selectedFile);
    }
    const data = {
      title: this.eventForm.value.title ?? '',
      eventDate: this.eventForm.value.eventDate ?? '',
      location: this.eventForm.value.location ?? '',
      sponsor: this.eventForm.value.sponsor ?? '',
      videoUrl: this.eventForm.value.videoUrl ?? '',
      description: this.eventForm.value.description ?? '',
      imageUrl: imageUrl ?? '',
      createdAt: new Date(),
    };

    try {
      if (this.eventId) {
        await this.eventService.updateEvent(this.eventId, data);
      } else {
        await this.eventService.addEvent(data);
      }

      this.router.navigate(['/admin/events']);
    } catch (error) {
      console.error('Error saving event:', error);
    }

    this.isLoading = false;
  }
}
