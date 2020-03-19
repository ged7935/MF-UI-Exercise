import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface ICanDeactivate {
  canDeactivate: () => boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ICanDeactivate> {

  canDeactivate(component: ICanDeactivate) {
    return component.canDeactivate();
  }

}