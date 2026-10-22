import {UserEntity} from '../users/entities/user.entity.js';

export class ExternalUserDataService {
    async fetchUsers(): Promise<UserEntity[]> {
        return Promise.resolve([
            {
                id: 3,
                name: 'External User',
                email: 'externam@example.com',
            }
        ])
    }
}
