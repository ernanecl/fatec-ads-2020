class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarUsuario();
    this.criarFuncionarios();
    this.criarPessoa();
    this.criarOrganizacao();
    this.criarContato();
    this.criarEvento();
    this.criarInscricao();
  }

  criarFuncionarios() {
    const sql = `
            CREATE TABLE IF NOT EXISTS funcionarios( 
                nome VARCHAR(200) NOT NULL,
                rg VARCHAR(9) NOT NULL, 
                cpf VARCHAR(11) NOT NULL, 
                cargo VARCHAR(100) NOT NULL, 
                end VARCHAR(150) NOT NULL, 
                bairro VARCHAR(100) NOT NULL, 
                cidade VARCHAR(100) NOT NULL, 
                cep VARCHAR(8) NOT NULL, 
                fone VARCHAR(11) NOT NULL, 
                email VARCHAR(200) NOT NULL, 
                senha VARCHAR(30) NOT NULL,
                PRIMARY KEY(cpf),
                FOREIGN KEY (email) REFERENCES usuarios(email)
              )
        `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log("Houve um erro " + erro);
      } else {
        console.log("Tabela funcionários foi criada!");
      }
    });
  }
  criarPessoa() {
    const sql = `
            CREATE TABLE IF NOT EXISTS pessoas(
                nome VARCHAR(200) NOT NULL,
                rg VARCHAR(9) NOT NULL, 
                cpf VARCHAR(11) NOT NULL,
                end VARCHAR(150) NOT NULL,
                bairro VARCHAR(100) NOT NULL, 
                cidade VARCHAR(100) NOT NULL, 
                cep VARCHAR(8) NOT NULL, 
                fone VARCHAR(11) NOT NULL, 
                email VARCHAR(200) NOT NULL, 
                senha VARCHAR(30) NOT NULL, 
                PRIMARY KEY (cpf),
                FOREIGN KEY (email) REFERENCES usuarios(email)
            )
        `;

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log("Houve um erro " + erro);
      } else {
        console.log("Tabela pessoa criada!");
      }
    });
  }

  criarOrganizacao() {
    const sql = `
        CREATE TABLE IF NOT EXISTS organizacoes(
                nome VARCHAR(200) NOT NULL,
                end VARCHAR(150) NOT NULL,
                bairro VARCHAR(100) NOT NULL, 
                cidade VARCHAR(100) NOT NULL, 
                cep VARCHAR(8) NOT NULL,                
                fone VARCHAR(11) NOT NULL, 
                email VARCHAR(200) NOT NULL, 
                cnpj VARCHAR(14) NOT NULL,
                senha VARCHAR(30) NOT NULL, 
                finsLucrativos VARCHAR(3) NOT NULL,
                PRIMARY KEY (cnpj),
                FOREIGN KEY (email) REFERENCES usuarios(email)
        )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log("Houve um erro " + erro);
      } else {
        console.log("Tabela organização criada!");
      }
    });
  }

  criarContato() {
    const sql = `
        CREATE TABLE IF NOT EXISTS contato(
            cod INT AUTO_INCREMENT NOT NULL, 
            nome VARCHAR(200) NOT NULL, 
            email VARCHAR(200) NOT NULL, 
            tel VARCHAR(11) NOT NULL, 
            msg text NOT NULL, 
            PRIMARY KEY(cod)
        )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log("Houve um erro " + erro);
      } else {
        console.log("Tabela contato criada!");
      }
    });
  }

  criarEvento() {
    const sql = `
      CREATE TABLE IF NOT EXISTS eventos(
        cod INT AUTO_INCREMENT NOT NULL, 
        nome VARCHAR(200) NOT NULL,
        organizador VARCHAR(200) NOT NULL,  
        data DATE NOT NULL,
        imagem LONGBLOB NULL, 
        hora TIME NOT NULL, 
        inscricao VARCHAR(3) NOT NULL,  
        ficha text NOT NULL, 
        duracao VARCHAR(10) NOT NULL, 
        descricao text NOT NULL, 
        categoria VARCHAR(200) NOT NULL, 
        visibilidade VARCHAR(100) NOT NULL,
        termo LONGBLOB NULL,
        PRIMARY KEY(cod)
    )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log("Houve um erro " + erro);
      } else {
        console.log("Tabela evento criada!");
      }
    });
  }

  //ESSE CÓDIGO VAI SER AUTO INCREMENT OU DIGITADO PELO USUARIO?
  criarInscricao() {
    const sql = `
      CREATE TABLE IF NOT EXISTS inscricoes(
        cod INT AUTO_INCREMENT NOT NULL, 
        nomeEvento VARCHAR(200), 
        qtd INT, 
        preco DECIMAL(6,2), 
        dataInicio DATE, 
        dataFinal DATE,
        horaInicio TIME,
        horaFinal TIME, 
        disponibilidade VARCHAR(50), 
        descricao VARCHAR(100), 
        PRIMARY KEY (cod),
        FOREIGN KEY (cod) REFERENCES eventos(cod)
      )
    `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela inscrição criada!");
      }
    });
  }

  criarUsuario() {
    const sql = `
      CREATE TABLE IF NOT EXISTS usuarios(
        email VARCHAR(200) NOT NULL, 
        senha VARCHAR(30) NOT NULL, 
        identificacao VARCHAR(15) NOT NULL, 
        ehFuncionario BIT NOT NULL,
        PRIMARY KEY (email)
      )
    `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela usuário criada!");
      }
    });
  }

  criarCalendario() {
    const sql = `
      CREATE TABLE IF NOT EXISTS calendario(
      nomeEvento VARCHAR(200) NOT NULL, 
      descricaoEvento VARCHAR(30) NOT NULL, 
      data DATE NOT NULL,
      hora 
    )
    `;
  }
}

module.exports = new Tabelas();
