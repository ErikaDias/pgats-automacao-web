import { faker } from '@faker-js/faker';

class Cadastro { 
    preencherFormularioCadastroCompleto(password, name, sobrenome, empresa, endereco1, endereco2, estado, cidade, cep, telefone) {

        cy.get('#id_gender1').check();
        cy.get('#password').type(password, {log: false}); //oculta a senha no log do cypress
        cy.get('#days').select('10');
        cy.get('#months').select(faker.date.month());
        cy.get('#years').select('1990');
        cy.get('#newsletter').check();
        cy.get('#optin').check();
        cy.get('#first_name').type(name);
        cy.get('#last_name').type(sobrenome);
        cy.get('#company').type(empresa);
        cy.get('#address1').type(endereco1);
        cy.get('#address2').type(endereco2);
        cy.get('#country').select('Canada');
        cy.get('#state').type(estado);
        cy.get('#city').type(cidade);
        cy.get('#zipcode').type(cep);
        cy.get('#mobile_number').type(telefone);
        cy.get('[data-qa="create-account"]').click();
    }
}
export default new Cadastro();