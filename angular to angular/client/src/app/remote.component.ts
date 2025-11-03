import { Component, OnInit } from '@angular/core';
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
      
      @if (messageFromHost) {
        <div style="margin: 20px 0; padding: 15px; background: #e8f5e9; border-radius: 8px; border: 2px solid #4caf50;">
          <h3 style="color: #2e7d32; margin: 0 0 10px 0;">📥 Message from Host:</h3>
          <p style="font-size: 18px; font-weight: bold; margin: 0;">{{ messageFromHost }}</p>
        </div>
      }
      
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
export class RemoteComponent implements OnInit {
  counter = 0;
  inputValue = '';
  messageFromHost = '';

  ngOnInit() {
    // Listen for messages from the parent (Angular host)
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.origin === 'http://localhost:4200' && event.data) {
        this.messageFromHost = event.data;
        console.log('✅ Angular Remote received from Host:', event.data);
      }
    });
  }

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
