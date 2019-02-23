import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../services/page.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  // properties
  private _userId: string;
  private _websiteId: string;
  private _pageId: string;
  private _page: any;

  constructor(private _activatedRoute: ActivatedRoute,
              private _pageService: PageService) {
  }

  ngOnInit() {
    // get properties by the route parameters
    this._activatedRoute.params.subscribe(
      params => {
        console.log(params);
        this._userId = params.uid;
        this._websiteId = params.wid;
        this._pageId = params.pid;
      }
    );
    // get the page associated with the pageId
    const tempPage = this._pageService.findPageById(this._pageId);
    // deep copy the found page and assign it to the local page variable
    this._page = JSON.parse(JSON.stringify(tempPage));
    console.log('Deep copied the page: ');
    console.log(this._page);
  }

  onEditPage() {
    const tempPage = JSON.parse(JSON.stringify(this._page));
    this._pageService.updatePage(this._pageId, tempPage);
  }

  onDeletePage() {
    this._pageService.deletePage(this._pageId);
  }

}
