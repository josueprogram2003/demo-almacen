import { Store } from '@ngrx/store';
import { Pipe, PipeTransform } from '@angular/core';
import { Accion } from '../models/user.model';
import { map, Observable, take } from 'rxjs';
import { getUserAccions } from '../store/user/user-selector';

@Pipe({
  name: 'access',
  standalone: true,
})
export class AccesPipe implements PipeTransform {

  constructor(private store:Store) { }
  transform(value: string): Observable<boolean> {
    return this.store.select(getUserAccions).pipe(
      take(1),
      map((actions: Accion[] | undefined) => actions || []),
      map((actions: Accion[]) => {
        if (actions) {
          return actions.some((action) => action.codigo === value);
        }
        return false;
      })
    );
  }

}
