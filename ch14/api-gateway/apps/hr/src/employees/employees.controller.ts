import {Controller, Get} from '@nestjs/common';
import {EmployeesService} from './employees.service.js';
import {MessagePattern} from '@nestjs/microservices';

@Controller('employees')
export class EmployeesController {
    constructor(
        private readonly employeesService: EmployeesService,
    ) {
    }

    @Get()
    getEmployees() {
        return this.employeesService.getEmployees();
    }

    @MessagePattern({
        cmd: 'create_employee',
    })
    createEmployee(data: any) {
        return this.employeesService.createEmployee(data);
    }

    @MessagePattern({
        cmd: 'get_employee',
    })
    getEmployee(id: number) {
        return this.employeesService.getEmployee(id);
    }
}
