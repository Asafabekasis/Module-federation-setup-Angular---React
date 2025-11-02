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

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.message$.subscribe(message => {
      this.messageFromReact = message;
    });
  }
}
