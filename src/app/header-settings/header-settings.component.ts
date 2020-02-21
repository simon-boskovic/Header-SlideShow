import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LookupService } from '../services/LookupService/Lookup.service';
import { forkJoin } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { LookupItem } from '../models/dtos/common/lookup-item';
import { HeaderSettingsDto } from '../models/dtos/header-settings-dto';
import { HeaderTilesDto } from '../models/dtos/header-tiles-dto';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'header-settings',
  templateUrl: './header-settings.component.html',
  styleUrls: ['./header-settings.component.scss']
})
export class HeaderSettingsComponent implements OnInit, OnDestroy {

  @Output() onHeadingChange = new EventEmitter<string>();
  @Output() onBackgroundImageChange = new EventEmitter<string>();
  sizeOptions: LookupItem[] = [];
  animationsOptions: LookupItem[] = [];
  animationsDurationOptions: LookupItem[] = [];
  images: LookupItem[] = [];
  model: HeaderSettingsDto = new HeaderSettingsDto();
  menuexpanded = false;

  checkboxValue = false;
  constructor(
    private lookupService: LookupService,
    private http: HttpClient
    ) {

    forkJoin([
      this.lookupService.GetSizeLookupItems(),
      this.lookupService.GetAnimationTypesLookupItems(),
      this.lookupService.GetAnimationDurationTypesLookupItems(),
      this.lookupService.GetImageLookupItems()
    ])
    .pipe(untilDestroyed(this))
    .subscribe(result => {
      if (result) {
        this.sizeOptions = result[0];
        this.animationsOptions = result[1];
        this.animationsDurationOptions = result[2];
        this.images = result[3];
        this.setDefaultValues(this.model);
      }
    });

  }

  onAnimationOptionChange(value: string) {
    this.model.AnimationTypeID = value;
    const animationID = this.animationsOptions.find(x => x.Name === this.model.AnimationTypeID).ID;
    this.model.AnimationDurationID = this.animationsDurationOptions.find(x => x.ID === animationID).Name;
  }

  onSizeOptionChange(value: string) {
    this.model.SizeID = value;
  }
  onTileAdd() {
    this.model.HeaderTiles.push(new HeaderTilesDto());
  }
  onSave() {
    this.http.post('http://httpbin.org/post', this.model).toPromise().then((data: any) => {
      console.log(JSON.stringify(data.json));
    });
  }

  onHeadingTitleChange() {
    this.onHeadingChange.emit(this.model.HeaderTiles[0].HeadingTitle);
  }
  onImageChange() {
    this.onBackgroundImageChange.emit(this.images.find(x => x.ID === this.model.HeaderTiles[0].BackgroundImageUrl).Name);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {

  }


   private setDefaultValues(model: HeaderSettingsDto) {
     model.SizeID = 'M';
     model.AnimationTypeID = 'Fortine Wheel';
     model.AnimationDurationID = 'Auto 2 sec';
     const firstModel = new HeaderTilesDto();
     firstModel.HeadingTitle = 'Welcome to our Brandportal';
     firstModel.IsPositive = true;
     firstModel.BackgroundImageUrl = 'Mask';
     this.onHeadingChange.emit(firstModel.HeadingTitle);
     model.HeaderTiles.push(firstModel);
   }

}
