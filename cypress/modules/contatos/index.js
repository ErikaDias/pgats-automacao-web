import { faker } from "@faker-js/faker";

class Contatos {
    preencherFormularioContato() {
        cy.get('[data-qa="name"]').type(faker.person.fullName());
        cy.get('[data-qa="email"]').type(faker.internet.email());
        cy.get('[data-qa="subject"]').type(faker.lorem.sentence());
        cy.get('[data-qa="message"]').type(faker.lorem.paragraph());
        // Anexar o arquivo
        cy.fixture('example.json').as('arquivoExemplo');
        cy.get('input[type=file]').selectFile('@arquivoExemplo');
        cy.get('[data-qa="submit-button"]').click();
    }
    voltarPaginaInicial() {
        cy.get('#form-section > .btn').click();
    }
    
}
export default new Contatos();