import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router/';
import { DomSanitizer, Title } from '@angular/platform-browser/';
import { PageService } from '../page.service';
import { Router } from '@angular/router/';
import { Page } from '../../models/page';
import { NavService } from '../navigation.service';


@Component({
  selector: 'app-pageview',
  templateUrl: '../../themes/default/theme.html',
  styleUrls: ['../../themes/default/theme.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageviewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService,
    private titleService: Title,
    private navService: NavService
  ) { }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        // When the route changes, update the viewed page.
        if(event instanceof NavigationEnd){
        this.id = this.route.snapshot.paramMap.get('string');
      
        this.getPage(this.id);
        }
      });

    this.id = this.route.snapshot.paramMap.get('string');
    this.getPage(this.id)
  }

  private id: string;
  public currentPage: Page;
  /**
   * Gets the requested page from [[pageService]] and updates view and title
   *@param id The route to the page
   */
  public getPage(id: string) {
    if (id === "index") {

      this.pageService.GetMainPage()
        .then(r => {
          r.subscribe(page => {
          this.currentPage = page[0];
            this.titleService.setTitle(this.currentPage.title);
          });
        })
    }
    else {
      this.pageService.GetPage(id)
        .then(page => {
        this.currentPage = page;
          this.titleService.setTitle(this.currentPage.title);
        })
        .catch(page => {
           this.currentPage = page;
           this.titleService.setTitle(page.title)
        });
    }
  }

}
