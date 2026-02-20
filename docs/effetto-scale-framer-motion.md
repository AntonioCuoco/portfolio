# Documentazione: Effetti Animati con Framer Motion

## Panoramica
Questo documento descrive gli effetti animati implementati nel portfolio utilizzando Framer Motion e React.

## Tecnologie Utilizzate
- **React** - Framework UI
- **TypeScript** - Type safety
- **Framer Motion** - Libreria per animazioni
- **Tailwind CSS** - Styling

---

# Indice degli Effetti

1. [Effetto Scale (Card Expansion)](#effetto-scale)
2. [Effetto Text Scramble](#effetto-text-scramble)

---

<a name="effetto-scale"></a>
# 1. Effetto Scale con Framer Motion

## Descrizione
Effetto di transizione scale dove un elemento si espande da una piccola card a schermo intero quando viene cliccato.

## Concetti Chiave

### 1. Shared Layout Animation con `layoutId`
Il cuore dell'effetto è la proprietà `layoutId` di Framer Motion. Quando due componenti condividono lo stesso `layoutId`, Framer Motion crea automaticamente una transizione fluida tra di loro.

### 2. AnimatePresence
Gestisce l'animazione di entrata e uscita dei componenti che vengono montati/smontati dal DOM.

---

## Implementazione

### Struttura dei File
```
src/
├── pages/
│   ├── Landing.jsx    # Pagina iniziale con la card
│   └── Home.jsx       # Pagina espansa a schermo intero
```

---

## Codice Completo

### Landing.jsx - Componente Iniziale

```jsx
import { useState } from "react";
import { motion, AnimatePresence} from "framer-motion";
import Home from "@/pages/Home";

export default function Landing() {
    const [open, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen min-w-screen flex flex-row justify-between items-center px-16 bg-[#F5F5F5]">
            <h1 className={`text-3xl ${open && "hidden"}`}>ANTONIO CUOCO</h1>
            
            {/* Card cliccabile che si espande */}
            <motion.div
                layoutId="card"
                className="w-[25vw] h-[30vw] bg-black flex justify-center items-center cursor-pointer"
                layout
                onClick={() => setIsOpen(!open)}
            >
                <p className={`text-[#f5f5f5] text-2xl ${open && "hidden"}`}>ENTER</p>
            </motion.div>
            
            <h1 className={`text-3xl ${open && "hidden"}`}>
                <span className="-ml-6">CREATIVE</span><br /> 
                FRONTEND<br /> 
                <span className="ml-4">DEVELOPER</span>
            </h1>

            {/* Gestisce l'animazione di entrata/uscita */}
            <AnimatePresence>
                {open && <Home onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </div>
    );
}
```

#### Spiegazione Landing.jsx

1. **State Management**
   ```jsx
   const [open, setIsOpen] = useState(false);
   ```
   Controlla se la card è espansa o meno.

2. **motion.div con layoutId**
   ```jsx
   <motion.div
       layoutId="card"
       className="w-[25vw] h-[30vw] bg-black"
       layout
       onClick={() => setIsOpen(!open)}
   >
   ```
   - `layoutId="card"` - Identificatore univoco per la transizione
   - `layout` - Abilita l'animazione automatica dei cambiamenti di layout
   - `onClick` - Toggle dello stato per aprire/chiudere

3. **Conditional Rendering**
   ```jsx
   {open && <Home onClose={() => setIsOpen(false)} />}
   ```
   Quando `open` è true, monta il componente Home.

---

### Home.jsx - Componente Espanso

```jsx
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="min-h-screen min-w-screen flex flex-col gap-6 md:gap-10 bg-[#F5F5F5] font-bespoke px-4 md:px-6 py-4">
            <motion.div
                layoutId="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 100,
                    background: "linear-gradient(150deg, #060606, #050505)",
                    borderRadius: 0
                }}
            >
                {/* Contenuti che compaiono DOPO l'espansione */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    style={{ padding: 40, color: "white" }}
                >
                    <h1>Contenuto della pagina</h1>
                    <p>Testo, CTA, immagini, ecc.</p>
                </motion.div>
            </motion.div>
        </div>
    );
}
```

#### Spiegazione Home.jsx

1. **Stesso layoutId**
   ```jsx
   layoutId="card"
   ```
   Deve corrispondere al `layoutId` in Landing.jsx per creare la transizione.

2. **Stati dell'Animazione**
   ```jsx
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
   ```
   - `initial` - Stato iniziale quando il componente viene montato
   - `animate` - Stato finale dell'animazione
   - `exit` - Stato quando il componente viene smontato

3. **Transizione Spring**
   ```jsx
   transition={{ type: "spring", stiffness: 200, damping: 30 }}
   ```
   - `type: "spring"` - Animazione elastica naturale
   - `stiffness: 200` - Rigidità della molla (più alto = più veloce)
   - `damping: 30` - Smorzamento (più alto = meno rimbalzo)

4. **Posizionamento Fixed**
   ```jsx
   style={{
       position: "fixed",
       inset: 0,
       zIndex: 100,
       background: "linear-gradient(150deg, #060606, #050505)",
       borderRadius: 0
   }}
   ```
   - `position: fixed` + `inset: 0` - Copre l'intero viewport
   - `zIndex: 100` - Si sovrappone agli altri elementi
   - `borderRadius: 0` - Rimuove gli angoli arrotondati durante l'espansione

5. **Contenuto Ritardato**
   ```jsx
   <motion.div
       initial={{ opacity: 0, y: 40 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.25 }}
   >
   ```
   Il contenuto interno appare con un ritardo di 0.25s dopo l'espansione della card.

---

## Come Funziona l'Effetto

### Sequenza dell'Animazione

1. **Stato Iniziale**
   - Card piccola (25vw × 30vw) centrata nella pagina Landing
   - Testo "ENTER" visibile

2. **Click sulla Card**
   - `setIsOpen(true)` viene chiamato
   - Il componente Home viene montato

3. **Transizione Magica**
   - Framer Motion rileva due elementi con `layoutId="card"`
   - Calcola automaticamente la differenza di posizione, dimensione e stile
   - Anima fluidamente da uno stato all'altro

4. **Stato Finale**
   - La card si espande a schermo intero
   - Il contenuto interno appare con fade-in e slide-up
   - Gli elementi della Landing vengono nascosti

---

## Parametri Personalizzabili

### Velocità dell'Animazione
```jsx
transition={{ type: "spring", stiffness: 200, damping: 30 }}
```
- Aumenta `stiffness` per animazioni più veloci
- Aumenta `damping` per ridurre il rimbalzo

### Ritardo del Contenuto
```jsx
transition={{ delay: 0.25 }}
```
- Modifica il valore per cambiare quando appare il contenuto

### Dimensioni Card Iniziale
```jsx
className="w-[25vw] h-[30vw]"
```
- Usa unità viewport (vw) per dimensioni responsive

---

## Best Practices

1. **layoutId Univoci**: Assicurati che ogni coppia di elementi animati abbia un `layoutId` unico
2. **AnimatePresence**: Sempre necessario per animare componenti che vengono smontati
3. **Performance**: Le animazioni layout sono ottimizzate da Framer Motion usando GPU
4. **Accessibilità**: Considera di aggiungere `prefers-reduced-motion` per utenti sensibili alle animazioni

---

## Possibili Miglioramenti

1. **Chiusura con ESC**
   ```jsx
   useEffect(() => {
       const handleEsc = (e) => {
           if (e.key === 'Escape') setIsOpen(false);
       };
       window.addEventListener('keydown', handleEsc);
       return () => window.removeEventListener('keydown', handleEsc);
   }, []);
   ```

2. **Pulsante di Chiusura**
   ```jsx
   <button onClick={onClose}>✕</button>
   ```

3. **Animazioni Multiple**
   Usa `layoutId` diversi per animare più elementi contemporaneamente

---

## Risorse

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Shared Layout Animations](https://www.framer.com/motion/layout-animations/)
- [AnimatePresence Guide](https://www.framer.com/motion/animate-presence/)

---

**Data creazione**: 19 Febbraio 2026  
**Autore**: Antonio Cuoco


---

<a name="effetto-text-scramble"></a>
# 2. Effetto Text Scramble

## Descrizione
Effetto di scramble del testo che mostra lettere casuali al passaggio del mouse, creando un effetto "hacker" o "glitch".

## Come Funziona

### Meccanismo
1. Al passaggio del mouse (`onMouseEnter`), parte un intervallo che sostituisce ogni lettera con una casuale
2. Le lettere cambiano continuamente finché il mouse rimane sopra l'elemento
3. Quando il mouse esce (`onMouseLeave`), il testo torna immediatamente all'originale

---

## Implementazione Completa

### TextScramble.tsx

```tsx
import { useState, useRef, ElementType, HTMLAttributes } from "react";

