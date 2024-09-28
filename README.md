💻 Sobre o projeto

🔔 Página de Liquidação de Ofertas 💻

## Descrição

Página web para a liquidação de ofertas de investimento. Esta página exibi as informações de 
ofertas retornadas por um endpoint de API e permitir que o investidor visualize os detalhes 
de cada oferta e faça o upload dos comprovantes de pagamento.

<br>
<hr>
<div align="center">
	<img width="140" margin-right="30px" src="src/app/assets/to_readme/Tela_001.png">	
	<img width="240" src="src/app/assets/to_readme/Tela_002.png">
	<br>
	<img width="590" src="src/app/assets/to_readme/Tela_003.png">
</div>
<hr>
<br>

## Estrutura

    Sale-Page
    ├── src                            (Diretório principal dos arquivos do projeto)
    │   ├── assets                     (Recursos de folhas de estilo, scripts, fontes e imagens)
    │   ├── components                 (Componentes que não possuem estados, são chamados de dummy components)
    │   ├── services                   (Utilizado para transferir dados através de protocolos de comunicação para diferentes plataformas)
    ├── README.md                      (Breve definição/Documentação)
    └── ...                            (Outros arquivos de configuração)

### Ferramentas

- [NextJS](https://nextjs.org/)

- [StyledComponents](https://styled-components.com/)

- [TypeScript](https://www.typescriptlang.org/)

- [Axios](https://axios-http.com/ptbr/docs/intro)

- [Git](https://git-scm.com/doc)

- [Vercel](https://vercel.com/docs)

### Montagem do ambiente de desenvolvimento

O primeiro passo é clonar o projeto utilizando o método HTTPS ou SSH.

SSH

```sh
git clone git@github.com:eosantos/sale-page.git
```

HTTPS

```sh
git clone https://github.com/eosantos/sale-page.git
```

### Instalar dependências do projeto

Com o comando abaixo instalamos todos os pacotes definidos no package.json para configuração do servidor local:

```sh
npm i
```

### Acessando a aplicação

Para iniciar o projeto basta executar o comando abaixo:

```sh
npm run dev
```
Após a execução do comando acima basta abrir o link `http://localhost:3000`.

### Chaves de Ambiente

Crie um arquivo .env.local na raiz do projeto e adicione a chave.

````
NEXT_PUBLIC_API_URL=https://66d62a1ef5859a704268886b.mockapi.io/api/v1/oferta
````

### Deploy

Acesse o site aqui

- [Sale Page](https://sale-page-pied.vercel.app/)

### Commit

Para nossos commits utilizamos a seguinte estrutura:

```
feat: mensagem curta
^--^  ^------------^
|     |
|     +-> Resumo da alteração
|
+-------> Tipos: chore, docs, feat, fix, refactor, style, or test.
```

#### Exemplos

- `feat/feature`: (novo recurso para o usuário, não um novo recurso para script de compilação)
- `fix`: (correção de bug para o usuário, não uma correção para um script de construção)
- `docs`: (alterações na documentação)
- `style`: (formatação, ponto e vírgula faltando etc; sem alteração do código de produção)
- `refactor`: (refatorando o código de produção, por exemplo, renomeando uma variável)
- `test`: (adicionando testes ausentes, testes de refatoração; nenhuma alteração no código de produção)
- `chore`: (atualização de tarefas e etc; sem alteração do código de produção)
