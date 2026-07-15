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
   INTERNATIONALIZATION (i18n) — RO / EN
   ========================================================================== */
const translations = {
    ro: {
        'nav.about': 'Despre mine',
        'nav.skills': 'Competen\u021be',
        'nav.projects': 'Proiecte',
        'nav.contact': 'Contact',
        'hero.desc': 'Proasp\u0103t absolvent al Facult\u0103\u021bii de Informatic\u0103 din Ia\u0219i (UAIC).',
        'hero.stats.projects': 'Proiecte',
        'hero.stats.tech': 'Tehnologii Core',
        'hero.stats.passion': 'Pasiune',
        'about.title': 'Despre Mine',
        'about.p1': 'Sunt absolvent al Facult\u0103\u021bii de Informatic\u0103 din cadrul Universit\u0103\u021bii \u201eAlexandru Ioan Cuza\u201d din Ia\u0219i (FII UAIC). Parcursul meu academic s-a concentrat pe \u00een\u021belegerea \u00een profunzime a program\u0103rii, a sistemelor distribuite \u0219i a dezvolt\u0103rii web moderne.',
        'about.p2': '\u00cemi place s\u0103 construiesc arhitecturi scalabile, s\u0103 explorez programarea la nivel de sistem \u0219i s\u0103 creez servicii care comunic\u0103 eficient.',
        'about.techTitle': 'Tehnologii & Expertiz\u0103',
        'kalo.subtitle': 'Kalo \u2014 Aplica\u021bie Multi-service Inteligent\u0103',
        'kalo.p1': '<strong>Kalo</strong> este o platform\u0103 complet\u0103 destinat\u0103 managementului nutri\u021bional bazat\u0103 pe microservicii. Aceasta integreaz\u0103 un API robust dezvoltat \u00een <strong>.NET Core</strong> pentru identificarea si gestionarea utilizatorilor, \u00eempreun\u0103 cu un serviciu implementat \u00een <strong>Python (FastAPI)</strong> ce cuprinde logica de bussiness, Machine Learning \u0219i integr\u0103rile AI.',
        'kalo.p2': 'Aplica\u021bia integreaz\u0103 de asemenea suport pentru tehnologia <strong>NFC (Near Field Communication)</strong> pentru scanarea \u0219i logarea rapid\u0103 a alimentelor \u00een c\u0103mar\u0103 de c\u0103tre al\u021bi utilizatori.',
        'kalo.f1': 'Gateway Nginx centralizat',
        'kalo.f2': 'Autentificare securizat\u0103 cu JWT partajat',
        'kalo.f3': 'Database seeding & migra\u021bii automate',
        'kalo.f4': 'Inteligen\u021b\u0103 Artificial\u0103 (FastAPI AI routes)',
        'kalo.btnPresentation': 'Prezentare',
        'kalo.btnCode': 'Cod',
        'kalo.videoTitle': 'Prezentare Video Demonstrativ\u0103',
        'kalo.videoCaption': 'Demonstra\u021bia practic\u0103 a fluxurilor de utilizator, scanarea NFC \u0219i recomand\u0103rile nutri\u021bionale bazate pe inteligen\u021b\u0103 artificial\u0103.',
        'video.fallback': 'Browserul t\u0103u nu suport\u0103 redarea video HTML5. Po\u021bi desc\u0103rca fi\u0219ierul',
        'video.here': 'aici',
        'filter.all': 'Toate',
        'filter.web': 'Web & Altele',
        'proj.learnMore': 'Afl\u0103 mai multe',
        'proj.campuseats.desc': 'Sistem modular de comenzi pentru cantine universitare, implementat folosind Vertical Slice Architecture, CQRS cu MediatR \u0219i interfa\u021b\u0103 SPA \u00een Blazor WASM.',
        'proj.states.desc': 'Web crawler automat pentru date geografice globale folosind BeautifulSoup, stocare SQLite normalizat\u0103 \u0219i REST API auto-documentat cu Swagger.',
        'proj.chatbot.name': 'Chatbot Bancar',
        'proj.chatbot.desc': 'Sistem asistent distribuit compus dintr-un nucleu bancar robust \u00een Spring Boot \u0219i un modul conversa\u021bional \u00een NestJS interconectat cu Prisma ORM.',
        'proj.ftp.desc': 'Server \u0219i client de transfer fi\u0219iere la nivel de sistem UNIX \u00een C, bazat pe procese concurente fork(), socket-uri TCP \u0219i securitate cu whitelist.',
        'proj.vr.desc': 'Simulator VR imersiv terapeutic \u00een Unity 3D \u0219i C# (OpenXR) pentru expunerea controlat\u0103 \u0219i desensibilizarea pacien\u021bilor cu aviofobie.',
        'proj.compiler.desc': 'Compilator \u0219i interpret pentru un limbaj proprietar \u00een C, folosind Flex pentru analiz\u0103 lexical\u0103, Bison pentru parsare sintactic\u0103 \u0219i generare de AST.',
        'proj.sportis.name': 'SportIS - Platform\u0103 social\u0103 sportiv\u0103',
        'proj.sportis.desc': 'Platform\u0103 social\u0103 MVC \u00een PHP pentru organizarea de activit\u0103\u021bi sportive locale, securizat\u0103 nativ contra XSS/SQLi \u0219i documentat\u0103 cu modelul C4.',
        'proj.collab.desc': 'Platform\u0103 educa\u021bional\u0103 distribuit\u0103 bazat\u0103 pe microservicii \u00een Python (Flask) \u0219i Vue 3, ce folose\u0219te AI pentru generarea de rezumate \u0219i quiz-uri.',
        'proj.resizer.desc': 'Sistem serverless de procesare asincron\u0103 a imaginilor la rezolu\u021bii multiple, folosind GCP Cloud Functions \u0219i Firestore.',
        'proj.order.desc': 'API minimal enterprise \u00een .NET Core pentru procesarea comenzilor cu MediatR, FluentValidation \u0219i correlation tracking.',
        'proj.dashboard.desc': 'Dashboard interactiv combin\u00e2nd servicii de re\u021bete Node.js locale, prognoze meteo OpenWeather \u0219i \u0219tiri NewsAPI \u00eentr-un backend .NET 10 securizat.',
        'proj.dotgame.desc': 'Joc desktop interactiv bazat pe Teoria Grafurilor \u00een Java Swing, ce calculeaz\u0103 \u00een timp real scorul optim al mut\u0103rilor folosind algoritmul Kruskal MST din biblioteca graph4j.',
        'proj.scrabble.desc': 'Simulare multi-thread \u00een Java a unui joc de Scrabble, demonstr\u00e2nd sincronizarea resurselor partajate (TileBag, Board) \u00eentre juc\u0103tori concuren\u021bi.',
        'proj.docmanager.desc': 'Catalog modular de documente \u00een Java utiliz\u00e2nd Command Pattern, cu mecanisme abstracte de persisten\u021b\u0103 (JSON, Binar \u0219i Text) \u0219i gestionare a fi\u0219ierelor.',
        'proj.javadb.desc': 'Colec\u021bie de servicii Java pentru persisten\u021ba datelor, integr\u00e2nd conexiuni JDBC custom cu DAO Pattern, importatoare CSV \u0219i repo-uri JPA/Hibernate.',
        'contact.title': 'S\u0103 p\u0103str\u0103m leg\u0103tura',
        'contact.desc': 'Sunt \u00een c\u0103utare de noi oportunit\u0103\u021bi profesionale. M\u0103 pute\u021bi contacta pentru proiecte, joburi sau discu\u021bii tehnice prin:',
        'contact.form.name': 'Nume',
        'contact.form.namePh': 'Nume',
        'contact.form.nameErr': 'C\u00e2mp obligatoriu!',
        'contact.form.email': 'Adres\u0103 de email',
        'contact.form.emailErr': 'Introdu o adres\u0103 de email valid\u0103',
        'contact.form.message': 'Mesaj',
        'contact.form.messagePh': 'Mesajul t\u0103u...',
        'contact.form.messageErr': 'Mesajul nu poate fi gol',
        'contact.form.submit': 'Trimite Mesaj',
        'footer.rights': 'Toate drepturile rezervate.',
        'footer.built': 'Portofoliu creat cu HTML5, CSS3, JS',
        'meta.title': 'Petru G\u0103l\u0103\u021beanu | Portofoliu',
        'meta.desc': 'Portofoliul personal al lui Petru G\u0103l\u0103\u021beanu.',
    },
    en: {
        'nav.about': 'About me',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        'hero.desc': 'Recent graduate of the Faculty of Computer Science in Ia\u0219i (UAIC).',
        'hero.stats.projects': 'Projects',
        'hero.stats.tech': 'Core Technologies',
        'hero.stats.passion': 'Passion',
        'about.title': 'About Me',
        'about.p1': 'I am a graduate of the Faculty of Computer Science at Alexandru Ioan Cuza University in Ia\u0219i (FII UAIC). My academic journey focused on deeply understanding programming, distributed systems, and modern web development.',
        'about.p2': 'I enjoy building scalable architectures, exploring system-level programming, and creating services that communicate efficiently.',
        'about.techTitle': 'Technologies & Expertise',
        'kalo.subtitle': 'Kalo \u2014 Intelligent Multi-service Application',
        'kalo.p1': '<strong>Kalo</strong> is a comprehensive platform for nutritional management built on microservices. It integrates a robust API developed in <strong>.NET Core</strong> for user identification and management, along with a service implemented in <strong>Python (FastAPI)</strong> covering the business logic, Machine Learning, and AI integrations.',
        'kalo.p2': 'The application also integrates support for <strong>NFC (Near Field Communication)</strong> technology for quick food scanning and logging into the pantry by other users.',
        'kalo.f1': 'Centralized Nginx Gateway',
        'kalo.f2': 'Secure authentication with shared JWT',
        'kalo.f3': 'Database seeding & automated migrations',
        'kalo.f4': 'Artificial Intelligence (FastAPI AI routes)',
        'kalo.btnPresentation': 'Presentation',
        'kalo.btnCode': 'Code',
        'kalo.videoTitle': 'Demonstrative Video Presentation',
        'kalo.videoCaption': 'Practical demonstration of user flows, NFC scanning, and AI-based nutritional recommendations.',
        'video.fallback': 'Your browser does not support HTML5 video. You can download the file',
        'video.here': 'here',
        'filter.all': 'All',
        'filter.web': 'Web & Others',
        'proj.learnMore': 'Learn more',
        'proj.campuseats.desc': 'Modular ordering system for university cafeterias, built using Vertical Slice Architecture, CQRS with MediatR, and a Blazor WASM SPA interface.',
        'proj.states.desc': 'Automated web crawler for global geographic data using BeautifulSoup, normalized SQLite storage, and a Swagger self-documented REST API.',
        'proj.chatbot.name': 'Banking Chatbot',
        'proj.chatbot.desc': 'Distributed assistant system consisting of a robust banking core in Spring Boot and a conversational module in NestJS interconnected with Prisma ORM.',
        'proj.ftp.desc': 'UNIX system-level file transfer server and client in C, based on concurrent fork() processes, TCP sockets, and whitelist security.',
        'proj.vr.desc': 'Immersive therapeutic VR simulator in Unity 3D and C# (OpenXR) for controlled exposure and desensitization of patients with aviophobia.',
        'proj.compiler.desc': 'Compiler and interpreter for a proprietary language in C, using Flex for lexical analysis, Bison for syntactic parsing, and AST generation.',
        'proj.sportis.name': 'SportIS - Sports Social Platform',
        'proj.sportis.desc': 'PHP MVC social platform for organizing local sports activities, natively secured against XSS/SQLi, and documented with the C4 model.',
        'proj.collab.desc': 'Distributed educational platform based on microservices in Python (Flask) and Vue 3, using AI to generate summaries and quizzes.',
        'proj.resizer.desc': 'Serverless asynchronous image processing system at multiple resolutions, using GCP Cloud Functions and Firestore.',
        'proj.order.desc': 'Minimal enterprise API in .NET Core for order processing with MediatR, FluentValidation, and correlation tracking.',
        'proj.dashboard.desc': 'Interactive dashboard combining local Node.js recipe services, OpenWeather forecasts, and NewsAPI news in a secure .NET 10 backend.',
        'proj.dotgame.desc': 'Interactive desktop game based on Graph Theory in Java Swing, computing the optimal move score in real-time using the Kruskal MST algorithm from the graph4j library.',
        'proj.scrabble.desc': 'Java multi-thread simulation of a Scrabble game, demonstrating synchronization of shared resources (TileBag, Board) among concurrent players.',
        'proj.docmanager.desc': 'Modular Java document catalog using the Command Pattern, with abstract persistence mechanisms (JSON, Binary, and Text) and file management.',
        'proj.javadb.desc': 'Collection of Java data persistence services, integrating custom JDBC connections with DAO Pattern, CSV importers, and JPA/Hibernate repositories.',
        'contact.title': "Let's stay in touch",
        'contact.desc': 'I am looking for new professional opportunities. You can contact me for projects, jobs, or technical discussions via:',
        'contact.form.name': 'Name',
        'contact.form.namePh': 'Name',
        'contact.form.nameErr': 'Required field!',
        'contact.form.email': 'Email address',
        'contact.form.emailErr': 'Enter a valid email address',
        'contact.form.message': 'Message',
        'contact.form.messagePh': 'Your message...',
        'contact.form.messageErr': 'Message cannot be empty',
        'contact.form.submit': 'Send Message',
        'footer.rights': 'All rights reserved.',
        'footer.built': 'Portfolio built with HTML5, CSS3, JS',
        'meta.title': 'Petru G\u0103l\u0103\u021beanu | Portfolio',
        'meta.desc': "Petru G\u0103l\u0103\u021beanu's personal portfolio.",
    }
};