interface TextScrambleProps extends HTMLAttributes<HTMLElement> {
  text?: string;
  className?: string;
  speed?: number;
  as?: ElementType;
}

export default function TextScramble({ 
  text = "Text", 
  className = "", 
  speed = 50,
  as: Component = "p",
  ...props
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const scrambleIntervalRef = useRef<number | null>(null);
  const originalText = text;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const handleHover = () => {
    scrambleIntervalRef.current = window.setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((letter) => {
            if (letter === " ") return " ";
            
            // Genera una lettera random
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            return randomLetter;
          })
          .join("")
      );
    }, speed);
  };

  const handleLeave = () => {
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
      scrambleIntervalRef.current = null;
    }
    setDisplayText(originalText);
  };

  return (
    <Component
      className={className}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      {...props}
    >
      {displayText}
    </Component>
  );
}
```

---

## Spiegazione del Codice

### 1. Interface TypeScript

```tsx
interface TextScrambleProps extends HTMLAttributes<HTMLElement> {
  text?: string;
  className?: string;
  speed?: number;
  as?: ElementType;
}
```

- Estende `HTMLAttributes` per supportare tutte le props HTML standard
- `as?: ElementType` permette di renderizzare qualsiasi elemento HTML

### 2. State Management

```tsx
const [displayText, setDisplayText] = useState<string>(text);
const scrambleIntervalRef = useRef<number | null>(null);
const originalText = text;
```

- `displayText` - Testo attualmente visualizzato (cambia durante lo scramble)
- `scrambleIntervalRef` - Riferimento all'intervallo per poterlo cancellare
- `originalText` - Testo originale da ripristinare

### 3. Logica dello Scramble

```tsx
const handleHover = () => {
  scrambleIntervalRef.current = window.setInterval(() => {
    setDisplayText(
      originalText
        .split("")
        .map((letter) => {
          if (letter === " ") return " ";
          const randomLetter = letters[Math.floor(Math.random() * letters.length)];
          return randomLetter;
        })
        .join("")
    );
  }, speed);
};
```

- `split("")` - Divide il testo in array di caratteri
- `map()` - Per ogni carattere, genera una lettera casuale
- Gli spazi vengono preservati
- `window.setInterval` - Ripete l'operazione ogni `speed` millisecondi

### 4. Cleanup

```tsx
const handleLeave = () => {
  if (scrambleIntervalRef.current) {
    clearInterval(scrambleIntervalRef.current);
    scrambleIntervalRef.current = null;
  }
  setDisplayText(originalText);
};
```

- Cancella l'intervallo per evitare memory leak
- Ripristina il testo originale

### 5. Componente Polimorfico

```tsx
return (
  <Component
    className={className}
    onMouseEnter={handleHover}
    onMouseLeave={handleLeave}
    {...props}
  >
    {displayText}
  </Component>
);
```

- `Component` può essere qualsiasi elemento HTML
- `{...props}` passa tutte le altre props HTML

---

## Esempi di Utilizzo

### Esempio Base

```tsx
import TextScramble from "@/Components/TextScramble/TextScramble";

