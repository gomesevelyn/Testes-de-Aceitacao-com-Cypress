import signup from '../pages/SignupPage' //importa a classe já instanciada
import signupFactory from '../factories/SignupFactory'
import signupPage from '../pages/SignupPage'


describe('Signup', ()=>{

    //ganchos em cypress 
    /*beforeEach(function() {
        cy.fixture('deliver').then(function(massa){
            this.deliver = massa //contexto
        })
    })*/

    it.skip('User must become a deliver', function(){
       
        var deliver = signupFactory.deliver() //massa de dados

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })

    it.skip('User with invalid CPF', function(){

        var deliver = signupFactory.deliver() //massa de dados
        deliver.cpf = '000000141zz' //altera somente o campo 

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')
    })

    it.skip('User with invalid Email', function(){

        var deliver = signupFactory.deliver() //massa de dados

        deliver.email = 'user.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
   })

   //valida campos obrigatorios dinâmicos 
   context ('Required field', function () {
       const messages = [
           {field: 'name', output : 'É necessário informar o nome'},
           {field: 'cpf', output : 'É necessário informar o CPF'},
           {field: 'email', output : 'É necessário informar o e-mail'},
           {field: 'postalcode', output : 'É necessário informar o CEP'},
           {field: 'number', output : 'É necessário informar o número do endereço'},
           {field: 'delivery_method', output : 'Selecione o método de entrega'},
           {field: 'cnh', output : 'Adicione uma foto da sua CNH'}
       ]
       //funçao de gancho 
       before (function () {
            signupPage.go()
            signupPage.submit()
       })

       //percorre as msgs 
       messages.forEach(function(msg){
           it(`${msg.field} is required`, function(){
               signupPage.alertMessageShouldBe(msg.output)
           })
       })
   })

   //valida campos obrigatorios 
   /*it ('Required fields', function (){
        signupPage.go()
        signupPage.submit()
        signupPage.alertMessageShouldBe('É necessário informar o nome')
        signupPage.alertMessageShouldBe('É necessário informar o CPF')
        signupPage.alertMessageShouldBe('É necessário informar o email')
        signupPage.alertMessageShouldBe('É necessário informar o CEP')
        signupPage.alertMessageShouldBe('É necessário informar o número do endereço')
        signupPage.alertMessageShouldBe('Selecione o método de entrega')
        signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
   })*/
})