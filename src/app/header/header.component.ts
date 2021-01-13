import { Component, Input, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sideNav: MatSidenav;
  constructor() { }
  ngOnInit(): void {
  }

}
