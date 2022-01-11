import signup from '../pages/SignupPage' //importa a classe já instanciada

describe('Signup', ()=>{

    //ganchos em cypress 
    beforeEach(function() {
        cy.fixture('deliver').then(function(massa){
            this.deliver = massa //contexto
        })
    })

    it('User must become a deliver', function(){
        signup.go()
        signup.fillForm(this.deliver.signup)
        signup.submit()
        
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('User with invalid CPF', function(){
         signup.go()
         signup.fillForm(this.deliver.cpf_invalido)
         signup.submit()
         signup.alertMessageShouldBe('Oops! CPF inválido')
    })
})