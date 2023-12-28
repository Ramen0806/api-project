import { postRequestBody , putRequestBody } from '../../fixtures/testData.json'
describe('API Project01',() => {
    
    let studentId
    it('Create a new student ', () => {

        cy.request({
            method: 'POST', 
            url: Cypress.env('baseUrl') ,
            body: postRequestBody
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.lessThan(200)
            cy.validateResponse(response, postRequestBody)
            studentId = response.body.id

        })


    })
    it('Retrieve a specific user-created',() => {

        cy.request({
            method: 'GET',
            url:`${Cypress.env('baseUrl')}/${studentId}`
          }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.lessThan(200)
            cy.validateResponse(response, postRequestBody)
          })
    })


    it('Update existing student user',() => {
        
        cy.request({
            method:'PUT',
            url: `${Cypress.env('baseUrl')}/${studentId}`,
            body: putRequestBody,
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.lessThan(200)
            cy.validateResponse(response, putRequestBody)
        })

    })

    it('Get the updated student',() => {

        cy.request({
            method: 'GET',
            url:`${Cypress.env('baseUrl')}/${studentId}`
          }).then((response) => {
            expect(response.duration).to.lessThan(200)
            expect(response.status).to.equal(200)
            cy.validateResponse(response, putRequestBody)
            
          })
    })

    it('Delete the updated student',() => {

        cy.request({
            method: 'DELETE',
            url:`${Cypress.env('baseUrl')}/${studentId}`
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.lessThan(200)

            cy.task('runQuery', 'SELECT * FROM student WHERE email = \'JackieC@gmail.net\'').then((rows) => {
                expect(rows).to.have.length(0)})
          
        })
    })


})