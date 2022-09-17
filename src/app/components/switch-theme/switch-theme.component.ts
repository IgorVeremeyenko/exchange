import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss']
})
export class SwitchThemeComponent implements OnInit {
  changeTheme(event:string) {
    console.log(event)
    this.theme.switchTheme(event)
  }

  constructor(private theme: ThemeService) { }

  ngOnInit(): void {
  }

}
