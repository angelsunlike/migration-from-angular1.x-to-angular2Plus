import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'angularFilter'
})
export class angularFilterPipe implements PipeTransform {
    transform(value: string): string {
        return value === 'angular' ? 'angular pipe' : value;
    }
}
