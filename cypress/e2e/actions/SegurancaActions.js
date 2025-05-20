import SegurancaPage from '../pages/SegurancaPage.js';

class SegurancaActions {
  visitarPaginaSeguranca() {
    SegurancaPage.visitarPaginaSeguranca();
  }

  validarPalavraAtualizacao() {
    SegurancaPage.validarPalavraAtualizacao();
  }

  capturarDataAtualizacao() {
    SegurancaPage.capturarDataAtualizacao();
  }
}

export default new SegurancaActions();
