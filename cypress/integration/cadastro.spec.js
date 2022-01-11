import signup from '../pages/SignupPage' //importa a classe já instanciada

describe('Cadastro', ()=>{

    //ganchos em cypress 
    beforeEach(function() {
        cy.fixture('deliver').then(function(massa){
            this.deliver = massa //contexto
        })
    })

    it('Usuário deve se tornar um deliver', function(){
        signup.go()
        signup.fillForm(this.deliver.signup)
        signup.submit()
        
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('Usuário com CPF inválido', function(){
         signup.go()
         signup.fillForm(this.deliver.cpf_invalido)
         signup.submit()
         signup.alertMessageShouldBe('Oops! CPF inválido')
    })
})