function App() {
  return <TextScramble text="HOVER ME" />;
}
```

### Con Elemento Personalizzato

```tsx
<TextScramble 
  text="CREATIVE DEVELOPER" 
  as="h1"
  className="text-4xl font-bold"
/>
```

### Con Velocità Personalizzata

```tsx
<TextScramble 
  text="FAST SCRAMBLE" 
  speed={30}  // Più veloce (default: 50ms)
/>

<TextScramble 
  text="SLOW SCRAMBLE" 
  speed={100}  // Più lento
/>
```

### Con Props HTML

```tsx
<TextScramble 
  text="CLICK ME" 
  onClick={() => console.log("Clicked!")}
  style={{ color: "red" }}
/>
```

---

## Parametri Personalizzabili

### text (string)
- Default: `"Text"`
- Il testo da visualizzare

### className (string)
- Default: `""`
- Classi CSS da applicare

### speed (number)
- Default: `50`
- Velocità dello scramble in millisecondi
- Valori più bassi = più veloce

### as (ElementType)
- Default: `"p"`
- Elemento HTML da renderizzare
- Esempi: `"h1"`, `"span"`, `"div"`, `"button"`

---

## Varianti Possibili

### 1. Scramble con Numeri

```tsx
const letters = "0123456789";
```

### 2. Scramble con Simboli

```tsx
const letters = "!@#$%^&*()_+-=[]{}|;:,.<>?";
```

### 3. Scramble Misto

```tsx
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
```

### 4. Scramble Progressivo

Invece di cambiare tutte le lettere, potresti rivelare progressivamente:

```tsx
const handleHover = () => {
  let iteration = 0;
  
  scrambleIntervalRef.current = window.setInterval(() => {
    setDisplayText(
      originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index]; // Lettera corretta
          }
          return letters[Math.floor(Math.random() * letters.length)]; // Random
        })
        .join("")
    );
    
    iteration += 1 / 3; // Velocità di rivelazione
    
    if (iteration >= originalText.length) {
      clearInterval(scrambleIntervalRef.current!);
    }
  }, speed);
};
```

---

## Best Practices

1. **Performance**: Usa `useRef` per l'intervallo invece di `useState` per evitare re-render
2. **Cleanup**: Sempre cancellare gli intervalli in `handleLeave` per evitare memory leak
3. **TypeScript**: Usa `window.setInterval` invece di `setInterval` per il tipo corretto
4. **Accessibilità**: Considera di aggiungere `aria-label` con il testo originale

---

## Accessibilità

Per migliorare l'accessibilità:

```tsx
<Component
  className={className}
  onMouseEnter={handleHover}
  onMouseLeave={handleLeave}
  aria-label={originalText}
  {...props}
