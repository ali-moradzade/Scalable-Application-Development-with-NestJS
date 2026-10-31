import {Module} from '@nestjs/common';
import {HrController} from './hr.controller.js';
import {HrService} from './hr.service.js';
import {EmployeesController} from './employees/employees.controller.js';
import {EmployeesService} from './employees/employees.service.js';

@Module({
    imports: [],
    controllers: [HrController, EmployeesController],
    providers: [HrService, EmployeesService],
})
export class HrModule {
}
