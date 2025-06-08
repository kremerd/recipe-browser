import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';

@Component({
  selector: 'rec-root',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    inject(Title).setTitle('Rezeptbuch');
  }
}
