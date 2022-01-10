

describe('Cadastro', ()=>{
    it('Usuário deve se tornar um entregador', ()=>{
        cy.viewport(1440, 900)
        cy.visit('https://buger-eats.vercel.app')
        
        cy.get('a[href="/deliver"]').click() //clica no botão de cadastro
        
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas') //é um checkpoint para verificar se esta no caminho correto

        //massa de dados 
        var entregador = {
            nome: 'Evelyn Gomes', 
            cpf:  '00000014141',
            email: 'evelyn@email.com.br',
            whatsapp: '16999999999'
        }

        cy.get('input[name="name"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)
    })
})