>
  {displayText}
</Component>
```

---

## Combinazione con Altri Effetti

### Con Framer Motion

```tsx
import { motion } from "framer-motion";

<TextScramble 
  as={motion.h1}
  text="ANIMATED SCRAMBLE"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

---

**Data aggiornamento**: 19 Febbraio 2026  
**Autore**: Antonio Cuoco


---

# 3. Sezioni con Background Diversi

## Descrizione
Implementazione di sezioni scrollabili con background diversi, dove la prima sezione ha un video background e le successive hanno background statici.

## Implementazione

### Home.jsx - Multi-Section Layout

```jsx
import { motion } from "framer-motion";
import { Header } from "@/Components/Header/Header";

export default function Home() {
    return (
        <div className="w-full h-full flex flex-col">
            <motion.div
                layoutId="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 100,
                    borderRadius: 0
                }}
            >
                {/* Contenitore scrollabile */}
                <div className="w-full h-full overflow-y-auto snap-y snap-mandatory">
                    
                    {/* Prima Sezione - Con Video Background */}
                    <section className="relative w-full h-screen snap-start">
                        <motion.video
                            src="/videos/red-dancer.mp4"
                            autoPlay
                            loop
                            muted
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 w-full h-full bg-black/25" />
                        
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="relative z-10"
                            style={{ color: "white" }}
                        >
                            <Header />
                        </motion.div>
                    </section>

                    {/* Seconda Sezione - Background Diverso */}
                    <section className="relative w-full h-screen snap-start bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                        <div className="relative z-10 flex items-center justify-center h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-white text-center"
                            >
                                <h2 className="text-5xl font-bold mb-4">Seconda Sezione</h2>
                                <p className="text-xl">Contenuto con background diverso</p>
                            </motion.div>
                        </div>
                    </section>

                </div>
            </motion.div>
        </div>
    );
}
```

