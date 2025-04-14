# MiniBlog

MiniBlog é um projeto de blog minimalista construído com React e Vite, utilizando várias bibliotecas modernas para proporcionar uma experiência rica e eficiente para o usuário e desenvolvedor. Esta aplicação permite que os usuários criem, editem e excluam posts, além de pesquisar por conteúdo existente.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de build e desenvolvimento rápida e com suporte a HMR (Hot Module Replacement).
- **Firebase**: Plataforma de desenvolvimento de aplicativos que fornece o backend da aplicação.
- **Ant Design**: Biblioteca de componentes UI para React.
- **React Router**: Biblioteca de roteamento para Single Page Applications em React.

## Funcionalidades

- **Autenticação de Usuários**: Usando o Firebase Authentication, os usuários podem registrar-se, fazer login, e gerenciar suas sessões.
- **CRUD de Postagens**: Usuários autenticados podem criar, visualizar, editar e deletar postagens.
- **Pesquisa de Conteúdo**: Funcionalidade para pesquisar posts existentes por palavras-chave.
- **Interface Responsiva**: Design adaptado para diversos tamanhos de tela.

## Estrutura do Projeto

- **src/components**: Contém componentes reutilizáveis como Header, Footer, e PostDetail.
- **src/pages**: Inclui componentes de página como Home, Dashboard, Login, Register, etc.
- **src/hooks**: Contém hooks personalizados para abstrair operações como autenticação, inserção e atualização de documentos.
- **src/context**: Define contextos do React, como AuthContext, para gerenciar estados globais.

## Como Executar o Projeto

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/victorgpd/miniblog.git
   ```
2. **Instale as Dependências**:
   ```bash
   npm install
   ```
3. **Configure o Firebase**:

   - Atualize o arquivo `src/firebase/config.jsx` com suas credenciais do Firebase.

4. **Execute o Projeto em Desenvolvimento**:

   ```bash
   npm run dev
   ```

5. **Build para Produção**:

   ```bash
   npm run build
   ```

6. **Deploy**:
   ```bash
   npm run deploy
   ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
