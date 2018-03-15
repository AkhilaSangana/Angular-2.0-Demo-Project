import{InMemoryDbService} from 'angular-in-memory-web-api'

export class InMemoryDataService implements InMemoryDbService{
    createDb() {
        const heroes = [
          { id: 11, name: 'Mr. Sandeep' },
          { id: 12, name: 'Narco' },
          { id: 13, name: 'Ashok' },
          { id: 14, name: 'Celeritas' },
          { id: 15, name: 'Magneta' },
          { id: 16, name: 'RubberMan' },
          { id: 17, name: 'Deepak' },
          { id: 18, name: 'Dr IQ' },
          { id: 19, name: 'Magma' },
          { id: 20, name: 'Tornadoi' }
        ];
        return {heroes};
      }
}