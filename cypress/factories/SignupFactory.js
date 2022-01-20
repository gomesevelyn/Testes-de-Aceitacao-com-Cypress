//import das bibliotecas
var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {
    deliver: function () {
        
        var firstName = faker.name.firstName() //gera nome e sobrenome automaticamente
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf:  cpf.generate(),
            email: faker.internet.email(firstName), //gera email automaticamente
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

        return data
    }
}