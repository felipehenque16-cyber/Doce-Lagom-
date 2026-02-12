git init
git add .
git commit -m "primeiro commit"
git remote add origin https://github.com/seu-usuario/nome-do-repo.git
git push -u origin main

git add vercel.json
git commit -m "configura rotas na Vercel"
git push
