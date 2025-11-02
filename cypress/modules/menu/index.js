class Menu {
    navegarParaLogin() {
        cy.get('a[href="/login"]').click();
    }

    efetuarLogout() {
        cy.get('a[href="/logout"]').click();
    }

    deletarConta() {
        cy.get('a[href="/delete_account"]').click();
    }

    navegarParaContato() {
        cy.get('a[href="/contact_us"]').click();
    }

    navegarParaProdutos() {
        cy.get('a[href="/products"]').click();
    }

    navegarParaPagamento() {
        cy.get('a[href="/payment"]').click();
    }
}
export default new Menu();