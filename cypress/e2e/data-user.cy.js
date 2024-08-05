describe('Data User Page Test Cases', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000');
        cy.contains("Login").click();
        cy.login();
    })

    it('Verify the Data User page display ID User, Name User, Phone User, Email User and Action for User', () => {
        cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
        cy.contains('Data User').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.contains('ID User').should('be.visible');
        cy.contains('Name User').should('be.visible');
        cy.contains('Phone User').should('be.visible');
        cy.contains('Email User').should('be.visible');
        cy.contains('Action User').should('be.visible');
    })

    it('Verify the Update Data User form display Name User, Phone User, Email User and Update User button', () => {
        cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
        cy.contains('Data User').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-edit').contains('Edit').click();
        cy.contains('Name User').should('be.visible');
        cy.contains('Phone User').should('be.visible');
        cy.contains('Email User').should('be.visible');
        cy.get('.formUpdate > .modal-footer > .btn').contains('Update User').should('be.visible');
    })

    it('Edit Data User with Null Values', () => {
        cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
        cy.contains('Data User').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-edit').contains('Edit').click()
        cy.get('.formUpdate > .modal-body > :nth-child(2) > .form-control').clear();
        cy.wait(1000);
        cy.get('.formUpdate > .modal-body > :nth-child(3) > .form-control').clear();
        cy.wait(1000);
        cy.get('.formUpdate > .modal-body > :nth-child(4) > .form-control').clear();
        cy.get('.modal-footer > .btn').contains('Update User').click();

        cy.get('.formUpdate > .modal-body > :nth-child(2) > .form-control').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })

    it('Edit Data User with Correct Values', () => {
        cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
        cy.contains('Data User').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-edit').contains('Edit').click()
        cy.wait(1000);
        cy.get('.formUpdate > .modal-body > :nth-child(2) > .form-control').clear().type('Admin Test');
        cy.get('.formUpdate > .modal-body > :nth-child(3) > .form-control').clear().type('081298761231');
        cy.get('.formUpdate > .modal-body > :nth-child(4) > .form-control').clear().type('admin@gmail.com');
        cy.get('.modal-footer > .btn').contains('Update User').click();
        cy.get('.swal2-popup').should('be.visible');
        cy.contains('Saved!').should('be.visible');
        cy.contains('Your changes have been saved').should('be.visible');
        cy.get('.swal2-confirm').contains('OK').click();
        cy.wait(2000);

        // Check Data
        cy.contains('Admin Test').should('be.visible');
        cy.contains('081298761231').should('be.visible');
        cy.contains('admin@gmail.com').should('be.visible');
        cy.get('.btn-edit').contains('Edit');
        cy.get('.btn-danger').contains('Delete');
    })

    it('Admin Canceled Delete Data User', () => {
        cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
        cy.contains('Data User').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-danger').contains('Delete').click();
        cy.contains('Are you sure?').should('be.visible');
        cy.contains("You won't be able to revert this!").should('be.visible');
        cy.get('.swal2-cancel').contains('Cancel').click();
        cy.contains('Data User').should('be.visible');

        // Check Data
        cy.contains('Admin Test').should('be.visible');
        cy.contains('081298761231').should('be.visible');
        cy.contains('admin@gmail.com').should('be.visible');
    })

    it('Admin Deleted Data User', () => {
        cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
        cy.contains('Data User').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-danger').contains('Delete').click();
        cy.contains('Are you sure?').should('be.visible');
        cy.contains("You won't be able to revert this!").should('be.visible');
        cy.get('.swal2-confirm').contains('Yes, delete it!').click();
        cy.get('.swal2-popup').should('be.visible');
        cy.contains('Success').should('be.visible');
        cy.contains('User deleted successfully.').should('be.visible');
        cy.get('.swal2-confirm').contains('OK').click();

        // Check Data
        cy.contains('Admin Test').should('not.exist');
        cy.contains('081298761231').should('not.exist');
        cy.contains('admin@gmail.com').should('not.exist');
    })

    it('Verify that Admins cannot delete a user if user has already created a schedule', () => {
        cy.get(':nth-child(2) > .nav-item > .nav-link > .fas').click();
        cy.contains('Data User').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('$ is not defined')) {
                return false;
            }
            return true;
        });
        cy.get('.btn-danger').contains('Delete').click();
        cy.contains('Are you sure?').should('be.visible');
        cy.contains("You won't be able to revert this!").should('be.visible');
        cy.get('.swal2-confirm').contains('Yes, delete it!').click();
        cy.get('.swal2-popup').should('be.visible');
        cy.contains('Error').should('be.visible');
        cy.contains('Cannot delete this user because this user has a schedule.').should('be.visible');
        cy.get('.swal2-confirm').contains('OK');

    })
})