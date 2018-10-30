import { SearchPipe } from './search.pipe';
import { TestCustomers } from 'src/app/pages/customer-management/customer-management.component.spec';

describe('SearchPipe', () => {
    const pipe = new SearchPipe();
    const customerList = TestCustomers;

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('searches for "Nashid" in the customer list', () => {
        const searchResults = [{
            id: 1,
            email: 'nashid.ahmed@people10.com',
            first_name: 'Nashid',
            last_name: 'Shah',
            ip: '112.123.54.184',
            latitude: 12.234223,
            longitude: 45.345112,
            created_at: new Date('2018-10-27 13:43:37'),
            updated_at: null
        }];

        expect(pipe.transform(customerList, 'Nashid')).toEqual(searchResults);
    });

    it('searches for "gmail" in the customer list', () => {
        const searchResults = [{
            id: 3,
            email: 'ravi.ubana@gmail.com',
            first_name: 'Ravi',
            last_name: 'Ubana',
            ip: '87.254.252.43',
            latitude: 97.345252,
            longitude: 47.433452,
            created_at: new Date('2018-10-28 17:43:37'),
            updated_at: null
        },
        {
            id: 4,
            email: 'anoop.md@gmail.com',
            first_name: 'Anoop',
            last_name: 'MD',
            ip: '57.224.221.52',
            latitude: 35.125611,
            longitude: 89.325223,
            created_at: new Date('2018-09-28 17:43:37'),
            updated_at: null
        }];

        expect(pipe.transform(customerList, 'gmail')).toEqual(searchResults);
    });
});
