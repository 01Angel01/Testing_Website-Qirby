describe('Admin Page Test Cases', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000');
        cy.contains("Login").click();
        cy.login();
    })

    it('Verify the Profile Admin page displays User ID, Name, Email Address and Password Admin and Edit Profile button', () => {
        cy.get('[data-toggle="dropdown"] > button').contains('Admin').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.contains('Settings').click();
        cy.contains('User ID').should('be.visible');
        cy.contains('Name').should('be.visible');
        cy.contains('Email Address').should('be.visible');
        cy.contains('Password').should('be.visible');
        cy.get('.btn').contains('Edit Profile').should('be.visible');
    })


    it('The admin does not make any changes to the username and password', () => {
        cy.get('[data-toggle="dropdown"] > button').contains('Admin').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.contains('Settings').click();
        cy.get('.btn').contains('Edit Profile').click();
        cy.wait(3000);
        cy.contains('Admin').should('be.visible');
    })


    it('Edit Data Admin with Null Values', () => {
        cy.get('[data-toggle="dropdown"] > button').contains('Admin').click();
        cy.contains('Settings').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('#exampleInputName').clear();
        cy.get('#exampleInputEmail1').clear();
        cy.get('#exampleInputPassword1').clear();
        cy.get('.btn').contains('Edit Profile').click();

        cy.get('#exampleInputName').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })


    it('Edit Data Admin with Correct Values', () => {
        cy.get('[data-toggle="dropdown"] > button').contains('Admin').click();
        cy.contains('Settings').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('#exampleInputName').clear().type('Admin Test')
        cy.get('#exampleInputEmail1').clear().type('admin@gmail.com');
        cy.get('#exampleInputPassword1').clear().type('Admin123');
        cy.get('.btn').contains('Edit Profile').click();
        cy.get('.swal2-popup').should('be.visible');
        cy.contains('Success!').should('be.visible');
        cy.contains('Your profile has been updated').should('be.visible');
        cy.get('.swal2-confirm').contains('OK').should('be.visible');
    })
})