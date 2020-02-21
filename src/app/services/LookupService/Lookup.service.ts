import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LookupItem } from 'src/app/models/dtos/common/lookup-item';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

constructor() { }

GetSizeLookupItems(): Observable<LookupItem[]> {
return of(
  new Array<LookupItem>(
    new LookupItem(1, 'S'),
    new LookupItem(2, 'M'),
    new LookupItem(3, 'L'),
    ));
}

GetAnimationTypesLookupItems(): Observable<LookupItem[]> {
return of(
  new Array<LookupItem>(
    new LookupItem(4, 'Fortine Wheel'),
    new LookupItem(5, 'Slide Animation'),
    new LookupItem(6, 'Bounce Animation'),
    ));
}

GetAnimationDurationTypesLookupItems(): Observable<LookupItem[]> {
return of(
  new Array<LookupItem>(
    new LookupItem(4, 'Auto 2 sec'),
    new LookupItem(6, '4 sec'),
    new LookupItem(5, 'None'),
    ));
}
GetImageLookupItems(): Observable<LookupItem[]> {
  return of(
    new Array<LookupItem>(
      new LookupItem('Mask', '../assets/images/mask.png'),
      new LookupItem('Ice', '../assets/images/ice.jpg'),
      new LookupItem('Space', '../assets/images/space.jpg'),
      new LookupItem('Nature', '../assets/images/nature.jpeg'),
      ));
  }

}
