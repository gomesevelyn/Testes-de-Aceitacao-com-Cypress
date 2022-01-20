import signup from '../pages/SignupPage' //importa a classe já instanciada
import signupFactory from '../factories/SignupFactory'


describe('Signup', ()=>{

    //ganchos em cypress 
    /*beforeEach(function() {
        cy.fixture('deliver').then(function(massa){
            this.deliver = massa //contexto
        })
    })*/

    it('User must become a deliver', function(){
       
        var deliver = signupFactory.deliver() //massa de dados

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('User with invalid CPF', function(){

        var deliver = signupFactory.deliver() //massa de dados
        deliver.cpf = '000000141zz' //altera somente o campo 

         signup.go()
         signup.fillForm(deliver)
         signup.submit()
         signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('User with invalid Email', function(){

        var deliver = signupFactory.deliver() //massa de dados

        deliver.email = 'user.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
   })
})