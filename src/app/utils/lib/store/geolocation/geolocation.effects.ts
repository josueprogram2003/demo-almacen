// geolocation.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { loadGeolocation, loadGeolocationSuccess, loadGeolocationFailure } from './geolocation-actions';
import { GeolocationService } from '../../services/geocalization.service';

@Injectable()
export class GeolocationEffects {
  constructor(
    private actions$: Actions,
    private geolocationService: GeolocationService
  ) {}

  loadGeolocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGeolocation),
      switchMap(() =>
        this.geolocationService.getLocation()
          .then(data => loadGeolocationSuccess({ geolocation: data }))
          .catch(error => loadGeolocationFailure({ error }))
      )
    )
  );
}
