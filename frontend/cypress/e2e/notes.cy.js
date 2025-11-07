describe('Notes Management E2E Test', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('/');
    // Wait for the page to load
    cy.contains('Notes Manager', { timeout: 10000 }).should('be.visible');
  });

  it('should create, edit, and delete a note', () => {
    // Create a new note
    const noteTitle = `Test Note ${Date.now()}`;
    const noteContent = 'This is a test note content for e2e testing.';

    cy.get('input[id="title"]').should('be.visible').type(noteTitle);
    cy.get('textarea[id="content"]').should('be.visible').type(noteContent);
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').contains('Save').click();
    });

    // Wait for API call and verify the note appears in the list
    cy.contains(noteTitle, { timeout: 5000 }).should('be.visible');
    cy.contains(noteContent).should('be.visible');

    // Edit the note - find the note item and click edit
    cy.contains(noteTitle).parents('.note-item').within(() => {
      cy.get('button').contains('Edit').click();
    });

    // Wait for form to be populated
    cy.get('input[id="title"]').should('have.value', noteTitle);

    // Update the note
    const updatedTitle = `${noteTitle} - Updated`;
    const updatedContent = `${noteContent} Updated content.`;

    cy.get('input[id="title"]').clear().type(updatedTitle);
    cy.get('textarea[id="content"]').clear().type(updatedContent);
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').contains('Save').click();
    });

    // Verify the note was updated
    cy.contains(updatedTitle, { timeout: 5000 }).should('be.visible');
    cy.contains(updatedContent).should('be.visible');

    // Delete the note - set up confirm handler before clicking delete
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true);
    });

    cy.contains(updatedTitle).parents('.note-item').within(() => {
      cy.get('button').contains('Delete').click();
    });

    // Verify the note is deleted
    cy.contains(updatedTitle, { timeout: 5000 }).should('not.exist');
  });

  it('should change language', () => {
    // Change to Russian
    cy.get('select.language-select').select('ru');
    cy.contains('Менеджер заметок').should('be.visible');
    cy.contains('Добавить заметку').should('be.visible');

    // Change to Spanish
    cy.get('select.language-select').select('es');
    cy.contains('Gestor de Notas').should('be.visible');
    cy.contains('Añadir Nota').should('be.visible');

    // Change back to English
    cy.get('select.language-select').select('en');
    cy.contains('Notes Manager').should('be.visible');
    cy.contains('Add Note').should('be.visible');
  });
});

