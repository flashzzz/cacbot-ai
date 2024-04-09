describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="cypress-text"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/auth/login");
    cy.get('[data-testid="cypress-username"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/auth/login");
    cy.get('[data-testid="cypress-password"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/auth/forgot-password");
    cy.get('[data-testid="cypress-forgotUsername"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/main/upload");
    cy.get('[data-button="cypress-button"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/main/playground");
    cy.get('[data-testid="cypress-text"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/main/playground");
    cy.get('[data-testid="cypress-welcome"]')
      .should("exist")
      .should("have.text", "Welcome, ");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/main/my-keys");
    cy.get('[data-testid="cypress-addKey"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/main/my-account");
    cy.get('[data-testid="cypress-fullname"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/main/my-account");
    cy.get('[data-testid="cypress-username"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/main/my-account");
    cy.get('[data-testid="cypress-email"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/main/my-account");
    cy.get('[data-testid="cypress-delete-avatar"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/main/my-account");
    cy.get('[data-testid="cypress-change-avatar"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/main/my-account");
    cy.get('[data-testid="cypress-save"]').should("exist");
  });

  it("passes", () => {
    cy.visit("http://localhost:5173/main/my-account");
    cy.get('[data-testid="cypress-logout"]').should("exist");
  });
});
