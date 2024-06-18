import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLayoutModule } from './layout/app.layout.module';
import { AppSidebarComponent } from './layout/app.sidebar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AppLayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent  implements OnInit{
  title = 'sistema-gestion';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
    }
  }

}
