import SignupPage from '../pages/SignupPage'

describe('Cadastro', ()=>{
    it('Usuário deve se tornar um deliver', ()=>{
        
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

        //instancia da classe
        var signup = new SignupPage()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('Usuário com CPF inválido', ()=>{
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

         //instancia da classe
         var signup = new SignupPage()

         signup.go()
         signup.fillForm(deliver)
         signup.submit()
         signup.alertMessageShouldBe('Oops! CPF inválido')
    })
})