---

## Spiegazione del Codice

### 1. Contenitore Scrollabile

```jsx
<div className="w-full h-full overflow-y-auto snap-y snap-mandatory">
```

- `overflow-y-auto` - Abilita lo scroll verticale
- `snap-y snap-mandatory` - Snap scrolling verticale (le sezioni si "agganciano")

### 2. Sezioni con Snap

```jsx
<section className="relative w-full h-screen snap-start">
```

- `h-screen` - Ogni sezione occupa l'intera altezza del viewport
- `snap-start` - Il punto di snap è all'inizio della sezione
- `relative` - Posizionamento relativo per gli elementi assoluti interni

### 3. Prima Sezione - Video Background

```jsx
<section className="relative w-full h-screen snap-start">
    <motion.video
        src="/videos/red-dancer.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 w-full h-full bg-black/25" />
    
    <motion.div className="relative z-10">
        <Header />
    </motion.div>
</section>
```

- Video in `position: absolute` copre tutta la sezione
- Overlay scuro (`bg-black/25`) per migliorare la leggibilità
- Contenuto con `z-10` per stare sopra il video

### 4. Seconda Sezione - Background Statico

```jsx
<section className="relative w-full h-screen snap-start bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Contenuto */}
        </motion.div>
    </div>
</section>
```

- Background gradient con Tailwind
- `whileInView` - Anima quando la sezione entra nel viewport
- Contenuto centrato con flexbox

---

## Varianti di Background

### Gradient Solido

```jsx
<section className="bg-gradient-to-r from-blue-500 to-purple-600">
```

### Immagine di Background

```jsx
<section className="relative">
    <img 
        src="/images/background.jpg" 
        className="absolute inset-0 w-full h-full object-cover"
        alt=""
    />
    <div className="absolute inset-0 bg-black/40" />
    <div className="relative z-10">
        {/* Contenuto */}
    </div>
</section>
```

### Pattern con CSS

```jsx
<section 
    className="bg-slate-900"
    style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
    }}
>
```

### Video Diverso per Sezione

```jsx
<section className="relative">
    <video
        src="/videos/section-2.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
    />
</section>
```

---

## Animazioni Scroll-Based

### Fade In al Scroll

```jsx
<motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, amount: 0.3 }}
>
    {/* Contenuto */}
</motion.div>
```

### Scale al Scroll

```jsx
<motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
>
    {/* Contenuto */}
</motion.div>
```

### Slide da Sinistra

```jsx
<motion.div
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
>
    {/* Contenuto */}
</motion.div>
```

---

## Snap Scrolling Options

### Snap Proximity (più morbido)

```jsx
<div className="overflow-y-auto snap-y snap-proximity">
```

### Snap Center (centra la sezione)

```jsx
<section className="snap-center">
```

### Disabilitare Snap su Mobile

