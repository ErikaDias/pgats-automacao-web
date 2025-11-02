class Carrinho {
    
    adicionarProdutoAoCarrinho() {
        cy.get('a[href="/product_details/1"]').click();
        cy.get('.product-information').should('be.visible');
        cy.get('.cart').click();
        cy.get('.modal-content').should('be.visible');
        cy.get('#cartModal').contains('View Cart').click();
    }

    navegarParaCheckout() {
        cy.get('.check_out').click();      
    }

    enviarComentarioNoPedido(comentario) {
        cy.get('textarea[name="message"]').type(comentario);
    }

}
export default new Carrinho();