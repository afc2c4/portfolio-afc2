# DevFolio - Portfólio para Desenvolvedores

Este projeto é um portfólio profissional de alta performance, construído com Next.js 15, Tailwind CSS e Firebase (Firestore/Auth).

## 🚀 Como enviar para o seu GitHub

Para enviar o código para o seu repositório [portfolio-afc2](https://github.com/afc2c4/portfolio-afc2), abra o seu terminal e execute os seguintes comandos:

1. **Inicialize o Git** (caso ainda não tenha feito):
   ```bash
   git init
   ```

2. **Adicione o repositório remoto**:
   ```bash
   git remote add origin https://github.com/afc2c4/portfolio-afc2.git
   ```

3. **Verifique se há arquivos para commit**:
   ```bash
   git add .
   ```

4. **Crie o seu primeiro commit**:
   ```bash
   git commit -m "feat: estrutura completa do portfólio com firebase e painel admin"
   ```

5. **Envie para o GitHub**:
   ```bash
   git push -u origin main
   ```
   *Nota: Se o comando acima der erro, tente `git push -u origin master`.*

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Next.js (App Router), React, Shadcn UI, Tailwind CSS.
- **Backend:** Firebase Firestore (Banco de dados em tempo real).
- **Segurança:** Firebase Authentication (Restrito ao administrador).
- **IA:** Genkit para sugestão automática de tags técnicas.

## 📦 Deploy Automático

Este projeto já contém o arquivo `apphosting.yaml`. Isso significa que assim que você fizer o push para o GitHub, você pode conectar este repositório ao **Firebase App Hosting** no console do Firebase para ter deploy automático a cada novo commit.

---
*Desenvolvido com carinho no Firebase Studio.*
