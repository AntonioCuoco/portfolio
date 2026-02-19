# Documentazione: Effetto Scale con Framer Motion

## Panoramica
Questo documento descrive come abbiamo implementato un effetto di transizione scale utilizzando Framer Motion, dove un elemento si espande da una piccola card a schermo intero quando viene cliccato.

## Tecnologie Utilizzate
- **React** - Framework UI
- **Framer Motion** - Libreria per animazioni
- **Tailwind CSS** - Styling

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
