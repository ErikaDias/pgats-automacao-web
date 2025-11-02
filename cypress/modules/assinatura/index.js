class Assinatura {
    cadastrarEmail(email) {
        cy.get('#susbscribe_email').type(email);
        cy.get('#subscribe').click();
    }
}

export default new Assinatura();
