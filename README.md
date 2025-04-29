# Aplikacija za učenje matematike - TataMata
## Opis projekta
TataMata je interaktivna web aplikacija namenjena učenju i istraživanju matematike. Aplikacija pruža korisnicima šest različitih alata, uključujući rešavanje matematičkih izraza, crtanje funkcija, prikaz matematičkih šala, kao i jednostavan sistem pitanja i odgovora sa administratorom.
Cilj aplikacije je da na zanimljiv i pristupačan način podrži korisnike u učenju matematike i komunikaciji sa stručnjacima.
## Funkcionalnosti aplikacije
- **Izračunavanje izraza**: Korisnici mogu unositi matematičke izraze i odmah dobijati rezultate.
- **Crtanje grafikona**: Aplikacija omogućava crtanje grafika funkcija unetih od strane korisnika.
- **Matematičke šale**: Svakodnevno prikazuje zanimljive matematičke šale za opuštanje i motivaciju.
- **Zanimljivosti o brojevima**: Korisnici mogu uneti broj i dobiti zanimljive činjenice vezane za taj broj.
- **Q&A sekcija**:  
  - Korisnici mogu postavljati pitanja adminu.
  - Admin može odgovarati na pitanja korisnika kroz poseban administratorski panel.
  - Notifikacije prikazuju nova pitanja i odgovore.
- **Test znanja**:  
  - Korisnici mogu rešavati kratke matematičke testove i proveravati svoje znanje.
- **Korisni linkovi**:  
  - Dostupan je spisak preporučenih sajtova za dodatno učenje matematike.
- **Autentifikacija**:
  - Registracija i prijava korisnika.
  - Razlikovanje običnih korisnika i administratora (admin ima dodatne funkcionalnosti).
- **Notifikacije**:
  - Badge-ovi za nova pitanja (za admina) i za nove odgovore (za korisnika).
- **Responsive dizajn**:  
  Aplikacija je prilagođena za rad na računarima, tabletima i mobilnim uređajima.
## Tehnologije korišćene pri razvoju
### Frontend
- **React** – Za izgradnju korisničkog interfejsa.
- **React Router** – Za navigaciju kroz aplikaciju.
- **React Bootstrap** – Za UI komponente i stilizovanje.
- **React Toastify** – Za prikazivanje notifikacija korisnicima.
- **Axios** – Za HTTP komunikaciju sa backendom (slanje zahteva, primanje podataka).
- **JavaScript** – Vanilla JavaScript za specifične funkcionalnosti i manipulaciju DOM-om.
- **HTML5** – Za strukturu aplikacije.
- **CSS3** – Uz Bootstrap klase za stilizovanje aplikacije.
- **Google Fonts** – Za korišćenje prilagođenih fontova u aplikaciji.
- **react-icons** – Za dodavanje ikona (npr. **FaUser** za korisnika, **FaEnvelopeOpenText** za poruke).
### Backend
- **Node.js**
- **Express.js**
- **CORS** (bezbednost)
- **Joi** (validacija podataka)
- **Bcrypt** (hashovanje lozinki)
- **JSON Web Tokens (JWT)** za autentifikaciju
### Baza podataka
- **MongoDB** (sa Mongoose ODM)
### Ostalo ###
- **Math.js** (za evaluaciju matematičkih izraza)
- **Plotly.js** (za crtanje grafikona)
- **Numbers.api** (za dobijanje informacija o brojevima)
## Struktura projekta
Frontend i backend su integrisani u jednom projektu, sa modularno organizovanim komponentama, servisima, rutama i kontrolerima radi lakše održivosti i razvoja.
## Instalacija
1. Klonirajte repozitorijum:
    ```bash
    git clone https://github.com/IvanaAndrejic/TataMata.git
    ```
2. Instalirajte zavisnosti:
    ```bash
    cd my-app
    npm install
    ```
3. Pokrenite aplikaciju:
    ```bash
    npm run dev
    ```
## Logo aplikacije
<img src="klijent/my-app/images/logo.png" alt="Logo aplikacije" width="300" />


