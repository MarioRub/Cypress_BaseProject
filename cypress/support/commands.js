// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
let LOCAL_STORAGE_MEMORY = {};
Cypress.Commands.add("login", (admin = true) => {
    Cypress.log({
        name: "loginViaAuth0"
    });

    const options = {
        method: "POST",
        url: Cypress.env("auth_url"),
        body: {
            grant_type: "password",
            username: Cypress.env(
                `${admin ? "auth_username" : "auth_user_employee"}`
            ),
            password: Cypress.env("auth_password"),
            audience: Cypress.env("auth_audience"),
            scope: "openid profile email",
            client_id: Cypress.env("auth_client_id"),
            client_secret: Cypress.env("auth_client_secret")
        }
    };
    cy.request(options)
        .then(resp => {
            return resp.body;
        })
        .then(body => {
            const { access_token, expires_in, id_token } = body;
            const auth0State = {
                nonce: "",
                state: "some-random-state"
            };
            const callbackUrl = `?callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state
                }`;

            cy.visit(callbackUrl, {
                onBeforeLoad(win) {
                    win.document.cookie =
                        "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
                }
            });
        });
});
Cypress.Commands.add("saveLocalStorageCache", () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add('forceVisit', url => {
    cy.window().then(win => {
        return win.open(url, '_self');
    });
});

Cypress.Commands.add("restoreLocalStorageCache", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

Cypress.Commands.add("clearLocalStorageCache", () => {
    localStorage.clear();
    LOCAL_STORAGE_MEMORY = {};
});

Cypress.Commands.add("visitAndWait", (appRoute, endPoints) => {
    cy.server();

    // iterate over endpoints and alias them
    endPoints.forEach(({ route, alias }) => {
        cy.route(route).as(alias);
    });

    // visit a page in your application
    cy.visit(appRoute);

    // wait for all of the endpoints to respond before beginning tests
    cy.wait(endPoints.map(({ alias }) => `@${alias}`));
});