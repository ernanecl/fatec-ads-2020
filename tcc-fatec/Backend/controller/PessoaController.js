const PessoaDao = require("../dao/PessoaDao");
const UsuarioController = require("./UsuarioController");
const { validationResult } = require("express-validator");
const alterarRgCpf = require("../utils/alterarRgCpf");
const verificarAlteracao = require("../utils/verificarAlteracao");
const verificarResultado = require("../utils/verificarResultado");
const formatarMascaras = require("../utils/formatarMascaras");

const pessoaDao = new PessoaDao();
const usuarioController = new UsuarioController();

class PessoasController {
  listar(req, res) {
    const cpf = req.params.cpf;

    pessoaDao.listarPorCpf(cpf, (erro, resultado) => {
      if (erro) {
        console.log("Ocorreu um erro " + erro);
        res.status(500).send("Ocorreu um erro");
        return;
      }
      verificarResultado(resultado, res);
    });
  }
  cadastrar(req, res) {
    const pessoa = req.body;
    let formatado = formatarMascaras(pessoa);
    let erros = validationResult(req);
    //verificando se houve erro de validação
    if (!erros.isEmpty()) {
      console.log("Ocorreram erros na validação " + JSON.stringify(erros));
      res.send("Erros de validação " + JSON.stringify(erros));
    } else {
      //Fazendo a inserção de pessoa na tabela de usuário
      usuarioController.inserirUsuario(pessoa.email, pessoa.senha, formatado.cpf, 0);//Não para dizer que não é funcionário
      //inserindo o pessoa na tabela de pessoas
      pessoaDao.inserir(formatado, (erro) => {
        if (erro) {
          console.log(erro);
        } else {
          console.log("Pessoa cadastrado!");
          res.status(201).send("Cadastrado com sucesso!");
        }
      });
    }
  }

  atualizar(req, res) {
    const email = req.params.email;
    const valores = req.body;
    //Verificando se está tentando alterar rg ou cpf
    if (alterarRgCpf(valores, res)) {
      return;
    } else {
      pessoaDao.atualizar(email, valores, (erro, resultado) => {
        if (erro) {
          console.log("Ocorreu um erro");
          res.status(500).send("Ocorreu um erro");
          return;
        }
        if (verificarAlteracao(res, resultado.changedRows)) {
          console.log("Alterado com sucesso!");
          res.status(200).send("Alterado com sucesso!");
        }
      });
    }
  }
}

module.exports = PessoasController;
