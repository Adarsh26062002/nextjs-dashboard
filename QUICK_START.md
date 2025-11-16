# Quick Start Guide

## What's Been Set Up

✅ Pokemon data embedded in `/src/data/db.json`  
✅ Next.js API routes to serve Pokemon data (no external server needed!)  
✅ Environment variables configured in `.env.local`  
✅ Multi-language support (English, Japanese, Chinese)

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Generate Authentication Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and update the `NEXTAUTH_SECRET` in your `.env.local` file.

### 3. Start the Development Server

```bash
pnpm run dev
```

### 4. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Login Credentials:**
- Username: `Username`
- Password: `Password`

### 5. View Pokemon Data

After logging in, navigate to the Pokemon page or click on "Sample" in the sidebar.

---

## How It Works

### No External Server Required!

The Pokemon data is served through Next.js API routes:

- **API Routes**: `/src/app/api/[...path]/route.ts`
- **Data Source**: `/src/data/db.json`
- **Endpoints**:
  - `/api/en_pokemons` - English Pokemon list
  - `/api/ja_pokemons` - Japanese Pokemon list
  - `/api/zh_pokemons` - Chinese Pokemon list
  - `/api/en_pokemons/1` - Single Pokemon by ID
  - `/api/en_types` - Pokemon types
  - `/api/en_egg_groups` - Egg groups
  - (Same patterns for `ja_` and `zh_` locales)

### Environment Variables

Located in `.env.local`:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret
NEXT_PUBLIC_POKEMON_LIST_API_BASE_URL=http://localhost:3000/api/
```

---

## Adding More Pokemon

Edit `/src/data/db.json` and add more Pokemon to the appropriate locale arrays:

```json
{
  "en_pokemons": [
    {
      "id": 11,
      "identifier": "metapod",
      "pokemondb_identifier": "metapod",
      "name": "Metapod",
      "types": [{ "id": 7, "identifier": "bug", "name": "Bug" }],
      "egg_groups": [{ "id": 5, "identifier": "bug", "name": "Bug" }],
      "hp": 50,
      "attack": 20,
      "defense": 55,
      "special_attack": 25,
      "special_defense": 25,
      "speed": 30,
      "total": 205
    }
  ]
}
```

The API will automatically serve the new data!

---

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Setup Pokemon dashboard with embedded data"
git push
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `NEXTAUTH_URL`: `https://yourdomain.vercel.app`
   - `NEXTAUTH_SECRET`: Generate a new one with `openssl rand -base64 32`
   - `NEXT_PUBLIC_POKEMON_LIST_API_BASE_URL`: `https://yourdomain.vercel.app/api/`
4. Deploy!

**That's it!** No external API server needed - everything is bundled with your Next.js app.

---

## Troubleshooting

### "Maximum number of retries reached"

**Solution:** Restart your dev server after creating/modifying `.env.local`

```bash
# Stop the server (Ctrl+C) then:
pnpm run dev
```

### Pokemon images not loading

The app uses PokemonDB images. Make sure the `pokemondb_identifier` in your data matches the Pokemon's identifier on [PokemonDB](https://pokemondb.net/).

### Changes to db.json not reflected

Restart your dev server to pick up changes to the data file.

---

## Features

- 🎨 Light/Dark theme toggle
- 🌍 Multi-language (English, Japanese, Chinese)
- 📊 Interactive charts and widgets
- 🎮 Pokemon CRUD operations
- 📱 Fully responsive
- ⚡ Fast - all data served from Next.js API routes
- 🔐 NextAuth.js authentication

Enjoy your Pokemon Dashboard! 🎉
