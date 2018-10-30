import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(items: any, searchText: string): any {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();

        return items.filter(item =>
            item.id.toString().includes(searchText) ||
            item.first_name.toLowerCase().includes(searchText) ||
            item.last_name.toLowerCase().includes(searchText) ||
            item.email.toLowerCase().includes(searchText) ||
            item.ip.toLowerCase().includes(searchText) ||
            item.latitude.toString().includes(searchText) ||
            item.longitude.toString().includes(searchText)
        );
    }

}
