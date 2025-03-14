import { Injectable } from '@angular/core';
import { Car } from '../model/car';

@Injectable({
    providedIn: 'root'
})
export class CarsService {
    getCars(): Car[] {
        return [];
    }
}
