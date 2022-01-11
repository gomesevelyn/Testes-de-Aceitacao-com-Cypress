
class SignupPage {

    //função para acessar o form de cadastro
    go() {
        cy.visit('https://buger-eats.vercel.app')
        
        cy.get('a[href="/deliver"]').click() //clica no botão de cadastro
        
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas') //é um checkpoint para verificar se esta no caminho correto
    }

    //preenche dados do formulario 
    fillForm(deliver) { //recebe a massa de teste
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
    }
     
    //confirmar preeenchimento do form
    submit() {
        cy.get('form button[type="submit"]').click()
    }

    //validar submissão do formulario
    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container')
        .should('have.text', expectedMessage)
    }

    //Valida msg de erro 
    alertMessageShouldBe(expectedMessage) {
        cy.get('.alert-error').should('have.text', expectedMessage)
    }
}

//exporta a pagina
export default SignupPage;