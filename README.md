# Projektalapú szoftverfejlesztés - Túlélésanalízis

## Projekt leírása
Angular alapú SPA, amely a dotnet WebAPI-nak nyújt felhasználói felületet.

## Projekt deploy
**Legalább Angular 14 CLI kell hozzá!!**

Dependenciák letöltése
```bash
npm install -f
```

`apiUrl` átírása `environment.prod.ts-ben` az éles API elérésére.

Buildelés:

```bash
ng build
```

`./dist/` mappa tartalmát kihelyezni egy Apache domainra.

Kész.
