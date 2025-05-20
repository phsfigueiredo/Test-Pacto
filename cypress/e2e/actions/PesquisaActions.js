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
