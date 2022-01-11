

describe('Cadastro', ()=>{
    it('Usuário deve se tornar um deliver', ()=>{
        cy.viewport(1440, 900)
        cy.visit('https://buger-eats.vercel.app')
        
        cy.get('a[href="/deliver"]').click() //clica no botão de cadastro
        
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas') //é um checkpoint para verificar se esta no caminho correto

        //massa de dados 
        var deliver = {
            name: 'Evelyn Gomes', 
            cpf:  '000000141AB',
            email: 'evelyn@email.com.br',
            whatsapp: '16999999999',
            address:{
                postalcode: '14402460',
                street: 'Rua Mário Martins', 
                number: '1000',
                details: 'casa',
                district: 'Jardim Paulistano',
                city_state: 'Franca/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        //preenchimento dos dados do deliver
        cy.get('input[name="name"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        //preenchimento do endereço
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        //validacao dos campos preenchidos automaticamente pela busca de cep
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        //selecionar tipo de entrega 
        cy.contains('.delivery-method li', deliver.delivery_method).click()

        //upload arquivo 
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)

        //confirmar preeenchimento do form
        cy.get('form button[type="submit"]').click()

        //validar submissão do formulario
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    })

    it('Usuário com CPF inválido', ()=>{
        cy.viewport(1440, 900)
        cy.visit('https://buger-eats.vercel.app')
        
        cy.get('a[href="/deliver"]').click() //clica no botão de cadastro
        
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas') //é um checkpoint para verificar se esta no caminho correto

        //massa de dados 
        var deliver = {
            name: 'Evelyn Gomes', 
            cpf:  '000000141AB',
            email: 'evelyn@email.com.br',
            whatsapp: '16999999999',
            address:{
                postalcode: '14402460',
                street: 'Rua Mário Martins', 
                number: '1000',
                details: 'casa',
                district: 'Jardim Paulistano',
                city_state: 'Franca/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        //preenchimento dos dados do entregador
        cy.get('input[name="name"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        //preenchimento do endereço
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        //validacao dos campos preenchidos automaticamente pela busca de cep
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        //selecionar tipo de entrega 
        cy.contains('.delivery-method li', deliver.delivery_method).click()

        //upload arquivo 
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)

        //confirmar preeenchimento do form
        cy.get('form button[type="submit"]').click()

        //Valida msg de erro 
        cy.get('.alert-error').should('have.text', 'Oops! CPF inválido')

    })
})