URL aplikacije: "https://web2-lab6-cl21.onrender.com/"

Lista svojstava:
1.interpolation/one-way binding: 
2.two-way binding:
3.methods: NAPRAVLJENO, nalaze se metode u views/PreviousExams.vue (npr. refreshExams za asinkroni dohvat prethodno napisanih ispita, deleteExam za brisanje ispita)  
4.computed properties:
5.barem jedan scoped style: NAPRAVLJENO, koristim na više mjesta views/PreviousExams.vue, views/NotFound.vue... Za potrebe uređivanja stranice sam za svaki view koristio <style scoped>...
6.koristiti barem jedan lifecycle hook: NAPRAVLJENO, koristim mounted hook za prikaz trenutnog vremena u Edgaru, nalazi se components/TheWelcome.vue u script dijelu
7.routing: 
	-bookmarkable: NAPRAVLJENO, imamo više stranica za koje definiram rute unutar router/index.js => ("/" => HomeView.vue, "/myPreviousExams" => PreviousExams.vue, "/tickets" => Tickets.vue, "/exam" => Exam.vue)
   -dinamičko usmjeravanje s 404 stranicom: NAPRAVLJENO, može se testirati tako da se doda neki nepostojeći url (npr. "https://web2-lab6-cl21.onrender.com/test") time se prikazuje 404 stranica
   	i imamo mogućnost povratka na početnu stranicu preko linka na stranici
8.(barem) dvije komponente:
	-komponenta bez stanja: NAPRAVLJENO, nalazi se u components/ExamCard.vue koriste se props koje dobijem iz jednog ispita kao što su: ispit, predmet, dvorana, ostvareniBodovi, ukupnoBodova
   -komponenta sa stanjem: 
9.barem jedna komponenta mora emitirati barem jedan event (emitiranje događaja): komponenta ExamCard.vue emitira brisanje ispita svom roditelju koji je PreviousExams.vue (konkretno emits: ["deleteExam"] koji
	je napisan unutar ExamCArd.vue gdje se klikom na gumb briše određeni ispit iz liste prikazanih ispita, ali ne briše se trajno već samo iz "privremene" baze podataka, ako se stranica osvježi ponovno će 
   se pojaviti obrisani ispiti)
10.store (Pinia): 
11.asinkroni dohvat podataka s backenda: NAPRAVLJENO, slično kao i kod s predavanja. Dodao sam u svoj projekt folder backend gdje imam get zahtjev: "app.get("/exams", async function (req, res) {...}"
   Ovim get zahtjevom radim dohvat prethodno napisanih ispita, koji se nalaze u exams.json te se ti podatci parisiraju i šalju kao odgovor na zahtjev na klijentsku stranu. Kanije su isti podatci
   prikazani na stranici My previous exams gdje ih obrađujem i baratam njima.

