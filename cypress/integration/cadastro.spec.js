

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
            whatsapp: '16999999999',
            endereco:{
                cep: '14402460',
                rua: 'Rua Mário Martins', 
                numero: '1000',
                complemento: 'casa',
                bairro: 'Jardim Paulistano',
                cidade_uf: 'Franca/SP'
            },
            metodo_entrega: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        //preenchimento dos dados do entregador
        cy.get('input[name="name"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        //preenchimento do endereço
        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

        //validacao dos campos preenchidos automaticamente pela busca de cep
        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

        //selecionar tipo de entrega 
        cy.contains('.delivery-method li', entregador.metodo_entrega).click()

        //upload arquivo 
        cy.get('input[accept^="image"]').attachFile('/images/' + entregador.cnh)

        //confirmar preeenchimento do form
        cy.get('form button[type="submit"]').click()

        //validar submissão do formulario
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)

    })
})