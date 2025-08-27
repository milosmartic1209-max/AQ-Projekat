# AQ Accounting - Lokalizacija Setup

## 3 načina pokretanja sa JSON podrškom:

### Opcija 1: Node.js server (preporučeno)
```bash
# Pokreni u terminalu:
node server.js

# Ili dvaput klikni na:
start-server.bat
```
Onda idi na: http://localhost:3000

### Opcija 2: NPX HTTP server (jednostavno)
```bash
npx http-server -p 3000 -o
```

### Opcija 3: Inline JSON (bez servera)
Otvori `index-with-json.html` direktno u browseru - JSON je ugrađen u HTML.

## Testiranje lokalizacije:
1. Klikni ME/EN dugmad u navbar-u
2. Ili u browser console kucaj:
   ```javascript
   setLanguage('en')  // prebaci na engleski
   setLanguage('me')  // prebaci na crnogorski
   testTranslation()  // debug info
   ```

## Fajlovi:
- `index.html` - glavna stranica (treba server za JSON)
- `index-with-json.html` - stranica sa ugrađenim JSON (radi bez servera)
- `script.js` - JavaScript za index.html
- `script-inline.js` - JavaScript za index-with-json.html
- `locales/me.json` - crnogorski prevodi
- `locales/en.json` - engleski prevodi
- `server.js` - lokalni Node.js server
- `start-server.bat` - pokretanje servera jednim klikom

## Debug:
Otvori Developer Tools (F12) da vidiš console poruke o učitavanju prevoda.
