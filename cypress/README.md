Documento de Testes Cypress - BDD & POM
📌 1. Introdução
Este documento detalha a implementação de testes automatizados utilizando Cypress com o padrão Page Object Model (POM) e metodologia Behavior-Driven Development (BDD). O objetivo é garantir a qualidade e confiabilidade dos testes na aplicação.

📌 2. Metodologia Utilizada
🔹 Behavior-Driven Development (BDD)
O BDD facilita a comunicação entre times técnicos e não técnicos, usando linguagem natural (Gherkin) para descrever cenários.

Exemplo de um cenário em Gherkin:

gherkin
Feature: Pesquisa no Yahoo

  Como um usuário do Yahoo
  Quero realizar uma pesquisa
  Para encontrar resultados relevantes

  Scenario: Pesquisa válida por "Pacto Soluções"
    Given que estou na página de pesquisa do Yahoo
    When realizo uma busca por "Pacto Soluções"
    Then a descrição de um dos resultados deve conter "Pacto" e "Soluções"
    And a página deve estar na primeira posição ou exibir sua posição atual
Essa estrutura permite fácil entendimento e escrita dos testes.




Feature: Segurança e Privacidade do UOL

  Como um usuário do UOL
  Quero acessar a página de Segurança e Privacidade
  Para verificar se a última atualização está correta

  Scenario: Verificar se a página exibe a palavra "Atualização"
    Given que estou na página de Segurança e Privacidade do UOL
    When verifico o conteúdo da página
    Then deve existir a palavra "Atualização"

  Scenario: Capturar a data da última atualização
    Given que estou na página de Segurança e Privacidade do UOL
    When busco pela informação de atualização
    Then devo ver a última data registrada

🔹 Page Object Model (POM)
O POM organiza os testes separando página, ações e testes. Isso evita código duplicado e melhora a manutenção.

📌 3. Estrutura do Projeto
Os testes seguem esta estrutura:

cypress/
 ├── e2e/
 │   ├── features/            # Arquivos de testes em Gherkin (.feature)
 │   ├── step_definitions/     # Implementação dos passos dos testes
 │   ├── pages/                # Representação das páginas (POM)
 │   ├── actions/              # Métodos reutilizáveis para os testes
 │   ├── reports/              # Relatórios gerados pelo Mochawesome
 ├── cypress.config.js         # Configuração do Cypress
📌 4. Implementação dos Testes
🛠 Exemplo de Página - PesquisaPage.js
javascript
class PesquisaPage {
  constructor() {
    this.searchInput = 'input[name="p"]';
    this.resultadoDescricao = '.first > .dd > .compText > .fc-dustygray';
    this.posicaoPagina = '#cols';
    this.urlBase = 'https://search.yahoo.com/';
  }

  visitarPaginaPesquisa() {
    cy.visit(this.urlBase);
  }

  pesquisar(termo) {
    cy.get(this.searchInput).type(`${termo}{enter}`);
  }

  validarResultadoExiste() {
    cy.get(this.resultadoDescricao).should('exist');
  }

  validarDescricaoContemPactoSolucoes() {
    cy.get(this.resultadoDescricao)
      .invoke('text')
      .then((texto) => {
        expect(texto.toLowerCase()).to.include('pacto');
        expect(texto.toLowerCase()).to.include('soluções');
      });
  }

  validarPosicaoPagina() {
    cy.get(this.posicaoPagina)
      .invoke('text')
      .then((texto) => {
        if (texto.includes('1')) {
          cy.log('✅ A página está em primeiro lugar!');
        } else {
          cy.log(`🔎 A página está na posição: ${texto}`);
        }
      });
  }
}

export default new PesquisaPage();
✅ Exemplo de Ações - PesquisaActions.js
javascript
import PesquisaPage from '../pages/PesquisaPage.js';

class PesquisaActions {
  visitarPaginaPesquisa() {
    PesquisaPage.visitarPaginaPesquisa();
  }

  pesquisar(termo) {
    PesquisaPage.pesquisar(termo);
  }

  validarResultadoExiste() {
    PesquisaPage.validarResultadoExiste();
  }

  validarDescricaoContemPactoSolucoes() {
    PesquisaPage.validarDescricaoContemPactoSolucoes();
  }

  validarPosicaoPagina() {
    PesquisaPage.validarPosicaoPagina();
  }
}

export default new PesquisaActions();
📌 Exemplo de Teste BDD - TestePesquisa.feature
gherkin
Feature: Pesquisa no Yahoo

  Scenario: Pesquisa válida por "Pacto Soluções"
    Given que estou na página de pesquisa do Yahoo
    When realizo uma busca por "Pacto Soluções"
    Then a descrição de um dos resultados deve conter "Pacto" e "Soluções"
    And a página deve estar na primeira posição ou exibir sua posição atual
🛠 Steps dos Testes (pesquisaSteps.js)
javascript
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import PesquisaActions from '../../actions/PesquisaActions.js';

Given('que estou na página de pesquisa do Yahoo', () => {
  PesquisaActions.visitarPaginaPesquisa();
});

When('realizo uma busca por {string}', (termo) => {
  PesquisaActions.pesquisar(termo);
});

Then('a descrição de um dos resultados deve conter "Pacto" e "Soluções"', () => {
  PesquisaActions.validarDescricaoContemPactoSolucoes();
});

Then('a página deve estar na primeira posição ou exibir sua posição atual', () => {
  PesquisaActions.validarPosicaoPagina();
});
📌 5. Configuração de Relatórios (cypress.config.js)
Os testes utilizam Mochawesome para gerar relatórios em HTML e JSON, incluindo screenshots e vídeos em caso de falha.

javascript
const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "mochawesome-report",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      screenshots: true,
      timestamp: "mmddyyyy_HHMMss",
      reportFilename: "[name]-[datetime]",
    },
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: false,
  },
});
📌 6. Como Executar os Testes
🔹 Rodando Cypress normalmente
bash
npx cypress open
🔹 Executando um teste específico
bash
npx cypress run --spec "cypress/e2e/features/TestePesquisa.feature"
🔹 Gerando relatório após testes
bash
npx mochawesome-merge mochawesome-report/*.json > mochawesome-report/report.json
npx marge mochawesome-report/report.json -o mochawesome-final-report
Isso compila os relatórios JSON e gera um HTML consolidado.

📌 7. Conclusão
🔥 BDD (Cucumber) melhora a clareza dos testes

🚀 Page Object Model (POM) facilita manutenção e reuso

📊 Relatórios Mochawesome fornecem análise detalhada

📌 Executar testes é simples e eficaz