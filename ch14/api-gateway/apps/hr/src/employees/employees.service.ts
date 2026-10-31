import {Injectable} from '@nestjs/common';
import {Employee} from './entities/employee.entity.js';
import {EventEmitter2} from '@nestjs/event-emitter'

@Injectable()
export class EmployeesService {
    private employees: Employee[] = [];

    constructor(
        private readonly eventEmitter: EventEmitter2,
    ) {
    }

    createEmployee(employee: Employee) {
        this.employees.push(employee);
        this.eventEmitter.emit('employee.created', employee);

        return this.employees;
    }

    getEmployee(id: number) {
        return this.employees.find(emp => emp.id === id);
    }

    getEmployees() {
        return this.employees;
    }
}
