class Produtos {
    verificarListaProdutos() {
        cy.get('.features_items').should('be.visible');
    }

    visualizarPrimeiroProduto(){
        cy.get('a[href="/product_details/1"]').click();
    }

    pesquisarProduto(nomeProduto) {
        cy.get('#search_product').type(nomeProduto);
        cy.get('#submit_search').click();
    }
}
export default new Produtos();