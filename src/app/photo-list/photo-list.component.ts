import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  photos: any[] = [];
  error: string | null = null;
  currentPage = 1;
  totalPages = 50;
  pageSize = 10;
  sortBy = 'title';
  order = 'asc';

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.photoService.getPhotos(this.currentPage, this.pageSize).subscribe(
      data => {
        this.photos = data;
      },
      error => {
        this.error = 'Failed to load photos';
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPhotos();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPhotos();
    }
  }


}
