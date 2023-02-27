/// <reference types="Cypress" />

import { loginPage } from "../page_objects/loginPage";
import { addBoardPage } from "../page_objects/addBoardPage";

let credential = {
    validEmail: "sundjer@yahoo.com",
    validPassword: "sundjer123"
};

describe("add board", () => {
    beforeEach("visit app and click the login link", () => {
        cy.intercept({
            method: "POST",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
        }).as("successfullogin");
        cy.visit("/");
        loginPage.login(credential.validEmail, credential.validPassword);
        cy.wait("@successfullogin").then((interception) => {
            expect(interception.response.statusCode).eq(200);
        });
    });  
    it("add board", () => {
        cy.intercept({
            method: "POST",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations"
        }).as("addBoard");
       
       addBoardPage.addBoard("nesto");
    }) 
})
