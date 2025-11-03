import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'client';
  messageFromReact = '';
  messageFromAngularRemote = '';
  
  // Input values to send to remotes
  messageToReact = '';
  messageToAngularRemote = '';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Listen for messages from React
    this.messageService.message$.subscribe(message => {
      this.messageFromReact = message;
    });

    // Listen for messages from Angular remote (via postMessage from iframe)
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.origin === 'http://localhost:61799' && event.data) {
        this.messageFromAngularRemote = event.data;
        console.log('✅ Message received from Angular remote:', event.data);
      }
    });
  }

  sendToReact() {
    if (this.messageToReact.trim()) {
      // Dispatch custom event that React wrapper can listen to
      window.dispatchEvent(new CustomEvent('hostToReact', { 
        detail: this.messageToReact 
      }));
      console.log('📤 Sent to React:', this.messageToReact);
      this.messageToReact = '';
    }
  }

  sendToAngularRemote() {
    if (this.messageToAngularRemote.trim()) {
      // Send message to iframe via postMessage
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(this.messageToAngularRemote, 'http://localhost:61799');
        console.log('📤 Sent to Angular Remote:', this.messageToAngularRemote);
      }
      this.messageToAngularRemote = '';
    }
  }
}
