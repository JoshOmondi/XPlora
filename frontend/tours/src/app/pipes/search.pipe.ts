import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchQuery: string): any[] {
    if (!items || !searchQuery) {
      return items;
    }

    const query = searchQuery.toLowerCase();

    return items.filter((item) => item.name.toLowerCase().includes(query));
  }
}
