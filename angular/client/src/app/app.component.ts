import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'client';
  messageFromReact = '';
  messageFromAngularRemote = '';

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
}
