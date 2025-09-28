import { Pipe, PipeTransform } from '@angular/core';
import { FleetCompanyCar, FleetLeasingCar } from '../models/fleet';

@Pipe({
  name: 'isCompanyCar',
})
export class IsCompanyCar implements PipeTransform {
  transform(car: FleetCompanyCar | FleetLeasingCar): car is FleetCompanyCar {
    return (car as FleetCompanyCar).owner !== undefined;
  }
}
