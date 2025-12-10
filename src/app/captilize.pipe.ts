import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fita',
  standalone: true
})
export class CaptilizePipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): unknown {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
