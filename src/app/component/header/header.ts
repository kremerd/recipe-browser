import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'rec-header',
  imports: [MatButtonModule, RouterLinkWithHref],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