```jsx
<div className="overflow-y-auto md:snap-y md:snap-mandatory">
```

---

## Performance Tips

1. **Lazy Load Video**: Carica il video solo quando necessario
2. **Poster Image**: Usa un'immagine placeholder per il video
3. **Preload**: Precarica le risorse critiche
4. **Optimize Video**: Comprimi il video per ridurre il peso

```jsx
<video
    src="/videos/red-dancer.mp4"
    poster="/images/video-poster.jpg"
    preload="metadata"
    autoPlay
    loop
    muted
    playsInline
/>
```

---

## Esempio Completo con 3+ Sezioni

```jsx
<div className="w-full h-full overflow-y-auto snap-y snap-mandatory">
    
    {/* Hero con Video */}
    <section className="relative h-screen snap-start">
        <video src="/videos/hero.mp4" autoPlay loop muted className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10">
            <Header />
        </div>
    </section>

    {/* About */}
    <section className="h-screen snap-start bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="flex items-center justify-center h-full">
            <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }}>
                <h2>About Me</h2>
            </motion.div>
        </div>
    </section>

    {/* Projects */}
    <section className="h-screen snap-start bg-slate-900">
        <div className="flex items-center justify-center h-full">
            <motion.div whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.9 }}>
                <h2>Projects</h2>
            </motion.div>
        </div>
    </section>

    {/* Contact */}
    <section className="h-screen snap-start bg-gradient-to-t from-black to-slate-900">
        <div className="flex items-center justify-center h-full">
            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -50 }}>
                <h2>Contact</h2>
            </motion.div>
        </div>
    </section>

</div>
```

---

**Data aggiornamento**: 19 Febbraio 2026  
**Autore**: Antonio Cuoco


---

# 4. Custom Cursor

## Descrizione
Cursore personalizzato che segue il movimento del mouse con un effetto fluido e si ingrandisce quando passa sopra elementi cliccabili.

## Struttura dei File

```
src/
├── layouts/
│   └── Layout.tsx              # Layout wrapper per tutte le pagine
├── Components/
│   └── CustomCursor/
│       └── CustomCursor.tsx    # Componente custom cursor
└── App.jsx                     # Wrappa le route con Layout
```

---

## Implementazione

### CustomCursor.tsx

```tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.style.cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Cursore principale */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Cursore secondario (alone) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
    </>
  );
}
```

### Layout.tsx

```tsx
import { ReactNode } from "react";
import CustomCursor from "@/Components/CustomCursor/CustomCursor";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative w-full h-full cursor-none">
      <CustomCursor />
      {children}
    </div>
  );
}
```

### App.jsx

```jsx
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import Layout from "@/layouts/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
```

---

## Spiegazione del Codice

### 1. Tracking del Mouse

```tsx
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);
```

- Traccia la posizione del mouse in tempo reale
- Aggiorna lo state ad ogni movimento

### 2. Rilevamento Hover

```tsx
const [isHovering, setIsHovering] = useState(false);

const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (
    target.tagName === "A" ||
    target.tagName === "BUTTON" ||
    target.closest("a") ||
    target.closest("button") ||
    target.style.cursor === "pointer"
  ) {
    setIsHovering(true);
  } else {
    setIsHovering(false);
  }
};
```

- Rileva quando il mouse è sopra elementi cliccabili
- Controlla tag HTML e attributi CSS

### 3. Cursore Principale

```tsx
<motion.div
  className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
  animate={{
    x: mousePosition.x - 8,
    y: mousePosition.y - 8,
    scale: isHovering ? 1.5 : 1,
  }}
  transition={{
    type: "spring",
    stiffness: 500,
    damping: 28,
    mass: 0.5,
  }}
/>
```

- `pointer-events-none` - Non interferisce con i click
- `z-[9999]` - Sempre sopra gli altri elementi
- `mix-blend-difference` - Effetto di inversione colore
- Animazione spring per movimento fluido
- Scale 1.5x quando hover su elementi cliccabili

