import { faker } from '@faker-js/faker';

export function getRandomInt() {
    return faker.number.int({ min: 1000000000, max: 9999999999 });
}
export function getRandomEmail() {
    return faker.internet.email({firstName: 'qa-tester.pgats'});
}