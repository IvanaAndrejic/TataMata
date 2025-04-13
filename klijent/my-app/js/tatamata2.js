// Učitavanje eksternih biblioteka (Bootstrap)
const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  };
  
  // Učitaj Bootstrap JavaScript
  loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js').then(() => {
    // Kreiranje HTML strukture sa JavaScript-om
    document.body.innerHTML = `
      <div class="container mt-5">
        <div class="card shadow p-4">
          <h1 class="text-center mb-4" style="color: #4CAF50;">Matematička šala za danas</h1>
          <p id="date" class="text-center mb-3" style="font-size: 1.2em;"></p>
          <p id="fact" class="text-center" style="font-size: 1.5em; color: #007BFF;"></p>
          <hr class="my-4" style="border-color: #007BFF;" />
        </div>
      </div>
    `;
  
    // Dodavanje stilova unutar JS fajla
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        color: #333;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
  
      .container {
        text-align: center;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      }
  
      h1 {
        color: #4CAF50;
      }
  
      #date {
        font-size: 1.2em;
        margin-bottom: 20px;
      }
  
      #fact {
        font-size: 1.5em;
        color: #007BFF;
      }
  
      hr {
        border-color: #007BFF;
      }
    `;
    document.head.appendChild(style);
  
    // Funkcija za generisanje matematičkih šala
    function getMathJoke() {
      const jokes = [
        "Why was the equal sign so humble? Because it knew it wasn’t less than or greater than anyone else.",
        "Parallel lines have so much in common. It’s a shame they’ll never meet.",
        "Why don’t calculus majors throw house parties? Because you should never drink and derive.",
        "I’m afraid for the calendar. Its days are numbered.",
        "Why did the two fours skip lunch? Because they already eight!",
        "What’s the official animal of Pi day? The Pi-thon."
      ];
  
      // Randomizujemo šalu
      const randomIndex = Math.floor(Math.random() * jokes.length);
      return jokes[randomIndex];
    }
  
    // Dobijanje današnjeg datuma
    const today = new Date();
    const formattedToday = today.toLocaleDateString(); // Formatiramo datum kao mm/dd/yyyy
  
    // Prikazivanje datuma
    document.getElementById("date").textContent = `Danas je: ${formattedToday}`;
  
    // Prikazivanje matematičke šale
    document.getElementById("fact").textContent = getMathJoke();
  });
  