### 4. Cursore Secondario (Alone)

```tsx
<motion.div
  className="fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
  animate={{
    x: mousePosition.x - 16,
    y: mousePosition.y - 16,
    scale: isHovering ? 1.5 : 1,
  }}
  transition={{
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 0.5,
  }}
/>
```

- Segue il cursore principale con un leggero ritardo
- Transizione più lenta (`stiffness: 150` vs `500`)
- Crea un effetto "alone" attorno al cursore

### 5. Layout Wrapper

```tsx
<div className="relative w-full h-full cursor-none">
  <CustomCursor />
  {children}
</div>
```

- `cursor-none` - Nasconde il cursore di default del browser
- Rende il custom cursor disponibile in tutte le pagine

---

## Personalizzazioni

### Cambiare Colore

```tsx
// Cursore nero
className="bg-black"

// Cursore colorato
className="bg-blue-500"

// Senza blend mode
className="bg-white" // Rimuovi mix-blend-difference
```

### Cambiare Dimensioni

```tsx
// Cursore più grande
<motion.div className="w-6 h-6" /> // Principale
<motion.div className="w-12 h-12" /> // Alone

// Cursore più piccolo
<motion.div className="w-2 h-2" /> // Principale
<motion.div className="w-6 h-6" /> // Alone
```

### Cambiare Velocità

```tsx
// Più veloce
transition={{
  type: "spring",
  stiffness: 800,  // Aumenta
  damping: 40,
}}

// Più lento
transition={{
  type: "spring",
  stiffness: 200,  // Diminuisci
  damping: 20,
}}
```

### Effetto Hover Diverso

```tsx
// Rotazione
animate={{
  x: mousePosition.x - 8,
  y: mousePosition.y - 8,
  scale: isHovering ? 1.5 : 1,
  rotate: isHovering ? 45 : 0,
}}

// Cambio forma
animate={{
  x: mousePosition.x - 8,
  y: mousePosition.y - 8,
  scale: isHovering ? 1.5 : 1,
  borderRadius: isHovering ? "0%" : "50%",
}}
```

---

## Varianti di Cursore

### 1. Cursore Singolo

```tsx
export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
}
```

### 2. Cursore con Testo

```tsx
<motion.div
  className="fixed top-0 left-0 pointer-events-none z-[9999]"
  animate={{
    x: mousePosition.x + 20,
    y: mousePosition.y + 20,
  }}
>
  {isHovering && (
    <span className="text-white text-sm">Click</span>
  )}
</motion.div>
```

### 3. Cursore con Trail

```tsx
const [trail, setTrail] = useState<Array<{x: number, y: number}>>([]);

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setTrail(prev => [...prev.slice(-10), { x: e.clientX, y: e.clientY }]);
  };
  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);

return (
  <>
    {trail.map((pos, i) => (
      <motion.div
        key={i}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none"
        style={{
          x: pos.x,
          y: pos.y,
          opacity: i / trail.length,
        }}
      />
    ))}
  </>
);
```

---

## Best Practices

1. **Performance**: Usa `pointer-events-none` per evitare interferenze
2. **Z-Index**: Usa un valore alto (`z-[9999]`) per stare sempre sopra
3. **Cleanup**: Rimuovi sempre gli event listener in `useEffect`
4. **Mobile**: Considera di disabilitare su mobile (touch devices)

### Disabilitare su Mobile

```tsx
export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile('ontouchstart' in window);
  }, []);

  if (isMobile) return null;

  // ... resto del codice
}
```

---

## Accessibilità

Il custom cursor non influisce sull'accessibilità perché:
- Non interferisce con i click (`pointer-events-none`)
- Non nasconde elementi interattivi
- Funziona con tastiera e screen reader

---

**Data aggiornamento**: 19 Febbraio 2026  
**Autore**: Antonio Cuoco
