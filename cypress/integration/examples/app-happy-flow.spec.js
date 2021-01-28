describe('Happy Flow', () => {
  it('Visit URL', () => {
    cy.visit('http://localhost:4200')
  })

  it('Check Navigation bar buttons', () => {
    cy.contains('Home')
    cy.contains('Projects')
  })

  it('Click projects page and view the list of your projects', () => {
    cy.contains('Projects').click()
    cy.url().should('include', '/view-projects')
    cy.contains('Create New Project')
  })

  it('Enter the new project form', () => {
    cy.contains('Create New Project').click()
    cy.url().should('include', '/project')
  })

  it('Writing an invalid project name and invalid url should show errors', () => {
    cy.get('#name')
      .type('b')
      .should('have.value', 'b').blur()
    cy.get('#url')
      .type('b')
      .should('have.value', 'b').blur()
    cy.contains('Project Name must be at least 3 letters')
    cy.get('button[type=submit]').should('be.disabled')
  })

  it('Writing an valid project name and a valid url should enable create button', () => {
    cy.get('#name').clear()
    cy.get('#url').clear()
    cy.get('#name')
      .type('Test')
      .should('have.value', 'Test').blur()
    cy.get('#url')
      .type('https://test.com')
      .should('have.value', 'https://test.com').blur()
    cy.get('button[type=submit]').should('be.enabled')
  })

  it('Creating a new project should lead you to project page', () => {
    cy.get('button[type=submit]').click()
    cy.contains('Successfully created Project Test')
    cy.contains(`Project Test's Page`)
    cy.contains('Create New Resource')
    cy.contains('Create New Model')
  })

  it('Clicking on create new resource should lead to you resource page', () => {
    cy.contains('Create New Resource').click()
    cy.url().should('include', '/model')
  })
})
