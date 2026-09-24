# setup-library

Scaffolds a TypeScript library that publishes to npm through GitHub. The generated project uses Vite+ for tooling, builds with `vp pack`, and ships type declarations. Releases use npm's OIDC trusted publishing with staged releases.

## Usage

```bash
vpx @hurshb50/setup-library@latest <library-name> --personal-github-username <username> --personal-name <name> --personal-email <email>
```

```bash
vpx @hurshb50/setup-library@latest hello-library --personal-github-username hurshb50 --personal-name "Hursh Patel" --personal-email hurshb50@gmail.com
```

Pass `--directory <path>` to generate the project somewhere other than `./<library-name>`.

## What you get

- A Vite+ TypeScript library with an entrypoint at `source/index.ts` and a starter test beside it
- A scoped `package.json` with `exports`, built for npm
- A `.gitignore` and an initialized git repository
- GitHub Actions workflows that stage npm releases and publish GitHub releases
- A generated README that walks through the one-time GitHub and npm setup
