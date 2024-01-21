URL aplikacije: "https://web2-lab6-cl21.onrender.com/"
   
Napomena: -prvo je potrebno prijaviti se (nije postavljena validacija, ali je obavezno unijeti username i password)
   		  npr. username: admin, password: admin
          -prilikom dohvata prethodnih ispita malo treba pričekati dohvat jer je postoji zaseban backend s kojeg se asinkrono dobivaju podatci, a render je jako spor :(
          -dohvat prethodno napisanih ispita, dohvat na backend serveru moguće testirati: "https://web2-lab6-backend-yvvu.onrender.com/exams"
          -na dnu upute za lokalno pokretanje

Lista svojstava:
1.interpolation/one-way binding: NAPRAVLJENO, interpolation korišten za prikaz trenutnog vremena components/TheWelcome.vue za varijablu this.timer, za one way binding nalazi se u views/Tickes.vue. 
   Kad korisnik unese predmet za koji želi postaviti ticket varijabla subject je jednosmjerno povezana s inputom (v-bind="subject") 
2.two-way binding: NAPRAVLJENO, nalazi se u views/Tickes.vue. Kad korisnik unosi pitanje profesoru varijable ticket je dvosmjerno povezana s inputom, ažurira se (pomoću v-model) i prikazuje njena vrijednost dolje(dinamička promjena)
3.methods: NAPRAVLJENO, nalaze se metode u views/PreviousExams.vue (npr. refreshExams za asinkroni dohvat prethodno napisanih ispita, deleteExam za brisanje ispita)  
4.computed properties: NAPRAVLJENO, nalazi se u Login.vue za dohvat landingUrl iz globalnog stanja odnosno iz useAuthStore kako bi se moglo usmjeriti korisnika na url koji je prethodno htio prije prijave
5.barem jedan scoped style: NAPRAVLJENO, koristim na više mjesta views/PreviousExams.vue, views/NotFound.vue, views/Tickets.vue... Za potrebe stila stranice sam za svaki view koristio <style scoped>...
6.koristiti barem jedan lifecycle hook: NAPRAVLJENO, koristim mounted hook za prikaz trenutnog vremena u Edgaru, nalazi se components/TheWelcome.vue u script dijelu
7.routing: 
	-bookmarkable: NAPRAVLJENO, imamo više stranica za koje definiram rute unutar router/index.js => ("/" => HomeView.vue, "/myPreviousExams" => PreviousExams.vue, "/tickets" => Tickets.vue)
   -dinamičko usmjeravanje s 404 stranicom: NAPRAVLJENO, stranice se nalazi views/NotFound.vue, može se testirati tako da se doda neki nepostojeći url "/test" time se prikazuje 404 stranica
   	i imamo mogućnost povratka na početnu stranicu preko linka na stranici, ovo u produkcijskoj verziji ne funkcionira pa se jedino može testirati lokalno na "http://localhost:5173/npr.test", ovo provjereno radi,
		prvo se prijavi i onda se dobije 404 Not Found stranica!
8.(barem) dvije komponente:
	-komponenta bez stanja: NAPRAVLJENO, nalazi se u components/ExamCard.vue koriste se props koje dobijem iz jednog ispita kao što su: ispit, predmet, dvorana, ostvareniBodovi, ukupnoBodova
   -komponenta sa stanjem: NAPRAVLJENO, komponenta conponents/TheWelcome.vue ima prikaz trenutno prijavljenog korisnika koji se dohvati pomoću globalnog stanja iz storea i zatim prikazuje na ekranu
9.barem jedna komponenta mora emitirati barem jedan event (emitiranje događaja): komponenta ExamCard.vue emitira brisanje ispita svom roditelju koji je PreviousExams.vue (konkretno emits: ["deleteExam"] koji
	je napisan unutar ExamCard.vue gdje se klikom na gumb briše određeni ispit iz liste prikazanih ispita, ali ne briše se trajno već samo iz "privremene" baze podataka, ako se stranica osvježi ponovno će 
   se pojaviti obrisani ispiti)
10.store (Pinia): NAPRAVLJENO, definiram stores/auth.js (userAuthStore) za prijavu korisnika i demonstraciju globalnog stanja npr. koristim na početnoj stranici TheWelcome.vue trenutno prijavljenog korisnika kojeg 
   dobivam iz globalnog stanja (username) computed: {
                                             ...mapState(useAuthStore, ["username"]),
                                          },
11.asinkroni dohvat podataka s backenda: NAPRAVLJENO, slično kao i kod s predavanja. Dodao sam u svoj projekt folder backend gdje imam get zahtjev: "app.get("/exams", async function (req, res) {...}"
   Ovim get zahtjevom radim dohvat prethodno napisanih ispita, koji se nalaze u exams.json te se ti podatci parisiraju i šalju kao odgovor na zahtjev na klijentsku stranu. Kasnije su isti podatci
   prikazani na stranici My previous exams gdje ih obrađujem i baratam njima.

             
Upute za lokalno pokretanje:
backend: 1. pozicionirati se u folder "/backend"
         2. npm install
			3. npm start
         -ovo je url na kojem lokalno možemo pristupiti backend dijelu: "http://localhost:8080"

frontend: 1. pozicionirati se u folder "/LAB6_vue"
          2. npm install
          3. npm run serve
          4. također potrebno zamijeniti produkcijski url s lokalnim backendom u views/PreviousExams.vue url za fatch podataka (linija 27) ovime: "http://localhost:8080/exams"
             