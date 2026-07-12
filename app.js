/* ==========================================================================
   PARTICLE NETWORK BACKGROUND
   ========================================================================== */
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connectionDistance = 120;
        this.particleCount = 50;

        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    init() {
        this.resize();
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1
            });
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Adjust particle count based on screen size
        if (window.innerWidth < 768) {
            this.particleCount = 20;
            this.connectionDistance = 80;
        } else {
            this.particleCount = 60;
            this.connectionDistance = 130;
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw & Update Particles
        this.particles.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;

            // Boundary Collision
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
            this.ctx.fill();

            // Draw connections
            for (let j = idx + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.connectionDistance) {
                    const alpha = (1 - dist / this.connectionDistance) * 0.15;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

/* ==========================================================================
   NAVIGATION & UI CONTROLLER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Particles
    new ParticleBackground();

    // 2. Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mobile Navigation Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 4. Fallback for CSS Scroll-Driven Animations
    // Checks if the browser does not natively support scroll-driven animations
    if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
        const revealOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        // Target elements for reveal animation
        const animatedElements = document.querySelectorAll('.section-container, .course-card, .project-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.97)';
            revealObserver.observe(el);
        });
    }

    /* ==========================================================================
       MODAL DIALOG DATA & CONTROLLER
       ========================================================================== */
    const modalData = {
        // Projects Details
        campuseats: {
            icon: '<i class="fas fa-utensils"></i>',
            title: 'Proiect: CampusEats Cafeteria System',
            badges: ['Academic Project', '.NET 8', 'Blazor WASM', 'PostgreSQL', 'Vertical Slice'],
            videoUrl: 'Projects/campuseats.mp4',
            desc: `
                <p>CampusEats este o platformă modulară de comenzi pentru cantină, proiectată să gestioneze meniuri dinamice, procesarea comenzilor de către bucătărie și programe de loialitate.</p>
                <strong>Tehnologii utilizate:</strong> .NET 8 Minimal API, Blazor WebAssembly, Entity Framework Core, PostgreSQL, CQRS (MediatR), FluentValidation, xUnit, NSubstitute.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Structurarea proiectului folosind <strong>Vertical Slice Architecture</strong> pentru a menține codul modular și ușor de întreținut.</li>
                    <li>Dezvoltarea de API-uri cu performanțe ridicate folosind .NET 8 Minimal APIs.</li>
                    <li>Implementarea modelului CQRS (Command Query Responsibility Segregation) folosind MediatR.</li>
                    <li>Scrierea de teste unitare cu xUnit și mocking de servicii cu NSubstitute.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/CampusEats',
            actionText: 'Vezi pe GitHub'
        },
        'states-of-the-world': {
            icon: '<i class="fas fa-globe-europe"></i>',
            title: 'Proiect: States of the World Crawler & API',
            badges: ['Python', 'Web Scraping', 'Flask', 'SQLite', 'Swagger UI'],
            videoUrl: 'Projects/states-of-the-world.mp4',
            desc: `
                <p>O soluție completă capabilă să colecteze în mod automat date despre toate țările lumii (populație, suprafață, vecini, limbi vorbite) din surse web publice, să le normalizeze și să le servească printr-un REST API documentat.</p>
                <strong>Tehnologii utilizate:</strong> Python 3.x, Flask, BeautifulSoup, SQLite, Swagger UI (OpenAPI), unittest.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Dezvoltarea de crawlere robuste cu parser-e customizate în BeautifulSoup pentru date nestructurate.</li>
                    <li>Modelarea unei baze de date SQLite normalizate și adăugarea de indecși pentru interogări sub-milisecunde.</li>
                    <li>Implementarea unui API REST documentat interactiv cu Swagger UI conform specificației OpenAPI.</li>
                    <li>Asigurarea calității codului prin teste unitare automate (unittest) pentru scraper și endpoints.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/StatesOfTheWorld',
            actionText: 'Vezi pe GitHub'
        },
        chatbot: {
            icon: '<i class="fas fa-comments"></i>',
            title: 'Proiect: Chatbot Bancar Relații Clienți',
            badges: ['Multi-service Backend', 'Java', 'Spring Boot', 'NestJS', 'Prisma'],
            videoUrl: 'Projects/chatbot.mp4',
            desc: `
                <p>Un sistem distribuit ce simulează un chatbot pentru asistență clienți în domeniul bancar, conceput pentru gestionarea eficientă a conversațiilor și verificarea identității utilizatorilor.</p>
                <strong>Tehnologii utilizate:</strong> Java, Spring Boot, NestJS, TypeScript, Prisma ORM, SQL, PostgreSQL.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Crearea unei arhitecturi multi-servicii interconectate prin API-uri REST.</li>
                    <li>Utilizarea framework-ului NestJS cu TypeScript pentru API-ul modulului de conversații.</li>
                    <li>Geniul datelor utilizând Prisma ORM cu migrații și structuri de date normalizate.</li>
                    <li>Dezvoltarea logică a fluxurilor de asistență bazate pe scenarii reali din sectorul financiar.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/Chatbot',
            actionText: 'Vezi pe GitHub'
        },
        'file-transfer': {
            icon: '<i class="fas fa-server"></i>',
            title: 'Proiect: Custom FTP Server & Client',
            badges: ['System Programming', 'C Language', 'TCP/IP Sockets', 'POSIX Concurrency'],
            videoUrl: 'Projects/file-transfer.mp4',
            desc: `
                <p>O aplicație clasică client-server ce implementează un server de transfer de fișiere de la zero în C, incluzând autentificare securizată prin whitelist și gestiune concurentă a conexiunilor.</p>
                <strong>Tehnologii utilizate:</strong> C, Socket Programming (TCP/IP), POSIX System Calls (fork, chdir, mkdir), file I/O nativ, criptare custom.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Înțelegerea profundă a protocolului de transport TCP și a programării cu socket-uri BSD în UNIX.</li>
                    <li>Gestiunea execuției concurente multi-proces prin utilizarea funcției de sistem <code>fork()</code>.</li>
                    <li>Implementarea unui algoritm custom de criptare/decriptare pentru securizarea credențialelor.</li>
                    <li>Manipularea directoarelor și fișierelor direct la nivel de sistem de operare prin API-uri POSIX.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/FTP-TCP_RC2025',
            actionText: 'Vezi pe GitHub'
        },
        'flight-fear-vr': {
            icon: '<i class="fas fa-vr-cardboard"></i>',
            title: 'Proiect: FlightFearVR Simulation',
            badges: ['Unity 3D', 'Virtual Reality', 'C#', 'Terapie Imersivă'],
            videoUrl: 'Projects/flight-fear-vr.mp4',
            desc: `
                <p>Prototipul unui simulator de zbor în realitate virtuală creat pentru desensibilizarea persoanelor care suferă de frica de zbor (aviofobie), oferind scenarii imersive ajustabile.</p>
                <strong>Tehnologii utilizate:</strong> Unity 3D, C#, VR SDKs (OpenXR, XR Interaction Toolkit), 3D graphics & environmental design.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Proiectarea de scene și interacțiuni 3D imersive pentru dispozitive VR.</li>
                    <li>Scrierea scripturilor de control și eveniment în C# în cadrul motorului Unity.</li>
                    <li>Optimizarea randării pentru menținerea unui frame rate stabil și reducerea motion sickness.</li>
                    <li>Studierea tehnicilor terapeutice bazate pe expunerea controlată la stimuli în VR.</li>
                </ul>
            `,
            actionUrl: 'https://youtu.be/b72g985g1DI',
            actionText: 'Vizualizează Demo pe YouTube'
        },
        'limbaj-lfac': {
            icon: '<i class="fas fa-code"></i>',
            title: 'Proiect: Compilator LFAC Custom Language',
            badges: ['Compiler Design', 'C Language', 'Flex', 'Bison', 'AST Graphviz'],
            videoUrl: 'Projects/limbaj-lfac.mp4',
            desc: `
                <p>Un compilator și interpret complet realizat pentru un limbaj de programare proprietar format dintr-o sintaxă custom, structuri de control și gestionare a tabelei de simboluri.</p>
                <strong>Tehnologii utilizate:</strong> Limbajul C, Flex (analizor lexical), Bison (generator de parser), Graphviz (pentru vizualizarea AST).
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Definirea de expresii regulate pentru parsarea lexicală în Flex.</li>
                    <li>Definirea gramaticii limbajului folosind Yacc/Bison și implementarea acțiunilor semantice.</li>
                    <li>Construirea și gestionarea tabelelor de simboluri pentru variabile și funcții cu verificări statice de tipuri.</li>
                    <li>Generarea reprezentării grafice a Abstract Syntax Tree (AST) folosind formatul DOT.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/LimbajLFAC',
            actionText: 'Vezi pe GitHub'
        },
        sportis: {
            icon: '<i class="fas fa-users-rectangle"></i>',
            title: 'Proiect: SportIS Community Platform',
            badges: ['Web Application', 'PHP MVC', 'MySQL', 'JavaScript', 'C4 Architecture'],
            videoUrl: 'Projects/sportis.mp4',
            desc: `
                <p>Platformă web ce permite comunităților locale să organizeze activități sportive, să invite participanți, să trimită cereri de prietenie și să administreze meciuri locale.</p>
                <strong>Tehnologii utilizate:</strong> PHP, Custom MVC framework, MySQL, HTML5, CSS3, JavaScript nativ.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Proiectarea de la zero a unui framework MVC (Model-View-Controller) simplificat în PHP.</li>
                    <li>Managementul bazelor de date cu relații complexe (utilizatori, relații de prietenie, rezervări de terenuri).</li>
                    <li>Securizarea formularelor împotriva atacurilor comune (SQL Injection, XSS) și validarea datelor pe frontend și backend.</li>
                    <li>Arhitecturarea sistemului folosind modelul de design C4 Diagrams.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/LocalGreetings',
            actionText: 'Vezi pe GitHub'
        },
        collabstudy: {
            icon: '<i class="fas fa-graduation-cap"></i>',
            title: 'Proiect: CollabStudy — Platformă Educațională AI',
            badges: ['Cloud / Microservices', 'Python (Flask)', 'Vue 3', 'Azure Blob', 'SQL Server', 'Azure OpenAI'],
            videoUrl: 'Projects/collabstudy.mp4',
            desc: `
                <p>CollabStudy este o platformă distribuită destinată studenților pentru managementul documentelor de studiu și generarea automată de materiale auxiliare de învățare bazate pe inteligență artificială.</p>
                <strong>Tehnologii utilizate:</strong> Python (Flask), Vue 3, Vite, Azure Blob Storage (Azurite), SQL Server (MSSQL), Azure Service Bus (sau HTTP bypass local), Azure OpenAI, Azure Document Intelligence.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Dezvoltarea unei arhitecturi bazate pe microservicii decuplate prin mesagerie asincronă sau API-uri REST directe.</li>
                    <li>Integrarea serviciilor cognitive Azure pentru procesarea inteligentă a documentelor (Document Intelligence pentru extragere PDF și OpenAI pentru generare de rezumate și quiz-uri).</li>
                    <li>Gestiunea robustă a stocării binare în Azure Blob Storage (Azurite local).</li>
                    <li>Configurarea și gestiunea bazelor de date SQL Server cu relații complexe între utilizatori, documente, întrebări și răspunsuri.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/CollabStudy',
            actionText: 'Vezi pe GitHub'
        },
        'image-resizer': {
            icon: '<i class="fas fa-images"></i>',
            title: 'Proiect: PhotoResizer — Microserviciu Serverless',
            badges: ['Cloud / Serverless', 'Python', 'Flask', 'GCP Functions', 'Cloud Storage', 'Firestore'],
            videoUrl: 'Projects/image-resizer.mp4',
            desc: `
                <p>Un sistem de procesare asincronă de imagini bazat pe modelul de computație Serverless. Permite utilizatorilor să încarce imagini, care sunt procesate la rezoluții multiple în background și stocate securizat.</p>
                <strong>Tehnologii utilizate:</strong> Python, Flask, Google Cloud Functions (Functions Framework), Google Cloud Storage, Firestore (pentru stocarea metadatelor), Authlib (Google OAuth2).
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Dezvoltarea de funcții serverless decuplate pentru manipularea asincronă a resurselor media mari folosind Pillow.</li>
                    <li>Modelarea unei baze de date NoSQL în Cloud Firestore pentru salvarea stării și a rezoluțiilor disponibile.</li>
                    <li>Integrarea autentificării securizate Google OAuth 2.0 pentru managementul sesiunilor de utilizator.</li>
                    <li>Stocarea fișierelor binare în Google Cloud Storage (cu emulator local pentru testare locală rapidă).</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/CloudComputing/tree/main/tema3',
            actionText: 'Vezi pe GitHub'
        },
        'tema-sapt4': {
            icon: '<i class="fas fa-list-check"></i>',
            title: 'Proiect: Order Management Architecture',
            badges: ['.NET Core API', 'MediatR (CQRS)', 'FluentValidation', 'AutoMapper', 'Custom Middleware'],
            videoUrl: 'Projects/tema-sapt4.mp4',
            desc: `
                <p>Un API robust centrat pe design patterns avansate pentru managementul comenzilor, asigurând decuplarea operațiunilor și urmărirea cererilor prin middleware-uri dedicate.</p>
                <strong>Tehnologii utilizate:</strong> .NET Core, MediatR, FluentValidation, AutoMapper, Entity Framework Core InMemory, Correlation Middleware.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Implementarea mediator pattern pentru structurarea modulară a interogărilor și comenzilor.</li>
                    <li>Configurarea regulilor de validare a request-urilor la nivel de pipeline prin FluentValidation.</li>
                    <li>Implementarea unui middleware personalizat de urmărire a Correlation ID-urilor pentru logging distribuit.</li>
                    <li>Integrarea automată a mapping-ului de obiecte (DTOs) cu AutoMapper.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/TemaSapt4',
            actionText: 'Vezi pe GitHub'
        },
        'homework2-dashboard': {
            icon: '<i class="fas fa-chart-line"></i>',
            title: 'Proiect: Real-Time Aggregator Dashboard',
            badges: ['Full-Stack', '.NET 10', 'Vue 3', 'Node.js / Express', 'SQLite', 'REST Integration'],
            videoUrl: 'Projects/homework2-dashboard.mp4',
            desc: `
                <p>O platformă completă de agregare a datelor în timp real din multiple surse externe și locale, proiectată pentru a demonstra integrarea de servicii web eterogene.</p>
                <strong>Tehnologii utilizate:</strong> .NET 10 (Web API principal), Vue 3 (frontend client), Node.js/Express (microserviciu local de rețete cu PostgreSQL), SQLite (înregistrarea logurilor de sistem), HttpClient, CORS Policy.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Dezvoltarea de API-uri agregate prin consumarea de servicii web REST terțe în paralel utilizând <code>HttpClientFactory</code>.</li>
                    <li>Utilizarea conceptelor din .NET 10 pentru configurarea politicilor CORS permisive și securizate pentru comunicarea cu clientul Vue 3.</li>
                    <li>Managementul securizat al cheilor API (OpenWeather și NewsAPI) utilizând fișiere <code>.env</code> prin intermediul bibliotecii dotenv.net.</li>
                    <li>Persistența istorică a cererilor (logging) direct într-o bază de date SQLite prin intermediul Entity Framework Core.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/CloudComputingCourse/tree/main/homework2',
            actionText: 'Vezi pe GitHub'
        },
        dotgame: {
            icon: '<i class="fas fa-gamepad"></i>',
            title: 'Proiect: DotGame — Joc Desktop bazat pe Teoria Grafurilor',
            badges: ['Desktop App', 'Java', 'Swing & AWT', 'Graph Theory', 'Kruskal MST', 'graph4j'],
            videoUrl: 'Projects/dotgame.mp4',
            desc: `
                <p>O aplicație desktop interactivă dezvoltată în Java pentru simularea unui joc pozițional de conexiune pe grafuri. Jocul compară în timp real mutările jucătorilor cu arborele parțial de cost minim.</p>
                <strong>Tehnologii utilizate:</strong> Java, Swing (GUI), AWT Graphics 2D, biblioteca graph4j, algoritmul Kruskal Minimum Spanning Tree (MST), Serializare Java.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Implementarea de interfețe grafice interactive de tip canvas utilizând <code>Graphics2D</code> și gestiunea dinamică a evenimentelor de mouse (<code>MouseAdapter</code>).</li>
                    <li>Utilizarea conceptelor matematice avansate (Teoria Grafurilor) în dezvoltarea logicii de joc.</li>
                    <li>Integrarea bibliotecii externe <code>graph4j</code> pentru reprezentarea eficientă a nodurilor și a muchiilor ponderate pe baza distanțelor euclidiene.</li>
                    <li>Aplicarea algoritmului Kruskal pentru determinarea arborelui de acoperire minimă (MST) și calcularea scorului optim în timp real.</li>
                    <li>Serializarea stării jocului pentru salvare și restaurare locală.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/workJava/tree/main/DotGame',
            actionText: 'Vezi pe GitHub'
        },
        'concurrency-scrabble': {
            icon: '<i class="fas fa-project-diagram"></i>',
            title: 'Proiect: Concurrent Scrabble Simulator',
            badges: ['Concurrency', 'Java', 'Multithreading', 'System Synchronization'],
            videoUrl: 'Projects/scrabble-sim.mp4',
            desc: `
                <p>O simulare complexă în Java a unui joc de Scrabble bazat pe execuție concurentă, concepută pentru a demonstra managementul concurenței și sincronizarea proceselor la nivel de memorie partajată.</p>
                <strong>Tehnologii utilizate:</strong> Java SE, Multithreading (Threads & Runnable), Thread Synchronization (synchronized blocks, wait/notify, lock objects).
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Arhitecturarea unui flux de execuție paralel unde fiecare jucător rulează ca un thread de sine stătător.</li>
                    <li>Sincronizarea sigură a accesului la resurse critice partajate, cum ar fi sacul de jetoane (<code>TileBag</code>) și tabla de joc (<code>Board</code>), pentru a evita race conditions.</li>
                    <li>Implementarea unui arbitru virtual de joc capabil să valideze cuvintele adăugate concurent dintr-un dicționar pre-încărcat.</li>
                    <li>Controlul ciclului de viață al firelor de execuție, gestiunea stărilor acestora și finalizarea corectă a jocului în condiții de siguranță.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/workJava/tree/main/Lab7-fin',
            actionText: 'Vezi pe GitHub'
        }
    };

    const modal = document.getElementById('details-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalBadges = document.getElementById('modal-badges');
    const modalDesc = document.getElementById('modal-desc');
    const modalActionBtn = document.getElementById('modal-action-btn');

    // Video Elements
    const modalVideo = document.getElementById('modal-video');
    const modalVideoSource = document.getElementById('modal-video-source');
    const modalVideoDownload = document.getElementById('modal-video-download-link');

    // Function to populate and show modal
    const openModal = (key) => {
        const data = modalData[key];
        if (!data || !modal) return;

        // Set data
        modalIcon.innerHTML = data.icon;
        modalTitle.textContent = data.title;
        modalDesc.innerHTML = data.desc;
        modalActionBtn.href = data.actionUrl;
        modalActionBtn.textContent = data.actionText;

        // Populate badges
        modalBadges.innerHTML = '';
        data.badges.forEach(badgeText => {
            const span = document.createElement('span');
            span.textContent = badgeText;
            modalBadges.appendChild(span);
        });

        // Set up video logic
        if (data.videoUrl && modalVideo && modalVideoSource) {
            modal.classList.add('has-video');
            modalVideoSource.src = data.videoUrl;
            if (modalVideoDownload) {
                modalVideoDownload.href = data.videoUrl;
            }
            modalVideo.load();
        } else {
            modal.classList.remove('has-video');
            if (modalVideoSource) {
                modalVideoSource.src = '';
            }
            if (modalVideo) {
                modalVideo.load();
            }
        }

        // Open Dialog
        modal.showModal();
    };

    // Attach click listeners to Courses
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
            const courseKey = card.getAttribute('data-course');
            if (courseKey) openModal(courseKey);
        });
    });

    // Attach click listeners to Projects
    document.querySelectorAll('.project-card').forEach(card => {
        // Only trigger modal when not clicking the buttons inside the cards directly, 
        // but we can map the buttons to open the modal too.
        const projectKey = card.getAttribute('data-project');
        if (!projectKey) return;

        card.addEventListener('click', (e) => {
            openModal(projectKey);
        });

        const btn = card.querySelector('.btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Avoid double modal triggers
                openModal(projectKey);
            });
        }
    });

    // Project Cards Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-categories');
                if (filterValue === 'all' || (categories && categories.split(' ').includes(filterValue))) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Close Modal Button
    if (modalCloseBtn && modal) {
        modalCloseBtn.addEventListener('click', () => {
            modal.close();
        });
    }

    // Pause video when modal is closed (native close, Esc, backdrop click, or close button)
    if (modal && modalVideo) {
        modal.addEventListener('close', () => {
            modalVideo.pause();
        });
    }

    // 5. Fallback for Dialog Backdrop click (Light Dismiss)
    // Ensures light-dismiss works in browsers without native support for `closedby="any"` (such as Safari)
    if (modal && !('closedBy' in HTMLDialogElement.prototype)) {
        modal.addEventListener('click', (event) => {
            if (event.target !== modal) return;

            const rect = modal.getBoundingClientRect();
            const isClickInside = (
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width
            );

            if (!isClickInside) {
                modal.close();
            }
        });
    }

    // 6. Contact Form validation & Submission
    const contactForm = document.getElementById('portfolio-contact-form');
    
    // Create and append toast container dynamically if not exists
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    const showToast = (title, text, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const iconHtml = type === 'success' 
            ? '<i class="fas fa-check-circle"></i>' 
            : '<i class="fas fa-exclamation-circle"></i>';
            
        toast.innerHTML = `
            <div class="toast-icon">${iconHtml}</div>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${text}</p>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Trigger reflow for animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous validation styling
            contactForm.classList.remove('was-validated');

            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    isValid = false;
                }
            });

            if (isValid) {
                const nameVal = document.getElementById('name').value;
                const emailVal = document.getElementById('email').value;
                const messageVal = document.getElementById('message').value;

                // Construct mailto link
                const subject = `Contact Portofoliu - ${nameVal}`;
                const body = `Salut Petru,\n\nNume: ${nameVal}\nEmail de contact: ${emailVal}\n\nMesaj:\n${messageVal}`;
                const mailtoUrl = `mailto:galteanupetru152@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                // Redirect to open native mail application
                window.location.href = mailtoUrl;

                // Show success toast
                showToast('Client Email', 'Deschidem clientul tău de e-mail pentru a trimite mesajul...', 'success');

                // Reset form
                contactForm.reset();
            } else {
                // Mark form as validated to show standard validation messages
                contactForm.classList.add('was-validated');
                
                // Show error toast
                showToast('Eroare', 'Te rugăm să completezi corect toate câmpurile obligatorii.', 'error');

                // Focus on first invalid input
                const firstInvalid = contactForm.querySelector(':invalid');
                if (firstInvalid) firstInvalid.focus();
            }
        });
    }
});


