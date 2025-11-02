class Pagamento {
    confirmarPedidoComCartaoDeCredito(nomeNoCartao, numeroDoCartao, dataDeValidadeMes, dataDeValidadeAno, codigoCVC) {
        cy.get('[data-qa="name-on-card"]').type(nomeNoCartao);
        cy.get('[data-qa="card-number"]').type(numeroDoCartao);
        cy.get('[data-qa="cvc"]').type(codigoCVC);
        cy.get('[data-qa="expiry-month"]').type(dataDeValidadeMes);
        cy.get('[data-qa="expiry-year"]').type(dataDeValidadeAno);
        cy.get('[data-qa="pay-button"]').click();
    }   
}

export default new Pagamento();