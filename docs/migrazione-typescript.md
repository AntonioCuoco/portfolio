# Guida alla Migrazione TypeScript

## Setup Completato

Il progetto è stato configurato per supportare TypeScript. Ecco cosa è stato fatto:

### 1. Pacchetti Installati
```bash
pnpm add -D typescript @types/react @types/react-dom
```

### 2. File di Configurazione Creati

- `tsconfig.json` - Configurazione TypeScript principale
- `tsconfig.node.json` - Configurazione per file di build (Vite)
- `vite.config.ts` - Convertito da .js a .ts

### 3. Script Aggiornati

Nel `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Come Migrare i File Esistenti

### Strategia Graduale

Puoi migrare i file gradualmente. Vite supporta sia `.jsx` che `.tsx` contemporaneamente.

### Passaggi per Migrare un File

1. Rinomina il file da `.jsx` a `.tsx`
2. Aggiungi i tipi alle props e allo state
3. Esegui `pnpm type-check` per verificare errori

---

## Pattern Comuni TypeScript

### 1. Props con Interface

```tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({ text, onClick, variant = "primary" }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>;
}
```

### 2. State Tipizzato

```tsx
const [count, setCount] = useState<number>(0);
const [items, setItems] = useState<string[]>([]);
```

### 3. Eventi

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget);
};
```

---

## Comandi Utili

```bash
pnpm type-check  # Controlla errori TypeScript
pnpm dev         # Dev con hot reload
pnpm build       # Build con type-check
```

---

**Data creazione**: 19 Febbraio 2026
