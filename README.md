# Frontend - Bem Vindo ao Projeto do App ⧉ Controle de Atendimento ao Cidadão e acesso ao Serviço Público →

## Controle de atendimento Serviços Públicos

##

## obs: as fotos e nomes foram reaproveitadas principalmente da documentação dos Labs de aula.

Trata esta página, do 3º projeto requisitada pela IronHack:

## Annielli A. R. Cunha

## Bruno Prestes

## Sergio A. Francalino

## Anderson T. Toma

## Alunos do bootcamp, turma 92 da Ironhack: https://www.ironhack.com/br

Dada a necessidade de controle de atendimento aos serviços públicos e seus prédios, assim como a inexistência em vários locais públicos desse controle informatizado, nos propusemos o desenvolvimento deste aplicativo.

## Utilizou-se como base (proteção de rotas e usuário) o template criado em aula.

# Backend relacionado

### Este Frontend está relaciona ao backend no github: https://github.com/AnnielliRangel/projeto3-servidor

# Rotas - as rotas principais são as de usuário:

## /profile:

Profile dos usuários (admin/user)

### (páginas dos usuários), login, signup, e de informações cadastrais dos usuários

## /tabela

### tabela que mostra os cidadãos e da acesso aos registros de serviço e permite alterar status de atendimento:

### Chegada/ Geração de protocolo de atendimento -> aguardando -> em atendimento -> finalizado

### Clicando sobre os nomes dos cidadão é possível editá-los

### A Tabela tamém permite a consulta (filtros por nome, numero do documento, e pendentes (atendimento/aguardando) ativando checkbox

## /novocidadao

### Formulário de registro de novo Cidadão

## /update-pessoa

### página de destino a partir da Tabela, onde se edita o cidadão á criado

### para atualizar as informações dos cidadaãos - USER tem acesso

## usuário ADMIN - terá acesso a todos os users

#

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
