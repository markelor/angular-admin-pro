import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agrupar',
})
export class AgruparPipe implements PipeTransform {
  transform(coleccion: any[], propiedad: string): any[] {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if (!coleccion) {
      return null;
    }

    const groupedCollection = coleccion.reduce((previous, current) => {
      if (!previous[current[propiedad]]) {
        previous[current[propiedad]] = [current];
      } else {
        previous[current[propiedad]].push(current);
      }

      return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map((key) => ({
      key,
      value: groupedCollection[key],
    }));
  }
}
