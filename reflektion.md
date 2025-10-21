# Reflektion

## 2. Meaningful names
Detta kapitel har påverkat min kod på flera sätt. Har varit lite rädd för att skriva längre namn, men lärt mig nu att det är bättre att skriva längre beskrivande namn än korta oklara namn och känner att jag blivit bättre på att bestämma namn, även fast det kan ta några namngivningar innan det känns bra. Något viktigt jag lärde mig var också att hålla sig till ett namn för varje sorts utförande, och inte blanda. Till exempel om man väljer att använda namngivningen “get” framför funktioner som ska hämta data, så ska man inte blanda in “fetch” som också hämtar data på samma sätt. Jag lärde mig från ett misstag i L2 där jag blandade “has” och “contains”. Så jag har försökt tänka på det i L3 också.

## 3. Functions
Jag har försökt göra mina funktioner så små och fokuserade som möjligt. Jag har även försökt att tänka på vilket abstraktionsnivå funktionerna jag definierar har. Det har påverkat L2 på mina publika interface och hur jag samlar all validationskod i L3 i samma funktion för att förenkla och göra det mer abstrakt.  Jag har undvikit behovet av så långa funktioner genom att dela upp min backend i olika abstraktioner. Hur små funktioner man faktiskt ska sträva efter var nytt för mig och något jag har försökt ha i åtanke under L2 och L3.


## 4. Comments
Från tidigare kurser har det varit obligatoriskt att göra kommentarer för alla funktioner, men jag har lärt mig från boken att man inte alltid ska skriva kommentarer. Istället så ska man försöka göra koden så tydlig och läsbar att kommentarer inte behövs. Det är något jag tycker är svårt, eftersom även om jag kanske förstår mig kod och tycker att det inte behövs en kommentar, så betyder inte det att andra förstår den. Jag har försökt att gå tillbaka till kod och läsa igenom den igen för att se om jag förstår den vid ett senare tillfälle. Direkt när man skriver koden kan man tycka att det är tydligt, men efter ett tag när man glömt hur man tänkte och går tillbaka för att läsa koden så är det inte alltid lika uppenbart vad koden gör.



## 5. Formatting
Jag har märkt att formatering gör en enorm skillnad på läsbarheten på kod. Bara några enstaka mellanrum eller tomma raden kan göra att koden blir mycket lättare att läsa. Jag har tänkt på att variabler ska definieras nära där de används, och grupperat dem. För att hålla min kod läsbar och till samma standard så har jag använt mig av paketen prettier och eslint. Genom att spara en fil så formateras den automatiskt till standarden jag definierat, och när jag gör en push till mitt remote repository så körs även en pipeline som kollar om det finns misstag i formateringen.

## 6. Object and data structures
Något som jag inte tänkt på så mycket förut är nivån av abstraktion. Så det jag har försökt ha i åtanke i både L2 och L3. I L3 så har jag delat  upp min backend i olika abstraktioner, där klassen anropar varandra i ordning av abstraktionsnivå. En klass för databasanrop är på lägst nivå, sedan kommer en service-klass som anropar databas klassen, sedan en controller-klass som använder sig av service-klassen. Det är alltså en kedja där klassen med högst abstraktion använder sig av en klass under sig i abstraktion, och så fortsätter det tills det kommer ner till databas nivå. Eftersom jag använder mig av TypeScript och ingenting i mitt projekt är definierat som “any”, så har jag behövt skapa interfaces och types för all data jag behöver använda. Då har det sedan varit enkelt att lägga till nytt data till de data strukturerna, och har även möjligheter att kunna gömma delar av den.

## 7. Error handling
I min L2 modul så finns det inte mycket möjlighet för error hantering i det publika interfacet, då jag endast vill kolla om en sträng är giltig eller ogiltig. I L3 så finns det möjligheter för error-hantering eftersom det är en fullstack applikation. Jag har hanterat de viktigaste error som kan inträffa, och jag har hanterat de enkla. Error hantering är en del där det finns rum för förbättring i min L3 applikation, genom att till exempel definiera egna error object från de olika abstraktionerna för att kunna se var det går fel. Jag har varit lite för ambitiös med storleken på min applikation och inte hunnit med att hantera så mycket error som jag hade velat. Jag har använt mig av null checks i controllern för att få en simpel hantering av error, men om jag hade mer tid hade jag som sagt definierat error exception objekt som kastas och fångas.


## 8. Boundaries
Kapitlet nämner att det är en risk att använda sig av extern kod, koden är utanför din kontroll och kan ändras så man behöver göra ändringar till sin kod. I min L3 applikation använder jag mig av React och Express för att bygga en fullstack applikation. Jag har därför varit tvungen att veta hur de ska användas. Express har jag använt tidigare men React har jag inte använt så mycket. Det är uppdelat i en client mapp som representerar frontend, där alla React-filer finns, och  en server där Express och all backend finns, och de körs på varsin webbserver. Jag har som sagt gjort boundaries mellan de olika lagrena i Express applikationen, där det till exempel finns en isolerad klass för att göra databasanrop. Eftersom jag inte har lika mycket erfarenhet av React har jag säkert inte gjort på det allra bästa sättet men har ändå försökt att isolera delar som har med varandra att göra.

## 9. Unit Tests
Jag har gjort unit tests till L2 och L3, där jag i L3 även skapade en test pipeline som körs i GitHub på varje push. Jag försökte följa F.I.R.S.T (Fast, Independent, Repeatable, Self-Validating), Timely) men använde mig inte av TDD (Test Driven Development). Jag lärde mig från 1dv613 att ska unit test tidigt sparar tid i längden så jag skapade tester tidigare den här gången och hittade mer fel än jag trodde. Som sagt så har jag varit lite för ambitiös med storleken på mitt projekt och spenderade mycket tid till att göra tester till min backend och fixa en test pipeline. 

## 10. Classes
Klasser ska ha hög cohesion, följa Single Responsibility Principle och vara små. Jag har även använt mig av Dependency Injection, som stöder principerna i det här kapitlet, särskilt Single Responsibility Principle, genom att säkerställa att en klass bara har en anledning att ändras. Detta uppnås genom att delegera skapandet och konfigurationen av ett objekts beroenden till en extern mekanism. Denna separation av ansvar innebär att klassen enbart ansvarar för sin egen logik, istället för att ansvara för både sin logik och skapandet av andra klasser, vilket resulterar i mer sammanhängande och lättare testade klasser.

## 11. Systems
För att samla konfigurationen och konstruktionen av klasser på samma ställe som de föreslår i det här kapitlet så använde jag mig av, som jag nämnde i texten ovan, Dependency Injection. På så sätt så vet inte en klass om vilken som använder den, hur den används, eller hur det den behöver skapas, den vet bara om vad den själv behöver. Det gör att klasserna har låg coupling och kan lätt testas och bytas ut mot andra klasser. Om till exempel databasen skulle bytas från MongoDB till MySQL så skulle endast en ny databas-klass skapas och injiceras i service-klassen utan att service-klassen eller resterande av klasserna behöver ändras.


