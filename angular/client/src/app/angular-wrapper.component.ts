import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const window: any;

@Component({
  selector: 'app-angular-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; background: #f3e5f5; border-radius: 8px; margin: 20px 0;">
      <div #angularContainer></div>
      <div *ngIf="errorMessage" style="padding: 20px; background: #ffebee; color: #c62828; border-radius: 8px; margin-top: 20px;">
        <h3>❌ Error Loading Angular Remote</h3>
        <p>{{ errorMessage }}</p>
        <p>Make sure the Angular remote is running on http://localhost:61799</p>
      </div>
    </div>
  `,
})
export class AngularWrapperComponent implements OnInit {
  @ViewChild('angularContainer', { read: ElementRef, static: true }) 
  container!: ElementRef;
  
  errorMessage: string = '';

  async ngOnInit() {
    await this.loadAngularComponent();
  }

  private async loadAngularComponent() {
    try {
      // Simply load the remote app in an iframe for Angular-to-Angular
      // This is a simpler approach that avoids injection issues
      const iframe = document.createElement('iframe');
      iframe.src = 'http://localhost:61799';
      iframe.style.width = '100%';
      iframe.style.height = '400px';
      iframe.style.border = '2px solid #9c27b0';
      iframe.style.borderRadius = '8px';
      
      this.container.nativeElement.appendChild(iframe);
      
      console.log('✅ Angular remote loaded in iframe');
    } catch (error: any) {
      console.error('Error loading Angular component:', error);
      this.errorMessage = error.message || 'Unknown error occurred';
    }
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}
