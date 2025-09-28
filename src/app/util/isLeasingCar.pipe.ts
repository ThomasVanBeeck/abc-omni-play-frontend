import { Pipe, PipeTransform } from '@angular/core';
import { FleetCompanyCar, FleetLeasingCar } from '../models/fleet';

@Pipe({
  name: 'isLeasingCar',
})
export class IsLeasingCar implements PipeTransform {
  transform(car: FleetCompanyCar | FleetLeasingCar): car is FleetLeasingCar {
    return (car as FleetLeasingCar).leasingCompany !== undefined;
  }
}