let currentLang = localStorage.getItem('lang') || 'ro';

function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    // Update text content of elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            // Use innerHTML to support <strong> tags inside translations
            el.innerHTML = t[key];
        }
    });

    // Update placeholder attributes with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) {
            el.placeholder = t[key];
        }
    });

    // Update html lang attribute
    document.getElementById('html-root').lang = lang;

    // Update page title and meta description
    if (t['meta.title']) document.title = t['meta.title'];
    const metaDesc = document.getElementById('meta-description');
    if (metaDesc && t['meta.desc']) metaDesc.content = t['meta.desc'];

    // Update lang toggle button
    const langCode = document.getElementById('lang-code');
    const langFlag = document.querySelector('.lang-flag');
    if (lang === 'ro') {
        if (langCode) langCode.textContent = 'RO';
        if (langFlag) langFlag.textContent = '\ud83c\uddf7\ud83c\uddf4';
    } else {
        if (langCode) langCode.textContent = 'EN';
        if (langFlag) langFlag.textContent = '\ud83c\uddec\ud83c\udde7';
    }

    currentLang = lang;
    localStorage.setItem('lang', lang);
}

/* ==========================================================================
   NAVIGATION & UI CONTROLLER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 0. Apply saved language on load
    applyTranslations(currentLang);

    // Language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'ro' ? 'en' : 'ro';
            // Add flip animation
            langToggle.classList.add('lang-switching');
            setTimeout(() => {
                applyTranslations(newLang);
                langToggle.classList.remove('lang-switching');
            }, 150);
        });
    }

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

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active')) {
                const isClickInsideMenu = navMenu.contains(e.target);
                const isClickOnToggle = mobileToggle.contains(e.target);
                if (!isClickInsideMenu && !isClickOnToggle) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
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
        },
        'doc-manager': {
            icon: '<i class="fas fa-folder-open"></i>',
            title: 'Proiect: DocManager CLI Engine',
            badges: ['Java OOP', 'Command Pattern', 'Serializare', 'CLI Engine'],
            videoUrl: 'Projects/doc-manager.mp4',
            desc: `
                <p>Catalog modular de documente în Java utilizând Command Pattern, cu mecanisme abstracte de persistență (JSON, Binar și Text) și gestionare a fișierelor.</p>
                <strong>Tehnologii utilizate:</strong> Java SE, Command Design Pattern, serializare JSON (Jackson/Gson), serializare binară, file I/O.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Aplicarea Command Pattern pentru encapsularea operațiunilor ca obiecte, cu suport undo/redo.</li>
                    <li>Proiectarea de interfețe abstracte de persistență cu multiple implementări concrete.</li>
                    <li>Construirea unui CLI engine cu parsare extensibilă a comenzilor.</li>
                    <li>Gestionarea interacțiunilor cu sistemul de fișiere cu tratare adecvată a erorilor.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/workJava',
            actionText: 'Vezi pe GitHub'
        },
        'java-db-integrations': {
            icon: '<i class="fas fa-database"></i>',
            title: 'Proiect: Java DB Integrations',
            badges: ['Java', 'JDBC', 'JPA / Hibernate', 'DAO Pattern', 'PostgreSQL'],
            videoUrl: 'Projects/java-db-integrations.mp4',
            desc: `
                <p>Colecție de servicii Java pentru persistența datelor, integrând conexiuni JDBC custom cu DAO Pattern, importatoare CSV și repo-uri JPA/Hibernate.</p>
                <strong>Tehnologii utilizate:</strong> Java SE, JDBC, JPA / Hibernate, DAO Design Pattern, PostgreSQL, parsare CSV.
                <strong>Competențe dezvoltate:</strong>
                <ul>
                    <li>Scrierea de interogări JDBC raw cu connection pooling și gestionarea corectă a resurselor.</li>
                    <li>Implementarea pattern-ului DAO (Data Access Object) pentru abstractizarea operațiunilor cu baza de date.</li>
                    <li>Utilizarea JPA/Hibernate ORM pentru maparea entităților și gestionarea relațiilor.</li>
                    <li>Construirea de importatoare CSV pentru popularea bazelor de date din surse de date flat-file.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/workJava',
            actionText: 'Vezi pe GitHub'
        }
    };

    /* ==========================================================================
       MODAL DATA — ENGLISH
       ========================================================================== */
    const modalDataEN = {
        campuseats: {
            icon: '<i class="fas fa-utensils"></i>',
            title: 'Project: CampusEats Cafeteria System',
            badges: ['Academic Project', '.NET 8', 'Blazor WASM', 'PostgreSQL', 'Vertical Slice'],
            videoUrl: 'Projects/campuseats.mp4',
            desc: `
                <p>CampusEats is a modular cafeteria ordering platform designed to manage dynamic menus, kitchen order processing, and loyalty programs.</p>
                <strong>Technologies used:</strong> .NET 8 Minimal API, Blazor WebAssembly, Entity Framework Core, PostgreSQL, CQRS (MediatR), FluentValidation, xUnit, NSubstitute.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Structuring the project using <strong>Vertical Slice Architecture</strong> to keep the code modular and maintainable.</li>
                    <li>Building high-performance APIs using .NET 8 Minimal APIs.</li>
                    <li>Implementing the CQRS (Command Query Responsibility Segregation) pattern using MediatR.</li>
                    <li>Writing unit tests with xUnit and mocking services with NSubstitute.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/CampusEats',
            actionText: 'View on GitHub'
        },
        'states-of-the-world': {
            icon: '<i class="fas fa-globe-europe"></i>',
            title: 'Project: States of the World Crawler & API',
            badges: ['Python', 'Web Scraping', 'Flask', 'SQLite', 'Swagger UI'],
            videoUrl: 'Projects/states-of-the-world.mp4',
            desc: `
                <p>A complete solution capable of automatically collecting data about every country in the world (population, area, neighbors, spoken languages) from public web sources, normalizing it, and serving it through a documented REST API.</p>
                <strong>Technologies used:</strong> Python 3.x, Flask, BeautifulSoup, SQLite, Swagger UI (OpenAPI), unittest.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Building robust crawlers with custom BeautifulSoup parsers for unstructured data.</li>
                    <li>Designing a normalized SQLite database with indexes for sub-millisecond queries.</li>
                    <li>Implementing an interactive, self-documented REST API with Swagger UI following the OpenAPI specification.</li>
                    <li>Ensuring code quality through automated unit tests (unittest) for the scraper and endpoints.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/StatesOfTheWorld',
            actionText: 'View on GitHub'
        },
        chatbot: {
            icon: '<i class="fas fa-comments"></i>',
            title: 'Project: Banking Customer Support Chatbot',
            badges: ['Multi-service Backend', 'Java', 'Spring Boot', 'NestJS', 'Prisma'],
            videoUrl: 'Projects/chatbot.mp4',
            desc: `
                <p>A distributed system simulating a customer support chatbot for the banking sector, designed for efficient conversation management and user identity verification.</p>
                <strong>Technologies used:</strong> Java, Spring Boot, NestJS, TypeScript, Prisma ORM, SQL, PostgreSQL.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Building a multi-service architecture interconnected via REST APIs.</li>
                    <li>Using the NestJS framework with TypeScript for the conversational module API.</li>
                    <li>Managing data with Prisma ORM through migrations and normalized data structures.</li>
                    <li>Designing support flows based on real-world financial sector scenarios.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/Chatbot',
            actionText: 'View on GitHub'
        },
        'file-transfer': {
            icon: '<i class="fas fa-server"></i>',
            title: 'Project: Custom FTP Server & Client',
            badges: ['System Programming', 'C Language', 'TCP/IP Sockets', 'POSIX Concurrency'],
            videoUrl: 'Projects/file-transfer.mp4',
            desc: `
                <p>A classic client-server application implementing a file transfer server from scratch in C, including whitelist-based secure authentication and concurrent connection management.</p>
                <strong>Technologies used:</strong> C, Socket Programming (TCP/IP), POSIX System Calls (fork, chdir, mkdir), native file I/O, custom encryption.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Deep understanding of the TCP transport protocol and BSD socket programming in UNIX.</li>
                    <li>Managing multi-process concurrent execution using the <code>fork()</code> system call.</li>
                    <li>Implementing a custom encryption/decryption algorithm to secure credentials.</li>
                    <li>Manipulating directories and files directly at the OS level through POSIX APIs.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/FTP-TCP_RC2025',
            actionText: 'View on GitHub'
        },
        'flight-fear-vr': {
            icon: '<i class="fas fa-vr-cardboard"></i>',
            title: 'Project: FlightFearVR Simulation',
            badges: ['Unity 3D', 'Virtual Reality', 'C#', 'Immersive Therapy'],
            videoUrl: 'Projects/flight-fear-vr.mp4',
            desc: `
                <p>A prototype VR flight simulator designed to desensitize individuals suffering from the fear of flying (aviophobia), offering adjustable immersive scenarios.</p>
                <strong>Technologies used:</strong> Unity 3D, C#, VR SDKs (OpenXR, XR Interaction Toolkit), 3D graphics & environmental design.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Designing immersive 3D scenes and interactions for VR devices.</li>
                    <li>Writing control and event scripts in C# within the Unity engine.</li>
                    <li>Optimizing rendering to maintain a stable frame rate and reduce motion sickness.</li>
                    <li>Studying therapeutic techniques based on controlled stimulus exposure in VR.</li>
                </ul>
            `,
            actionUrl: 'https://youtu.be/b72g985g1DI',
            actionText: 'Watch Demo on YouTube'
        },
        'limbaj-lfac': {
            icon: '<i class="fas fa-code"></i>',
            title: 'Project: LFAC Custom Language Compiler',
            badges: ['Compiler Design', 'C Language', 'Flex', 'Bison', 'AST Graphviz'],
            videoUrl: 'Projects/limbaj-lfac.mp4',
            desc: `
                <p>A complete compiler and interpreter built for a proprietary programming language featuring custom syntax, control structures, and symbol table management.</p>
                <strong>Technologies used:</strong> C language, Flex (lexical analyzer), Bison (parser generator), Graphviz (for AST visualization).
                <strong>Skills developed:</strong>
                <ul>
                    <li>Defining regular expressions for lexical parsing in Flex.</li>
                    <li>Defining the language grammar using Yacc/Bison and implementing semantic actions.</li>
                    <li>Building and managing symbol tables for variables and functions with static type checking.</li>
                    <li>Generating a graphical representation of the Abstract Syntax Tree (AST) using the DOT format.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/LimbajLFAC',
            actionText: 'View on GitHub'
        },
        sportis: {
            icon: '<i class="fas fa-users-rectangle"></i>',
            title: 'Project: SportIS Community Platform',
            badges: ['Web Application', 'PHP MVC', 'MySQL', 'JavaScript', 'C4 Architecture'],
            videoUrl: 'Projects/sportis.mp4',
            desc: `
                <p>A web platform allowing local communities to organize sports activities, invite participants, send friend requests, and manage local matches.</p>
                <strong>Technologies used:</strong> PHP, Custom MVC framework, MySQL, HTML5, CSS3, native JavaScript.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Designing a simplified MVC (Model-View-Controller) framework from scratch in PHP.</li>
                    <li>Managing databases with complex relationships (users, friendships, court bookings).</li>
                    <li>Securing forms against common attacks (SQL Injection, XSS) and validating data on both frontend and backend.</li>
                    <li>Architecting the system using the C4 Diagrams design model.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/LocalGreetings',
            actionText: 'View on GitHub'
        },
        collabstudy: {
            icon: '<i class="fas fa-graduation-cap"></i>',
            title: 'Project: CollabStudy — AI Educational Platform',
            badges: ['Cloud / Microservices', 'Python (Flask)', 'Vue 3', 'Azure Blob', 'SQL Server', 'Azure OpenAI'],
            videoUrl: 'Projects/collabstudy.mp4',
            desc: `
                <p>CollabStudy is a distributed platform for students to manage study documents and automatically generate AI-powered supplementary learning materials.</p>
                <strong>Technologies used:</strong> Python (Flask), Vue 3, Vite, Azure Blob Storage (Azurite), SQL Server (MSSQL), Azure Service Bus (or local HTTP bypass), Azure OpenAI, Azure Document Intelligence.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Developing a microservices architecture decoupled through asynchronous messaging or direct REST APIs.</li>
                    <li>Integrating Azure cognitive services for intelligent document processing (Document Intelligence for PDF extraction and OpenAI for generating summaries and quizzes).</li>
                    <li>Robustly managing binary storage in Azure Blob Storage (Azurite locally).</li>
                    <li>Configuring and managing SQL Server databases with complex relationships between users, documents, questions, and answers.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/CollabStudy',
            actionText: 'View on GitHub'
        },
        'image-resizer': {
            icon: '<i class="fas fa-images"></i>',
            title: 'Project: PhotoResizer — Serverless Microservice',
            badges: ['Cloud / Serverless', 'Python', 'Flask', 'GCP Functions', 'Cloud Storage', 'Firestore'],
            videoUrl: 'Projects/image-resizer.mp4',
            desc: `
                <p>An asynchronous image processing system based on the Serverless computation model. Users upload images which are processed at multiple resolutions in the background and stored securely.</p>
                <strong>Technologies used:</strong> Python, Flask, Google Cloud Functions (Functions Framework), Google Cloud Storage, Firestore (for metadata storage), Authlib (Google OAuth2).
                <strong>Skills developed:</strong>
                <ul>
                    <li>Building decoupled serverless functions for asynchronous manipulation of large media resources using Pillow.</li>
                    <li>Designing a NoSQL database in Cloud Firestore for storing state and available resolutions.</li>
                    <li>Integrating secure Google OAuth 2.0 authentication for user session management.</li>
                    <li>Storing binary files in Google Cloud Storage (with a local emulator for fast local testing).</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/CloudComputing/tree/main/tema3',
            actionText: 'View on GitHub'
        },
        'tema-sapt4': {
            icon: '<i class="fas fa-list-check"></i>',
            title: 'Project: Order Management Architecture',
            badges: ['.NET Core API', 'MediatR (CQRS)', 'FluentValidation', 'AutoMapper', 'Custom Middleware'],
            videoUrl: 'Projects/tema-sapt4.mp4',
            desc: `
                <p>A robust API centered on advanced design patterns for order management, ensuring operation decoupling and request tracking through dedicated middleware.</p>
                <strong>Technologies used:</strong> .NET Core, MediatR, FluentValidation, AutoMapper, Entity Framework Core InMemory, Correlation Middleware.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Implementing the mediator pattern for modular structuring of queries and commands.</li>
                    <li>Configuring request validation rules at the pipeline level via FluentValidation.</li>
                    <li>Implementing a custom Correlation ID tracking middleware for distributed logging.</li>
                    <li>Automating object mapping (DTOs) with AutoMapper.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/TemaSapt4',
            actionText: 'View on GitHub'
        },
        'homework2-dashboard': {
            icon: '<i class="fas fa-chart-line"></i>',
            title: 'Project: Real-Time Aggregator Dashboard',
            badges: ['Full-Stack', '.NET 10', 'Vue 3', 'Node.js / Express', 'SQLite', 'REST Integration'],
            videoUrl: 'Projects/homework2-dashboard.mp4',
            desc: `
                <p>A full-stack data aggregation platform combining data in real-time from multiple external and local sources, designed to demonstrate heterogeneous web service integration.</p>
                <strong>Technologies used:</strong> .NET 10 (main Web API), Vue 3 (frontend client), Node.js/Express (local recipe microservice with PostgreSQL), SQLite (system log recording), HttpClient, CORS Policy.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Building aggregated APIs by consuming third-party REST web services in parallel using <code>HttpClientFactory</code>.</li>
                    <li>Applying .NET 10 concepts to configure permissive and secure CORS policies for communication with the Vue 3 client.</li>
                    <li>Securely managing API keys (OpenWeather and NewsAPI) using <code>.env</code> files via the dotenv.net library.</li>
                    <li>Persisting request history (logging) directly to a SQLite database via Entity Framework Core.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/CloudComputingCourse/tree/main/homework2',
            actionText: 'View on GitHub'
        },
        dotgame: {
            icon: '<i class="fas fa-gamepad"></i>',
            title: 'Project: DotGame — Graph Theory Desktop Game',
            badges: ['Desktop App', 'Java', 'Swing & AWT', 'Graph Theory', 'Kruskal MST', 'graph4j'],
            videoUrl: 'Projects/dotgame.mp4',
            desc: `
                <p>An interactive desktop application developed in Java for simulating a positional graph connection game. The game compares player moves in real-time against the minimum spanning tree.</p>
                <strong>Technologies used:</strong> Java, Swing (GUI), AWT Graphics 2D, graph4j library, Kruskal Minimum Spanning Tree (MST) algorithm, Java Serialization.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Implementing interactive canvas-style GUIs using <code>Graphics2D</code> and dynamically handling mouse events (<code>MouseAdapter</code>).</li>
                    <li>Applying advanced mathematical concepts (Graph Theory) in game logic development.</li>
                    <li>Integrating the external <code>graph4j</code> library for efficient representation of nodes and weighted edges based on Euclidean distances.</li>
                    <li>Applying the Kruskal algorithm to determine the Minimum Spanning Tree (MST) and compute the optimal score in real-time.</li>
                    <li>Serializing game state for local save and restore functionality.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/workJava/tree/main/DotGame',
            actionText: 'View on GitHub'
        },
        'concurrency-scrabble': {
            icon: '<i class="fas fa-project-diagram"></i>',
            title: 'Project: Concurrent Scrabble Simulator',
            badges: ['Concurrency', 'Java', 'Multithreading', 'System Synchronization'],
            videoUrl: 'Projects/scrabble-sim.mp4',
            desc: `
                <p>A complex Java simulation of a Scrabble game based on concurrent execution, designed to demonstrate concurrency management and process synchronization at the shared memory level.</p>
                <strong>Technologies used:</strong> Java SE, Multithreading (Threads & Runnable), Thread Synchronization (synchronized blocks, wait/notify, lock objects).
                <strong>Skills developed:</strong>
                <ul>
                    <li>Architecting a parallel execution flow where each player runs as an independent thread.</li>
                    <li>Safely synchronizing access to critical shared resources such as the tile bag (<code>TileBag</code>) and the game board (<code>Board</code>) to avoid race conditions.</li>
                    <li>Implementing a virtual game referee capable of validating words added concurrently from a pre-loaded dictionary.</li>
                    <li>Controlling thread lifecycle, managing their states, and safely completing the game.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/workJava/tree/main/Lab7-fin',
            actionText: 'View on GitHub'
        },
        'doc-manager': {
            icon: '<i class="fas fa-folder-open"></i>',
            title: 'Project: DocManager CLI Engine',
            badges: ['Java OOP', 'Command Pattern', 'Serialization', 'CLI Engine'],
            videoUrl: 'Projects/doc-manager.mp4',
            desc: `
                <p>A modular Java document catalog using the Command Pattern, with abstract persistence mechanisms (JSON, Binary, and Text) and comprehensive file management capabilities.</p>
                <strong>Technologies used:</strong> Java SE, Command Design Pattern, JSON serialization (Jackson/Gson), binary serialization, file I/O.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Applying the Command Pattern to encapsulate operations as objects for undo/redo support.</li>
                    <li>Designing abstract persistence interfaces with multiple concrete implementations.</li>
                    <li>Building a CLI engine with extensible command parsing.</li>
                    <li>Managing file system interactions safely with proper error handling.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/workJava',
            actionText: 'View on GitHub'
        },
        'java-db-integrations': {
            icon: '<i class="fas fa-database"></i>',
            title: 'Project: Java DB Integrations',
            badges: ['Java', 'JDBC', 'JPA / Hibernate', 'DAO Pattern', 'PostgreSQL'],
            videoUrl: 'Projects/java-db-integrations.mp4',
            desc: `
                <p>A collection of Java data persistence services integrating custom JDBC connections with the DAO Pattern, CSV importers, and JPA/Hibernate repositories.</p>
                <strong>Technologies used:</strong> Java SE, JDBC, JPA / Hibernate, DAO Design Pattern, PostgreSQL, CSV parsing.
                <strong>Skills developed:</strong>
                <ul>
                    <li>Writing raw JDBC queries with connection pooling and proper resource management.</li>
                    <li>Implementing the DAO (Data Access Object) pattern to abstract database operations.</li>
                    <li>Using JPA/Hibernate ORM for entity mapping and relationship management.</li>
                    <li>Building CSV importers to seed databases from flat-file data sources.</li>
                </ul>
            `,
            actionUrl: 'https://github.com/PetruGlt/workJava',
            actionText: 'View on GitHub'
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
    const openModal = (key, teamSize) => {
        const data = (currentLang === 'en' ? modalDataEN[key] : modalData[key]) || modalData[key];
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

        // Team size badge in modal
        const modalTeamBadge = document.getElementById('modal-team-badge');
        if (modalTeamBadge && teamSize) {
            const n = parseInt(teamSize, 10);
            let icon, label;
            if (currentLang === 'en') {
                if (n === 1)      { icon = '\u{1F9D1}\u200D\u{1F4BB}'; label = 'Solo project'; }
                else if (n <= 5)  { icon = '\u{1F465}'; label = `Team of ${n}`; }
                else              { icon = '\u{1F465}'; label = `Large team (${n} people)`; }
            } else {
                if (n === 1)      { icon = '\u{1F9D1}\u200D\u{1F4BB}'; label = 'Proiect individual'; }
                else if (n <= 5)  { icon = '\u{1F465}'; label = `Echip\u0103 de ${n} persoane`; }
                else              { icon = '\u{1F465}'; label = `Echip\u0103 mare (${n} persoane)`; }
            }
            modalTeamBadge.innerHTML = `<span class="modal-team-icon">${icon}</span>${label}`;
            modalTeamBadge.style.display = 'flex';
        } else if (modalTeamBadge) {
            modalTeamBadge.style.display = 'none';
        }

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

    // Inject team size badges on all project cards
    document.querySelectorAll('.project-card[data-team]').forEach(card => {
        const n = parseInt(card.getAttribute('data-team'), 10);
        if (!n) return;
        const badge = document.createElement('div');
        badge.className = 'team-badge';
        const isLarge = n > 5;
        badge.dataset.team = n;
        badge.innerHTML = `<i class="fas fa-${n === 1 ? 'user' : 'users'}"></i><span>${n === 1 ? '1' : n}</span>`;
        if (isLarge) badge.classList.add('team-large');
        card.querySelector('.project-header-info').appendChild(badge);
    });

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
        const teamSize = card.getAttribute('data-team');
        if (!projectKey) return;

        card.addEventListener('click', (e) => {
            openModal(projectKey, teamSize);
        });

        const btn = card.querySelector('.btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Avoid double modal triggers
                openModal(projectKey, teamSize);
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


