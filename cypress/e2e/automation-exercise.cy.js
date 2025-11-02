/// <reference types="cypress" />

import userData from '../fixtures/example.json'
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro';
import contatos from '../modules/contatos';
import produtos from '../modules/produtos';
import assinatura from '../modules/assinatura';
import carrinho from '../modules/carrinho';
import pagamento from '../modules/pagamento';


describe('Automation Exercise', () => {

    beforeEach(() => {
        //cy.viewport("iphone-xr")
        cy.visit('https://automationexercise.com/')
        menu.navegarParaLogin();
    });
   
    it('Caso de teste 1: Registrar usuário', () => {
        cy.url().should('include', '/');
        cy.contains('h2', 'New User Signup!').should('be.visible');
        login.preencherFormularioPreCadastro(userData.user_name_delete, userData.user_email_delete);
        cy.contains('b', 'Enter Account Information').should('be.visible');
        cadastro.preencherFormularioCadastroCompleto(userData.user_password_delete, userData.user_name_delete, userData.user_segundonome_delete, userData.user_empresa_delete, userData.user_endereco1_delete, userData.user_endereco2_delete, userData.user_estado_delete, userData.user_cidade_delete, userData.user_cep_delete, userData.user_numero_delete);
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
        cy.get('[data-qa="continue-button"]').click();
        cy.get('i.fa-user').parent().should('contain', userData.user_name_delete);
        menu.deletarConta();
        cy.get('h2[data-qa="account-deleted"]').should('have.text', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
    });

    it('Caso de teste 2: Login do usuário com e-mail e senha corretos', () => {
        cy.contains('h2', 'Login to your account').should('be.visible');
        login.preencherFormularioLogin(userData.user, userData.password);
        cy.get('i.fa-user').parent().should('contain', userData.name);
    });

    it('Caso de teste 3: Login do usuário com email e senha incorretos', () => {
        cy.contains('h2', 'Login to your account').should('be.visible');
        login.preencherFormularioLogin(userData.user, "123456");
        cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!')
    });

    it('Caso de teste 4: Logout do usuário com sucesso', () => {
        cy.contains('h2', 'Login to your account').should('be.visible');
        login.preencherFormularioLogin(userData.user, userData.password);
        cy.get('i.fa-user').parent().should('contain', userData.name);
        menu.efetuarLogout();
        cy.url().should('include', '/');
    });

    it('Caso de teste 5: Registrar usuário com e-mail existente', () => {
        login.preencherFormularioPreCadastroEmailExistente(userData.user);
        cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!');
    });

    it('Caso de teste 6: Enviar um formulario de Contato', () => {
        menu.navegarParaContato();
        cy.contains('h2', 'Get In Touch').should('be.visible');
        contatos.preencherFormularioContato();
        cy.get('.status').should('contain', 'Success! Your details have been submitted successfully.');
        contatos.voltarPaginaInicial();
        cy.url().should('include', '/');
    });

    it('Caso de teste 8: Verificar tela de todos os produtos e a página de detalhes do produto', () => {
        cy.url().should('include', '/')
        menu.navegarParaProdutos();
        cy.contains('h2', 'All Products').should('be.visible');
        produtos.verificarListaProdutos();
        produtos.visualizarPrimeiroProduto();
        cy.get('.product-information > h2').should('be.visible');
        cy.contains('.product-information p', 'Category:').should('be.visible');
        cy.get('.product-information span span').should('be.visible');
        cy.contains('.product-information p', 'Availability:').should('be.visible');
        cy.contains('.product-information p', 'Condition:').should('be.visible');
        cy.contains('.product-information p', 'Brand:').should('be.visible');
    });

    it('Caso de teste 9: Pesquisar produto', () => {
        cy.url().should('include', '/');
        menu.navegarParaProdutos();
        cy.contains('h2', 'All Products').should('be.visible');
        produtos.pesquisarProduto(userData.name_produto);
        cy.contains('.productinfo p', userData.name_produto).should('be.visible');
    });

    it('Caso de teste 10: Verificar Subscription na página inicial', () => {
        cy.url().should('include', '/');
        cy.get('footer').scrollIntoView().should('be.visible')
        cy.contains('h2', 'Subscription').should('be.visible');
        assinatura.cadastrarEmail(userData.user);
        cy.get('.alert-success').should('contain', 'You have been successfully subscribed!');
    });

    it('Caso de teste 15: Fazer pedido: Registrar antes de finalizar a compra',() => {
        cy.url().should('include', '/');
        cy.contains('h2', 'New User Signup!').should('be.visible');
        login.preencherFormularioPreCadastro(userData.user_name_delete, userData.user_email_delete);
        cy.contains('b', 'Enter Account Information').should('be.visible');
        cadastro.preencherFormularioCadastroCompleto(userData.user_password_delete, userData.user_name_delete, userData.user_segundonome_delete, userData.user_empresa_delete, userData.user_endereco1_delete, userData.user_endereco2_delete, userData.user_estado_delete, userData.user_cidade_delete, userData.user_cep_delete, userData.user_numero_delete);
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');    
        cy.get('[data-qa="continue-button"]').click();
        cy.get('i.fa-user').parent().should('contain', userData.user_name_delete);
        menu.navegarParaProdutos();
        produtos.pesquisarProduto(userData.name_produto);
        carrinho.adicionarProdutoAoCarrinho();
        cy.url().should('include', '/view_cart');
        carrinho.navegarParaCheckout();
        //carrinho.verificarDetalhesNoCheckout(userData.user_endereco1_delete, userData.user_endereco2_delete, userData.user_pais_delete, userData.name_produto);
        cy.get('[data-qa="checkout-info"]').should('be.visible');
        cy.get('#address_delivery .address_address1.address_address2').contains(userData.user_endereco1_delete).should('be.visible');
        cy.get('#address_delivery .address_address1.address_address2').contains(userData.user_endereco2_delete).should('be.visible');
        cy.get('#address_delivery .address_country_name').contains(userData.user_pais_delete).should('be.visible');
        cy.contains('Review Your Order').should('be.visible');
        cy.get('.cart_description').contains(userData.name_produto).should('be.visible');
        carrinho.enviarComentarioNoPedido(userData.comentario_pedido);
        menu.navegarParaPagamento();
        pagamento.confirmarPedidoComCartaoDeCredito(userData.nome_no_cartao, userData.numero_do_cartao, userData.data_de_validade, userData.data_de_validade_ano, userData.codigo_cvc);
        cy.contains('b', 'Order Placed!').should('be.visible');
        cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');
        menu.deletarConta();
        cy.get('h2[data-qa="account-deleted"]').should('have.text', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
    });

});