import { Component } from '@angular/core';

@Component({
  selector: 'app-remote',
  standalone: true,
  imports: [],
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
        <button (click)="counter = counter + 1" 
                style="padding: 10px 20px; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
          Click Me! ({{ counter }})
        </button>
      </div>
    </div>
  `,
})
export class RemoteComponent {
  counter = 0;
}
