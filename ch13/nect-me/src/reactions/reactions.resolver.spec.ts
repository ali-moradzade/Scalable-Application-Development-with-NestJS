import {Test, TestingModule} from '@nestjs/testing';
import {ReactionsResolver} from './reactions.resolver.js';
import {ReactionsService} from './reactions.service.js';

describe('ReactionsResolver', () => {
    let resolver: ReactionsResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReactionsResolver, ReactionsService],
        }).compile();

        resolver = module.get<ReactionsResolver>(ReactionsResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
