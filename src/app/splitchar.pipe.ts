import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitchar'
})
export class SplitcharPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    console.log(value, args)
    return value.split('');
  }

}