import { faker } from '@faker-js/faker';
import { getRandomEmail } from '../../support/helpers';


class Login {
    preencherFormularioPreCadastro(user, email){
        cy.get('[data-qa="signup-name"]').click();
        cy.get('[data-qa="signup-name"]').type(user);
        cy.get('[data-qa="signup-email"]').click();
        cy.get('[data-qa="signup-email"]').type(email);
        cy.get('[data-qa="signup-button"] ').click();
    }

    preencherFormularioLogin(user, password){
        cy.get('[data-qa="login-email"]').type(user);
        cy.get('[data-qa="login-password"]').type(password, {log: false});
        cy.get('[data-qa="login-button"]').click();
    }

    preencherFormularioPreCadastroEmailExistente(user){
        cy.get('[data-qa="signup-name"]').click();
        cy.get('[data-qa="signup-name"]').type(faker.person.fullName());
        cy.get('[data-qa="signup-email"]').click();
        cy.get('[data-qa="signup-email"]').type(user);
        cy.get('[data-qa="signup-button"] ').click();
    }
}
export default new Login();