import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-remote',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div style="padding: 20px; background: #f3e5f5; border-radius: 8px; border: 2px solid #9c27b0;">
      <h2 style="color: #6a1b9a;">🎉 Angular Remote Component</h2>
      <p style="font-size: 16px;">This component is loaded via Module Federation from another Angular app!</p>
      <p style="margin-top: 20px; padding: 15px; background: white; border-radius: 4px; border-left: 4px solid #9c27b0;">
        <strong>Running on:</strong> Port 61799<br>
        <strong>Loaded by:</strong> Angular Host on Port 4200<br>
        <strong>Technology:</strong> Webpack Module Federation
      </p>
      
      <div style="margin-top: 20px;">
        <input 
          [(ngModel)]="inputValue" 
          placeholder="Enter a message for Angular Host"
          style="padding: 10px; font-size: 16px; width: 300px; margin-right: 10px; border-radius: 4px; border: 2px solid #9c27b0;"
        />
        <button
          (click)="sendToHost()"
          style="padding: 10px 20px; font-size: 16px; background-color: #9c27b0; border: none; border-radius: 4px; cursor: pointer; color: white;">
          Send to Host
        </button>
      </div>
      
      <div style="margin-top: 20px;">
        <button (click)="counter = counter + 1" 
                style="padding: 10px 20px; background: #7b1fa2; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
          Click Counter: {{ counter }}
        </button>
      </div>
    </div>
  `,
})
export class RemoteComponent {
  counter = 0;
  inputValue = '';

  sendToHost() {
    if (this.inputValue.trim()) {
      // Send message to parent window (Angular host)
      if (window.parent) {
        window.parent.postMessage(this.inputValue, 'http://localhost:4200');
        console.log('✅ Message sent to Angular host:', this.inputValue);
      }
      this.inputValue = '';
    }
  }
}
