import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WidgetService } from "../../../services/widget.service";

@Component({
  selector: "app-widget-list",
  templateUrl: "./widget-list.component.html",
  styleUrls: ["./widget-list.component.css"]
})
export class WidgetListComponent implements OnInit {
  // properties
  private _userId: string;
  private _websiteId: string;
  private _pageId: string;
  private _widgets = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _widgetService: WidgetService
  ) {}

  ngOnInit() {
    // update the properties using the route parameters
    this._activatedRoute.params.subscribe(params => {
      console.log(params);
      this._userId = params.uid;
      this._websiteId = params.wid;
      this._pageId = params.pid;

      // then get the widgets associated with the pageId
      this._widgetService.findWidgetsByPageId(this._pageId).subscribe(data => {
        this._widgets = data;
        console.log(
          "Getting all the widgets of page id " + this._pageId + ": "
        );
        console.log(this._widgets);
      });
    });
  }

  // to make the video resource url trusted
  // this method has been deprecated, use the custom pipe instead
  // updateVideoUrl(url: string) {
  //   return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  // }
}
