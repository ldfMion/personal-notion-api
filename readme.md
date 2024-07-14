On deploying express to vercel:

https://dev.to/tirthpatel/deploy-node-ts-express-typescript-on-vercel-284h

# Deployment

1. Build `npm run build`
2. Comment out `app.listen` from src/index.js
3. Run `vercel dev` to test the deployment
4. Run `vercel` to deploy to preview
5. Run `vercel --prod` to deploy to production

# Todo:

-   Add environment variable that dispenses the need to comment `app.listen`
