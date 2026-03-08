import { useState, useEffect } from "react";

/* ─── i18n ──────────────────────────────────────────────────────────────────── */
const T = {
  en: {
    eyebrow: "Product Leader · AI Platforms · Paris, France",
    h1a: "Shipping AI products",
    h1b: "that make 100,000 people work smarter.",
    heroCopy: "4+ years driving AI-powered B2B/B2E platforms from strategy to scale, across industrial and service sectors in international environments.",
    cta1: "View projects", cta2: "Let's collaborate",
    navPath: "Path", navProjects: "Projects", navMethods: "Methods", navContact: "Contact",
    pathEyebrow: "Professional Path", pathH2: "From product strategy to platform scale",
    eduEyebrow: "Education", eduH2: "Academic background",
    projEyebrow: "Selected Work", projH2: "Things I've shipped",
    ytEyebrow: "Creator · Side Project", ytH2: "The Janus Gaze",
    ytDesc: "Inspired by the god of transitions, I try to look backward at film history and forward at its evolution, and analyze how films stand between the past and the future.",
    ytSub: "Subscribe ↗",
    podEyebrow: "Co-host · 2021–2023", podH2: "从长记议 · Podcast",
    podDesc: "A trilingual conversational podcast co-hosted with two friends, exploring society, culture, and the anxieties of modern life. Published weekly for 2+ years.",
    podStats: "70 episodes · 900k+ listens · 5,300+ subscribers",
    podApple: "Apple Podcasts ↗", podSpotify: "Spotify ↗",
    methodEyebrow: "How I Work", methodH2: "Product methodology",
    methodNote: "Every decision follows the same loop — collect qualitative and quantitative signal, RICE-score the options, ship the smallest testable increment, measure NPS and engagement, iterate. Used this system to achieve NPS >70 across 100k+ users at Saint-Gobain.",
    contactEyebrow: "Contact", contactH2: "Available for senior PM roles and product advisory.",
    avail: "Open to new opportunities",
    sendBtn: "Send message", successTitle: "You're in my inbox.", successSub: "I'll reply within 24 hours. À bientôt!",
    footerCopy: "© 2025 Yalong Li · Paris, France",
    nameLabel: "Name", emailLabel: "Email", msgLabel: "Message",
    namePh: "Your name", emailPh: "you@company.com", msgPh: "Tell me what you're building…",
    podEp1T: "Living in Paris", podEp1D: "Exploring life in Paris — cultural shifts, the city's political energy, and what it means to study abroad during uncertain times.",
    podEp2T: "The Proust Questionnaire", podEp2D: "Three hosts tackle Proust's famous soul-searching questionnaire — happiness, fear, regret, and the meaning of life.",
    podEp3T: "Hello Summer!", podEp3D: "Season 2 finale — summer dreams, childhood nostalgia, book recommendations, and a preview of Season 3.",
    methodNoteLabel: "The through-line", projLinkLabel: "Case study", methodLinkLabel: "Read more →",
    backHome: "← Back", readTime: "min read", publishedOn: "Published",
  },
  fr: {
    eyebrow: "Chef de Produit · Plateformes IA · Paris, France",
    h1a: "Je livre des produits IA", h1b: "qui rendent 100 000 personnes plus efficaces.",
    heroCopy: "4+ ans à piloter des plateformes B2B/B2E propulsées par l'IA, de la stratégie au déploiement à grande échelle, dans des secteurs industriels et de services en contexte international.",
    cta1: "Voir les projets", cta2: "Collaborons",
    navPath: "Parcours", navProjects: "Projets", navMethods: "Méthodes", navContact: "Contact",
    pathEyebrow: "Parcours Professionnel", pathH2: "De la stratégie produit à l'échelle plateforme",
    eduEyebrow: "Formation", eduH2: "Parcours académique",
    projEyebrow: "Travaux Sélectionnés", projH2: "Ce que j'ai livré",
    ytEyebrow: "Créateur · Projet Perso", ytH2: "The Janus Gaze",
    ytDesc: "Inspiré par le dieu des transitions, j'essaie de regarder en arrière vers l'histoire du cinéma et en avant vers son évolution, et d'analyser comment les films se situent entre le passé et le futur.",
    ytSub: "S'abonner ↗",
    podEyebrow: "Co-animateur · 2021–2023", podH2: "从长记议 · Podcast",
    podDesc: "Un podcast conversationnel trilingue co-animé avec deux amis, explorant la société, la culture et les angoisses de la vie moderne. Publié chaque semaine pendant plus de 2 ans.",
    podStats: "70 épisodes · 900k+ écoutes · 5 300+ abonnés",
    podApple: "Apple Podcasts ↗", podSpotify: "Spotify ↗",
    methodEyebrow: "Ma Façon de Travailler", methodH2: "Méthodologie produit",
    methodNote: "Chaque décision suit la même boucle — collecter des signaux qualitatifs et quantitatifs, scorer les options avec RICE, livrer le plus petit incrément testable, mesurer le NPS et l'engagement, itérer. Ce système m'a permis d'atteindre un NPS >70 auprès de 100k+ utilisateurs chez Saint-Gobain.",
    contactEyebrow: "Contact", contactH2: "Disponible pour des postes PM senior et du conseil produit.",
    avail: "Ouvert aux nouvelles opportunités",
    sendBtn: "Envoyer le message", successTitle: "Vous êtes dans ma boîte mail.", successSub: "Je réponds sous 24 heures. À bientôt !",
    footerCopy: "© 2025 Yalong Li · Paris, France",
    nameLabel: "Nom", emailLabel: "E-mail", msgLabel: "Message",
    namePh: "Votre nom", emailPh: "vous@entreprise.com", msgPh: "Dites-moi ce que vous construisez…",
    podEp1T: "Vivre à Paris", podEp1D: "Explorer la vie à Paris — changements culturels, l'énergie politique de la ville, et ce que signifie étudier à l'étranger en temps incertains.",
    podEp2T: "Le Questionnaire de Proust", podEp2D: "Trois animateurs répondent au célèbre questionnaire de Proust — bonheur, peur, regrets, et sens de la vie.",
    podEp3T: "Hello Summer !", podEp3D: "Finale de la saison 2 — rêves d'été, nostalgie d'enfance, recommandations de livres et aperçu de la saison 3.",
    methodNoteLabel: "Le fil conducteur", projLinkLabel: "Étude de cas", methodLinkLabel: "Lire plus →",
    backHome: "← Retour", readTime: "min de lecture", publishedOn: "Publié le",
  },
};

/* ─── Projects data (with full detail content) ──────────────────────────────── */
const PROJECTS = [
  {
    id: "frontline-ai",
    tag: "AI · B2E", tagFr: "IA · B2E",
    titleEn: "Frontline AI Platform", titleFr: "Plateforme IA Terrain",
    summaryEn: "3 GenAI applications for 100k+ manufacturing & supply chain workers. Automated operations and drove 30%+ sustained engagement. NPS >70.",
    summaryFr: "3 applications GenAI pour 100k+ opérateurs industriels et supply chain. Opérations automatisées, +30% d'engagement soutenu. NPS >70.",
    date: "2023–2026", readMins: 6,
    contentEn: [
      { type: "intro", text: "At Saint-Gobain, I owned the product vision and delivery of three AI-powered applications used by over 100,000 frontline workers across manufacturing plants and supply chain operations worldwide." },
      { type: "h2", text: "The Problem" },
      { type: "p", text: "Frontline workers — operators, engineers, plant managers — were relying on disconnected paper-based processes and fragmented digital tools to report incidents, track quality issues, and escalate problems. This created slow feedback loops, high error rates, and poor visibility for management." },
      { type: "h2", text: "My Approach" },
      { type: "p", text: "I applied an ROI Navigator model: enterprise context demanded value-based prioritisation and incremental ROI validation at every sprint. I led three cross-functional Agile squads (10–15 FTEs each) through a disciplined 7-step delivery cycle — from BRD and task force to shopfloor validation." },
      { type: "callout", text: "\"Users own the autonomy to decide which analysis tools to use.\" — Product principle I anchored the platform design around." },
      { type: "h2", text: "What We Built" },
      { type: "p", text: "Three integrated applications: a QR-code-triggered incident reporting tool, a secondary analysis suite (SFA, 8D, Ishikawa), and a KPI tracking dashboard connected to PowerBI. Each was designed mobile-first for shopfloor use." },
      { type: "h2", text: "Results" },
      { type: "metrics", items: ["100,000+ active users", "NPS > 70", "+30% sustained engagement", "3 Agile squads coordinated"] },
      { type: "h2", text: "What I Learned" },
      { type: "p", text: "At B2E scale, adoption is never automatic. The biggest lever wasn't the feature set — it was the feedback loop. Monthly NPS extracts, community meetings, and RICE-scored backlogs kept us relentlessly focused on real pain points rather than assumed needs." },
    ],
    contentFr: [
      { type: "intro", text: "Chez Saint-Gobain, j'ai piloté la vision produit et la livraison de trois applications alimentées par l'IA, utilisées par plus de 100 000 opérateurs industriels dans les usines et les opérations supply chain à travers le monde." },
      { type: "h2", text: "Le Problème" },
      { type: "p", text: "Les opérateurs, ingénieurs et responsables d'usine s'appuyaient sur des processus papier déconnectés et des outils numériques fragmentés pour signaler les incidents, suivre les problèmes qualité et escalader les alertes. Cela créait des boucles de feedback lentes, des taux d'erreur élevés et une visibilité insuffisante pour le management." },
      { type: "h2", text: "Mon Approche" },
      { type: "p", text: "J'ai appliqué le modèle ROI Navigator : le contexte enterprise exigeait une priorisation basée sur la valeur et une validation incrémentale du ROI à chaque sprint. J'ai piloté trois équipes Agile transverses (10–15 ETP chacune) via un cycle de livraison discipliné en 7 étapes." },
      { type: "callout", text: "\"Les utilisateurs ont l'autonomie de choisir les outils d'analyse qu'ils préfèrent utiliser.\" — Principe produit au cœur de la conception de la plateforme." },
      { type: "h2", text: "Ce que Nous Avons Construit" },
      { type: "p", text: "Trois applications intégrées : un outil de signalement d'incidents déclenché par QR code, une suite d'analyse secondaire (SFA, 8D, Ishikawa), et un tableau de bord KPI connecté à PowerBI. Chaque application a été conçue mobile-first pour une utilisation en atelier." },
      { type: "h2", text: "Résultats" },
      { type: "metrics", items: ["100 000+ utilisateurs actifs", "NPS > 70", "+30% d'engagement soutenu", "3 équipes Agile coordonnées"] },
      { type: "h2", text: "Ce que J'ai Appris" },
      { type: "p", text: "À l'échelle B2E, l'adoption n'est jamais automatique. Le levier principal n'était pas le périmètre fonctionnel — c'était la boucle de feedback. Les extraits NPS mensuels, les réunions communautaires et les backlogs scorés RICE nous ont maintenus focalisés sur les vraies douleurs utilisateurs." },
    ],
  },
  {
    id: "cat-suite",
    tag: "B2B SaaS", tagFr: "B2B SaaS",
    titleEn: "CAT Product Suite", titleFr: "Suite Produit CAT",
    summaryEn: "End-to-end lifecycle ownership of computer-aided translation tools. −15% time-to-market, −10% ops cost, +22% user adoption.",
    summaryFr: "Propriété complète du cycle de vie des outils de traduction assistée. −15% time-to-market, −10% coûts opérationnels, +22% adoption.",
    date: "2021–2022", readMins: 5,
    contentEn: [
      { type: "intro", text: "At Lan-Bridge Group, I owned the full product lifecycle of a B2B computer-aided translation (CAT) tool suite used by enterprise translation teams and language service providers across Asia." },
      { type: "h2", text: "The Problem" },
      { type: "p", text: "The existing CAT tools were feature-rich but operationally slow — long release cycles, disconnected client feedback, and unclear prioritisation criteria meant that high-value improvements were buried under low-impact requests." },
      { type: "h2", text: "My Approach" },
      { type: "p", text: "I introduced structured data-driven prioritisation using RICE scoring and formalized the product discovery process with regular user interviews and competitive monitoring. I also bridged the gap between sales and engineering by owning the BRD process end-to-end." },
      { type: "h2", text: "Key Initiatives" },
      { type: "p", text: "Redesigned the sprint planning and backlog refinement process. Introduced A/B testing for UI changes. Created a feedback pipeline from client support tickets into JIRA stories, with monthly RICE re-scoring sessions." },
      { type: "callout", text: "Moving from gut-feel releases to data-scored prioritisation was the single highest-leverage change I made." },
      { type: "h2", text: "Results" },
      { type: "metrics", items: ["−15% time-to-market", "−10% operational costs", "+22% user adoption", "+40% user engagement"] },
    ],
    contentFr: [
      { type: "intro", text: "Chez Lan-Bridge Group, j'ai piloté le cycle de vie complet d'une suite d'outils de traduction assistée B2B utilisée par des équipes de traduction enterprise et des prestataires de services linguistiques en Asie." },
      { type: "h2", text: "Le Problème" },
      { type: "p", text: "Les outils CAT existants étaient riches en fonctionnalités mais lents opérationnellement — des cycles de release longs, des retours clients déconnectés et des critères de priorisation flous signifiaient que les améliorations à forte valeur étaient enfouies sous des demandes à faible impact." },
      { type: "h2", text: "Mon Approche" },
      { type: "p", text: "J'ai introduit une priorisation structurée et data-driven via le scoring RICE et formalisé le processus de découverte produit avec des entretiens utilisateurs réguliers et une veille concurrentielle. J'ai également fait le pont entre ventes et ingénierie en pilotant le processus BRD de bout en bout." },
      { type: "callout", text: "Passer de releases intuitives à une priorisation scorée par les données a été le changement au levier le plus élevé que j'ai réalisé." },
      { type: "h2", text: "Résultats" },
      { type: "metrics", items: ["−15% time-to-market", "−10% coûts opérationnels", "+22% adoption utilisateur", "+40% engagement utilisateur"] },
    ],
  },
  {
    id: "museum-rfp",
    tag: "Pre-Sales · $7M", tagFr: "Avant-vente · 7M$",
    titleEn: "Shenzhen Museum RFP", titleFr: "Appel d'offres Musée Shenzhen",
    summaryEn: "Led multilingual negotiations for Shenzhen Science Museum's Cosmic Origins exhibit. Won a $7M contract.",
    summaryFr: "Piloté des négociations multilingues pour l'exposition Origines Cosmiques du Musée des Sciences de Shenzhen. Remporté un contrat de 7M$.",
    date: "2021", readMins: 4,
    contentEn: [
      { type: "intro", text: "While at CID Falcon, I led the pre-sales and negotiation process for a $7M contract to design and deliver the Cosmic Origins permanent exhibit at the Shenzhen Science and Technology Museum." },
      { type: "h2", text: "The Challenge" },
      { type: "p", text: "The RFP involved multiple stakeholders across government cultural institutions, international design firms, and local execution partners — all communicating across language and cultural boundaries. The proposal required both technical credibility and narrative coherence." },
      { type: "h2", text: "My Role" },
      { type: "p", text: "I led the multilingual coordination and benchmark research, synthesising international museum exhibition standards with the client's vision. I managed stakeholder communication in Mandarin, English, and French across a compressed timeline." },
      { type: "callout", text: "Winning this RFP was less about having the best slides, and more about being the team that best understood the client's unstated ambitions." },
      { type: "h2", text: "Outcome" },
      { type: "metrics", items: ["$7M contract won", "Cosmic Origins exhibit — permanent collection", "Multilingual stakeholder coordination", "International design & execution partnership"] },
    ],
    contentFr: [
      { type: "intro", text: "Chez CID Falcon, j'ai piloté le processus d'avant-vente et de négociation pour un contrat de 7M$ visant à concevoir et livrer l'exposition permanente Origines Cosmiques au Musée des Sciences et Technologies de Shenzhen." },
      { type: "h2", text: "Le Défi" },
      { type: "p", text: "L'appel d'offres impliquait de multiples parties prenantes dans des institutions culturelles gouvernementales, des cabinets de design internationaux et des partenaires d'exécution locaux — tous communicant à travers des barrières linguistiques et culturelles." },
      { type: "callout", text: "Remporter cet appel d'offres tenait moins à la qualité des slides qu'à notre capacité à comprendre les ambitions non exprimées du client." },
      { type: "h2", text: "Résultat" },
      { type: "metrics", items: ["Contrat de 7M$ remporté", "Exposition Origines Cosmiques — collection permanente", "Coordination multilingue des parties prenantes", "Partenariat design & exécution international"] },
    ],
  },
];

/* ─── Methods data (with full detail content) ───────────────────────────────── */
const PM_METHODS = [
  {
    id: "rice",
    tagEn: "Prioritisation", tagFr: "Priorisation",
    titleEn: "RICE Scoring", titleFr: "Score RICE",
    bodyEn: "Every feature scored by Reach × Impact × Confidence ÷ Effort before entering the backlog. Removes gut-feel, surfaces highest-ROI work.",
    bodyFr: "Chaque fonctionnalité scorée par Reach × Impact × Confidence ÷ Effort avant d'entrer dans le backlog. Supprime l'intuition, révèle le travail à plus fort ROI.",
    readMins: 4,
    contentEn: [
      { type: "intro", text: "RICE scoring is the backbone of my prioritisation process. It transforms subjective feature debates into structured, comparable decisions grounded in user and business reality." },
      { type: "h2", text: "The Formula" },
      { type: "callout", text: "RICE Score = (Reach × Impact × Confidence) ÷ Effort" },
      { type: "p", text: "Reach: how many users are affected per time period. Impact: how much it moves the needle (0.25 to 3×). Confidence: how certain you are in your estimates (50–100%). Effort: person-weeks or person-months to ship." },
      { type: "h2", text: "A Real Example" },
      { type: "p", text: "At Saint-Gobain, a notification feature for plant managers was scored: Reach = 160 plants, Impact = 2 (high), Confidence = 80%, Effort = 9 weeks. RICE = (160 × 2 × 0.8) / 9 = 28.4. This compared directly against other candidates in the same scoring session." },
      { type: "h2", text: "When to Use It" },
      { type: "p", text: "RICE works best when you have 5+ competing features and stakeholders with different agendas. It's not a replacement for qualitative judgment — it's a forcing function that surfaces assumptions and makes trade-offs explicit." },
      { type: "h2", text: "Common Pitfalls" },
      { type: "p", text: "Over-confidence in Confidence scores. Inflating Reach for pet features. Underestimating Effort. The solution: score as a team, not solo. Divergent scores reveal misaligned assumptions worth discussing." },
    ],
    contentFr: [
      { type: "intro", text: "Le scoring RICE est la colonne vertébrale de mon processus de priorisation. Il transforme des débats subjectifs sur les fonctionnalités en décisions structurées et comparables, ancrées dans la réalité utilisateur et business." },
      { type: "h2", text: "La Formule" },
      { type: "callout", text: "Score RICE = (Reach × Impact × Confidence) ÷ Effort" },
      { type: "p", text: "Reach : combien d'utilisateurs sont concernés par période. Impact : dans quelle mesure cela fait bouger les choses (0,25 à 3×). Confidence : degré de certitude dans les estimations (50–100%). Effort : personnes-semaines ou personnes-mois pour livrer." },
      { type: "h2", text: "Un Exemple Réel" },
      { type: "p", text: "Chez Saint-Gobain, une fonctionnalité de notification pour les responsables d'usine a été scorée : Reach = 160 usines, Impact = 2, Confidence = 80%, Effort = 9 semaines. RICE = (160 × 2 × 0,8) / 9 = 28,4." },
      { type: "h2", text: "Écueils Courants" },
      { type: "p", text: "Surconfiance dans les scores de Confidence. Reach gonflé pour les fonctionnalités favorites. Effort sous-estimé. La solution : scorer en équipe, pas individuellement. Les scores divergents révèlent des hypothèses désalignées." },
    ],
  },
  {
    id: "user-research",
    tagEn: "User Research", tagFr: "Recherche Utilisateur",
    titleEn: "Mixed-Method Research", titleFr: "Recherche Méthodes Mixtes",
    bodyEn: "Qualitative (interviews, usability testing, field studies) paired with quantitative (A/B testing, analytics, NPS) — method chosen based on project nature.",
    bodyFr: "Qualitatif (entretiens, tests d'utilisabilité, études terrain) couplé au quantitatif (A/B testing, analytics, NPS) — méthode choisie selon la nature du projet.",
    readMins: 5,
    contentEn: [
      { type: "intro", text: "No single research method answers all questions. I use a matrix approach — pairing qualitative depth with quantitative scale, and choosing tools based on what the product stage and question actually require." },
      { type: "h2", text: "The Research Matrix" },
      { type: "p", text: "The key axes are Attitudinal vs Behavioural (what people say vs what they do) and Qualitative vs Quantitative (why/how vs how many/how much). Placing your research question on this matrix tells you which method to reach for." },
      { type: "h2", text: "Methods I Use" },
      { type: "p", text: "Discovery: stakeholder interviews, field studies, contextual inquiry. Validation: usability testing, concept testing, card sorting. Measurement: NPS surveys, A/B testing, clickstream analytics, diary studies." },
      { type: "callout", text: "The method of research is to be defined based on the nature of the project — not based on convenience or habit." },
      { type: "h2", text: "At Saint-Gobain" },
      { type: "p", text: "Monthly NPS extracts provided quantitative signals. Community meetings and task force interviews gave qualitative depth. Field studies on the shopfloor revealed context that no survey could capture — workers scanning QR codes in gloves, with loud machinery nearby." },
    ],
    contentFr: [
      { type: "intro", text: "Aucune méthode de recherche unique ne répond à toutes les questions. J'utilise une approche matricielle — associant la profondeur qualitative à l'échelle quantitative, et choisissant les outils en fonction de ce que le stade produit et la question exigent réellement." },
      { type: "h2", text: "La Matrice de Recherche" },
      { type: "p", text: "Les axes clés sont Attitudinal vs Comportemental (ce que les gens disent vs ce qu'ils font) et Qualitatif vs Quantitatif (pourquoi/comment vs combien). Placer votre question de recherche sur cette matrice indique quelle méthode utiliser." },
      { type: "callout", text: "La méthode de recherche doit être définie selon la nature du projet — pas selon la commodité ou l'habitude." },
      { type: "h2", text: "Chez Saint-Gobain" },
      { type: "p", text: "Les extraits NPS mensuels fournissaient des signaux quantitatifs. Les réunions communautaires et les entretiens en task force apportaient la profondeur qualitative. Les études terrain en atelier révélaient un contexte qu'aucune enquête ne pouvait capturer." },
    ],
  },
  {
    id: "rfm",
    tagEn: "Engagement", tagFr: "Engagement",
    titleEn: "RFM Segmentation", titleFr: "Segmentation RFM",
    bodyEn: "Users segmented by Recency, Frequency, and Monetary value to tailor re-engagement strategies and focus retention efforts where they matter most.",
    bodyFr: "Utilisateurs segmentés par Récence, Fréquence et Valeur Monétaire pour adapter les stratégies de ré-engagement et concentrer les efforts de rétention.",
    readMins: 4,
    contentEn: [
      { type: "intro", text: "RFM segmentation turns a flat user base into actionable groups — each with a different engagement profile and a different strategy to match." },
      { type: "h2", text: "The Three Dimensions" },
      { type: "p", text: "Recency: time since last engagement. Frequency: how often they interact. Monetary Value (or in B2E contexts, usage intensity): how deeply they rely on the product." },
      { type: "h2", text: "The Four Segments" },
      { type: "p", text: "Loyal Users (high R, high F): reward and retain. New/Occasional (high R, low F): establish habit with onboarding nudges. At-Risk (low R, high F): re-engage with targeted campaigns. Lost Users (low R, low F): analyse reasons, offer strong incentives or accept churn." },
      { type: "callout", text: "At Saint-Gobain, the key metric wasn't daily active users — it was weekly active plants. RFM had to be adapted to an industrial B2E context." },
      { type: "h2", text: "Practical Application" },
      { type: "p", text: "I used RFM to allocate product support resources, prioritise which plant communities to engage with in monthly feedback sessions, and decide which features to position in re-engagement communications." },
    ],
    contentFr: [
      { type: "intro", text: "La segmentation RFM transforme une base d'utilisateurs plate en groupes actionnables — chacun avec un profil d'engagement différent et une stratégie adaptée." },
      { type: "h2", text: "Les Trois Dimensions" },
      { type: "p", text: "Récence : temps depuis le dernier engagement. Fréquence : à quelle fréquence ils interagissent. Valeur Monétaire (ou intensité d'usage en contexte B2E) : dans quelle mesure ils s'appuient sur le produit." },
      { type: "callout", text: "Chez Saint-Gobain, la métrique clé n'était pas les utilisateurs actifs quotidiens — c'était les usines actives hebdomadaires. Le RFM a dû être adapté à un contexte industriel B2E." },
    ],
  },
  {
    id: "iterative-dev",
    tagEn: "Delivery", tagFr: "Livraison",
    titleEn: "Iterative Dev Process", titleFr: "Processus de Développement Itératif",
    bodyEn: "7-step disciplined cycle: validate → task force → BRD → prototype → test → plan → develop. MVP-first mindset with shopfloor validation at every gate.",
    bodyFr: "Cycle discipliné en 7 étapes : valider → task force → BRD → prototype → tester → planifier → développer. Approche MVP-first avec validation terrain à chaque porte.",
    readMins: 5,
    contentEn: [
      { type: "intro", text: "A disciplined iterative process is what turns good ideas into shipped products — and shipped products into measurable business value. Here's the exact cycle I used at Saint-Gobain." },
      { type: "h2", text: "The 7 Steps" },
      { type: "p", text: "1. Validate & prioritise the request (PO + BU validation team). 2. Create a task force of representative users. 3. Write the Business Requirement Document. 4. Design the prototype (with task force interviews). 5. Test the prototype on shopfloor employees. 6. Define the development plan and MVP scope. 7. Develop, test, and iterate with the task force validating each deliverable." },
      { type: "callout", text: "Make sure to define the MVP and what will be added in future versions — scope creep is the enemy of delivery velocity." },
      { type: "h2", text: "Go / No-Go Gates" },
      { type: "p", text: "Steps 1, 3, and 5 are explicit go/no-go decision points. If the task force doesn't validate the prototype, we don't proceed to development. This prevents expensive late-stage rework." },
      { type: "h2", text: "Design Integration" },
      { type: "p", text: "For major revamps, I worked with the Group Design team. For feature-level work, an embedded designer in the squad handled UX. Research method — usability testing, field studies, interviews, A/B testing — was chosen based on the specific question each sprint needed to answer." },
    ],
    contentFr: [
      { type: "intro", text: "Un processus itératif discipliné est ce qui transforme les bonnes idées en produits livrés — et les produits livrés en valeur business mesurable. Voici le cycle exact que j'ai utilisé chez Saint-Gobain." },
      { type: "h2", text: "Les 7 Étapes" },
      { type: "p", text: "1. Valider et prioriser la demande (PO + équipe validation BU). 2. Créer une task force d'utilisateurs représentatifs. 3. Rédiger le Business Requirement Document. 4. Concevoir le prototype (avec entretiens task force). 5. Tester le prototype avec les opérateurs terrain. 6. Définir le plan de développement et le périmètre MVP. 7. Développer, tester et itérer avec la task force validant chaque livrable." },
      { type: "callout", text: "S'assurer de définir le MVP et ce qui sera ajouté dans les versions futures — le scope creep est l'ennemi de la vélocité de livraison." },
    ],
  },
  {
    id: "nps-loop",
    tagEn: "NPS Loop", tagFr: "Boucle NPS",
    titleEn: "Feedback → Backlog", titleFr: "Feedback → Backlog",
    bodyEn: "NPS detractors, support tickets, and community meetings funnelled into categorised JIRA stories. Monthly RICE re-scoring keeps backlog aligned to user pain.",
    bodyFr: "Détracteurs NPS, tickets support et réunions communautaires canalisés en stories JIRA catégorisées. Rescoring RICE mensuel pour aligner le backlog sur la douleur utilisateur.",
    readMins: 4,
    contentEn: [
      { type: "intro", text: "A product is only as good as its feedback loop. I built a three-stream pipeline that transformed diverse user signals into prioritised, actionable backlog items." },
      { type: "h2", text: "The Three Streams" },
      { type: "p", text: "Stream 1 — NPS Detractors: Monthly extracts from the platform, categorised by pain point, focused on recurring themes. Stream 2 — Support tickets: Regular extracts from Teams channels, analysed for relevance and feasibility. Stream 3 — Community meetings: Monthly direct feedback sessions that generated feature ideation." },
      { type: "h2", text: "From Signal to Story" },
      { type: "p", text: "Each stream feeds into a categorisation session. Validated pain points become JIRA user stories. Stories are RICE-scored in a monthly session with the squad. The backlog is re-ranked, not just appended." },
      { type: "callout", text: "The value comes from contextual qualitative feedback, which reveals pain points and delights that pure analytics cannot surface." },
      { type: "h2", text: "The NPS Improvement Loop" },
      { type: "p", text: "NPS detractors' comments → categorise → identify drivers → prioritise in backlog → implement → measure NPS delta → iterate. Running this loop monthly at Saint-Gobain took NPS from baseline to >70." },
    ],
    contentFr: [
      { type: "intro", text: "Un produit ne vaut que sa boucle de feedback. J'ai construit un pipeline à trois flux qui transformait des signaux utilisateurs diversifiés en éléments de backlog priorisés et actionnables." },
      { type: "h2", text: "Les Trois Flux" },
      { type: "p", text: "Flux 1 — Détracteurs NPS : extraits mensuels de la plateforme, catégorisés par point de douleur. Flux 2 — Tickets support : extraits réguliers des canaux Teams, analysés pour la pertinence et la faisabilité. Flux 3 — Réunions communautaires : sessions mensuelles de feedback direct générant de l'idéation." },
      { type: "callout", text: "La valeur vient du feedback qualitatif contextuel, qui révèle les points de douleur et de satisfaction que les analytics seuls ne peuvent pas faire remonter." },
    ],
  },
  {
    id: "pm-focus",
    tagEn: "Strategy", tagFr: "Stratégie",
    titleEn: "PM Focus Model", titleFr: "Modèle de Focus PM",
    bodyEn: "Adoption Accelerator for B2C/SaaS, ROI Navigator for enterprise/B2B, Platform Optimizer for infrastructure — each with distinct risk profiles.",
    bodyFr: "Accélérateur d'Adoption pour B2C/SaaS, Navigateur ROI pour entreprise/B2B, Optimiseur Plateforme pour l'infrastructure — chacun avec des profils de risque distincts.",
    readMins: 4,
    contentEn: [
      { type: "intro", text: "Not all PM roles are the same. The strategic context — who the customer is, what the business model requires, what risks dominate — should fundamentally shape how a PM allocates attention and makes decisions." },
      { type: "h2", text: "Three Focus Models" },
      { type: "p", text: "Adoption Accelerator (B2C, SaaS, product-led): Customer value is the dominant axis. Risk: delighting users without monetising. Strategy: clear conversion paths, habit-forming loops." },
      { type: "p", text: "ROI Navigator (Enterprise, B2B, OPEX): Business impact and customer value are co-primary. Risk: slow UX innovation and adoption. Strategy: value-based prioritisation, incremental ROI validation. This is the model I operated in at Saint-Gobain." },
      { type: "p", text: "Platform Optimizer (Infrastructure, cloud, data): Technical feasibility dominates. Risk: slow business impact. Strategy: close ties to business KPIs and value streams." },
      { type: "callout", text: "Misidentifying your focus model leads to misaligned metrics, wrong hires, and prioritisation that optimises for the wrong axis." },
      { type: "h2", text: "Practical Implications" },
      { type: "p", text: "As an ROI Navigator PM, I measured success in engagement uplift and NPS — not DAU or revenue per user. Sprint goals were framed around business outcomes, not feature delivery. Every prioritisation decision included an ROI validation step." },
    ],
    contentFr: [
      { type: "intro", text: "Tous les rôles PM ne se ressemblent pas. Le contexte stratégique — qui est le client, ce que le modèle économique exige, quels risques dominent — devrait fondamentalement façonner la façon dont un PM alloue son attention et prend des décisions." },
      { type: "h2", text: "Trois Modèles de Focus" },
      { type: "p", text: "Accélérateur d'Adoption (B2C, SaaS) : la valeur client est l'axe dominant. ROI Navigator (Enterprise, B2B) : impact business et valeur client sont co-primaires. C'est le modèle dans lequel j'ai opéré chez Saint-Gobain. Optimiseur Plateforme (Infrastructure) : la faisabilité technique domine." },
      { type: "callout", text: "Mal identifier son modèle de focus conduit à des métriques désalignées, de mauvais recrutements et une priorisation optimisant sur le mauvais axe." },
    ],
  },
];

/* ─── Other data ────────────────────────────────────────────────────────────── */
const EXPERIENCE = [
  { period: "Sept 2023 – Jan 2026", titleEn: "OPEX Product Owner · Saint-Gobain", titleFr: "Product Owner OPEX · Saint-Gobain", bodyEn: "Built and scaled 3 AI-enabled applications serving 100k+ frontline workers. Led 3 Agile squads (10–15 FTEs), achieving 30%+ engagement uplift and NPS >70 through user analytics and continuous iteration.", bodyFr: "Construit et déployé 3 applications IA pour 100k+ opérateurs industriels. Piloté 3 équipes Agile (10–15 ETP), atteignant +30% d'engagement et un NPS >70 via l'analytique utilisateur et l'itération continue." },
  { period: "Sept 2021 – Aug 2022", titleEn: "Associate Product Manager · Lan-Bridge Group", titleFr: "Chef de Produit Associé · Lan-Bridge Group", bodyEn: "Drove the full lifecycle of B2B computer-aided translation tools. Cut time-to-market 15%, reduced ops costs 10%, and boosted user adoption 22% with a data-driven strategy.", bodyFr: "Piloté le cycle de vie complet d'outils B2B de traduction assistée. Réduit le time-to-market de 15%, les coûts opérationnels de 10%, et augmenté l'adoption de 22% via une stratégie data-driven." },
  { period: "Feb – Jun 2020", titleEn: "Analyst, Government Affairs · AmCham Beijing", titleFr: "Analyste Affaires Gouvernementales · AmCham Pékin", bodyEn: "Analysed 200+ US enterprises operating in China, focusing on product ROI, partnerships, and COVID resilience.", bodyFr: "Analysé 200+ entreprises américaines opérant en Chine, axé sur le ROI produit, les partenariats et la résilience COVID." },
];

const EDUCATION = [
  { period: "Aug 2022 – Jul 2025", titleEn: "Master in Management · ESSEC Business School", titleFr: "Master en Management · ESSEC Business School", bodyEn: "Digital Transformation & Business Track. GPA 16/20. Frameworks for AI product strategy, go-to-market, and cross-functional leadership.", bodyFr: "Parcours Transformation Digitale & Business. GPA 16/20. Cadres pour la stratégie produit IA, le go-to-market et le leadership transversal." },
  { period: "Sep 2016 – Jul 2020", titleEn: "BA Translation & Interpretation · BISU Beijing", titleFr: "Licence Traduction & Interprétation · BISU Pékin", bodyEn: "Minor in French. GPA 88.12/100, Top 3 of cohort.", bodyFr: "Mineure en français. GPA 88.12/100, Top 3 de promotion." },
];

/* ─── Platform SVG icons ────────────────────────────────────────────────────── */
const ApplePodcastsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="56" height="56" rx="12.444" fill="url(#apple-grad)"/>
    <defs>
      <linearGradient id="apple-grad" x1="28" y1="0" x2="28" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F452FF"/>
        <stop offset="1" stopColor="#832BC1"/>
      </linearGradient>
    </defs>
    <circle cx="28" cy="21.5" r="8.5" stroke="white" strokeWidth="2.5" fill="none"/>
    <circle cx="28" cy="21.5" r="3" fill="white"/>
    <path d="M21 33c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <rect x="25.5" y="38" width="5" height="8" rx="2.5" fill="white"/>
  </svg>
);

const SpotifyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="56" height="56" rx="12.444" fill="#1DB954"/>
    <path d="M38.5 25.5c-5.8-3.44-15.3-3.76-20.8-2.08a1.75 1.75 0 0 1-1.02-3.35c6.33-1.92 16.85-1.55 23.5 2.4a1.75 1.75 0 0 1-1.68 3.03zm-.2 5.46a1.46 1.46 0 0 1-2.01.48c-4.84-2.97-12.2-3.83-17.92-2.1a1.46 1.46 0 0 1-.84-2.8c6.53-1.98 14.65-1.02 20.29 2.4a1.46 1.46 0 0 1 .48 2.02zm-2.3 5.24a1.17 1.17 0 0 1-1.61.39c-4.23-2.59-9.55-3.17-15.82-1.74a1.17 1.17 0 1 1-.52-2.28c6.86-1.57 12.74-.9 17.56 2.02a1.17 1.17 0 0 1 .39 1.61z" fill="white"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="56" height="56" rx="12.444" fill="#FF0000"/>
    <path d="M43.5 20.5s-.4-2.6-1.6-3.7c-1.5-1.6-3.2-1.6-4-1.7C33.7 15 28 15 28 15s-5.7 0-9.9.3c-.8.1-2.5.1-4 1.7-1.2 1.1-1.6 3.7-1.6 3.7S12 23.4 12 26.3v2.7c0 2.9.5 5.8.5 5.8s.4 2.6 1.6 3.7c1.5 1.6 3.5 1.5 4.4 1.7 3.2.3 13.5.4 13.5.4s5.7 0 9.9-.4c.8-.1 2.5-.1 4-1.7 1.2-1.1 1.6-3.7 1.6-3.7s.5-2.9.5-5.8v-2.7c0-2.9-.5-5.8-.5-5.8z" fill="white" fillOpacity=".9"/>
    <path d="M24.5 32.5v-10l9.5 5-9.5 5z" fill="#FF0000"/>
  </svg>
);

/* ─── Live-fetch hooks ───────────────────────────────────────────────────────── */
// YouTube: fetch latest videos via public RSS feed (no API key needed)
function useYouTubeVideos(channelId, fallbackIds) {
  const [videos, setVideos] = useState(fallbackIds.map(id => ({ id })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const PROXY = "https://api.allorigins.win/get?url=";
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    fetch(`${PROXY}${encodeURIComponent(feedUrl)}`)
      .then(r => r.json())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        const entries = Array.from(xml.querySelectorAll("entry")).slice(0, 2);
        if (entries.length > 0) {
          const parsed = entries.map(e => ({
            id: e.querySelector("videoId")?.textContent || e.querySelector("id")?.textContent?.split(":").pop(),
            title: e.querySelector("title")?.textContent,
            published: e.querySelector("published")?.textContent?.slice(0, 10),
          })).filter(v => v.id);
          if (parsed.length > 0) setVideos(parsed);
        }
      })
      .catch(() => {}) // silently keep fallback
      .finally(() => setLoading(false));
  }, []);

  return { videos, loading };
}

// Podcast: fetch latest episodes via RSS feed
function usePodcastEpisodes(rssUrl, count = 3) {
  const [episodes, setEpisodes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const PROXY = "https://api.allorigins.win/get?url=";
    fetch(`${PROXY}${encodeURIComponent(rssUrl)}`)
      .then(r => r.json())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        const items = Array.from(xml.querySelectorAll("item")).slice(0, count);
        if (items.length > 0) {
          const parsed = items.map(item => {
            const durRaw = item.querySelector("duration")?.textContent || "";
            const pubRaw = item.querySelector("pubDate")?.textContent || "";
            const pub = pubRaw ? new Date(pubRaw).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "";
            const link = item.querySelector("link")?.textContent || item.querySelector("guid")?.textContent || "";
            return {
              title: item.querySelector("title")?.textContent || "",
              desc: item.querySelector("description")?.textContent?.replace(/<[^>]+>/g, "").slice(0, 160) + "…" || "",
              duration: durRaw,
              date: pub,
              appleHref: link,
              spotifyHref: "https://open.spotify.com/show/4uIc1P0KvLJjfPCFmjXnvQ",
            };
          });
          setEpisodes(parsed);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { episodes, loading };
}

/* ─── Skeleton loader ───────────────────────────────────────────────────────── */
const Skeleton = ({ h = "160px", radius = "18px" }) => (
  <div style={{ height: h, borderRadius: radius, background: "linear-gradient(90deg, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.4) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
);

/* ─── Hooks ─────────────────────────────────────────────────────────────────── */
function useReveal(dep) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll(".reveal");
      els.forEach(el => { el.classList.remove("in"); el.style.transitionDelay = ""; });
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          entry.target.style.transitionDelay = `${i * 70}ms`;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }),
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach((el) => observer.observe(el));
    }, 50);
    return () => clearTimeout(timer);
  }, [dep]);
}

/* ─── Detail page content renderer ─────────────────────────────────────────── */
function DetailContent({ blocks }) {
  return (
    <div className="detail-body">
      {blocks.map((block, i) => {
        if (block.type === "intro") return <p key={i} className="detail-intro">{block.text}</p>;
        if (block.type === "h2") return <h2 key={i} className="detail-h2">{block.text}</h2>;
        if (block.type === "p") return <p key={i} className="detail-p">{block.text}</p>;
        if (block.type === "callout") return <blockquote key={i} className="detail-callout">{block.text}</blockquote>;
        if (block.type === "metrics") return (
          <div key={i} className="detail-metrics">
            {block.items.map((item, j) => <div key={j} className="detail-metric">{item}</div>)}
          </div>
        );
        return null;
      })}
    </div>
  );
}

/* ─── Confetti & Toast ──────────────────────────────────────────────────────── */
function Confetti({ active }) {
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }} aria-hidden="true">
      {Array.from({ length: 55 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", top: "-16px", left: `${Math.random() * 100}%`,
          width: `${6 + Math.random() * 7}px`, height: `${6 + Math.random() * 7}px`,
          borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          background: ["#0d7c66", "#171717", "#bf9d5a", "#d9efe9", "#fff"][i % 5],
          animation: `confettiFall ${0.8 + Math.random() * 1.2}s ${Math.random() * 0.4}s linear forwards`,
        }} />
      ))}
    </div>
  );
}
function Toast({ show, t }) {
  return (
    <div role="status" aria-live="polite" style={{ position: "fixed", bottom: "1.8rem", right: "1.8rem", zIndex: 9998, background: "#171717", color: "#fff", padding: "0.85rem 1.3rem", borderRadius: "999px", fontSize: "0.88rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.6rem", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", transform: show ? "translateY(0)" : "translateY(80px)", opacity: show ? 1 : 0, transition: "transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.3s" }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#0d7c66", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0 }}>✓</span>
      {t.successSub}
    </div>
  );
}

/* ─── Shared Header ─────────────────────────────────────────────────────────── */
function SiteHeader({ lang, setLang, t, goHome, scrollTo }) {
  return (
    <header className="site-header">
      <button className="brand-btn" onClick={goHome} aria-label="Go to home">
        <span className="brand-name">YALONG LI</span>
      </button>
      <nav className="site-nav" aria-label="Primary">
        {[["path", t.navPath], ["projects", t.navProjects], ["methodology", t.navMethods], ["contact", t.navContact]].map(([id, label]) => (
          <button key={id} onClick={() => scrollTo(id)}>{label}</button>
        ))}
      </nav>
      <div className="lang-switch" role="group" aria-label="Language selector">
        <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
        <button className={`lang-btn ${lang === "fr" ? "active" : ""}`} onClick={() => setLang("fr")}>FR</button>
      </div>
    </header>
  );
}

/* ─── Shared Footer ─────────────────────────────────────────────────────────── */
function SiteFooter({ t }) {
  return (
    <footer className="site-footer">
      <p>{t.footerCopy}</p>
      <div className="socials">
        <a href="mailto:yalongli1116@gmail.com">Email</a>
        <a href="https://www.linkedin.com/in/yalong-li-711904217/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://www.youtube.com/@thejanusgaze" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://podcasts.apple.com/fr/podcast/%E4%BB%8E%E9%95%BF%E8%AE%B0%E8%AE%AE/id1592882364" target="_blank" rel="noopener noreferrer">Podcast</a>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [toast, setToast] = useState(false);
  const t = T[lang];

  // Live feeds — YouTube channel ID for @thejanusgaze
  const { videos: ytVideos, loading: ytLoading } = useYouTubeVideos(
    "UCWYyqu2YWLmJkC_hqbhPiyA",
    [{ id: "pLWWPg_FJ-A" }, { id: "q179nlDYowo" }]
  );
  // Podcast RSS — 从长记议 via Ximalaya/Apple RSS
  const { episodes: podEpisodes, loading: podLoading } = usePodcastEpisodes(
    "https://www.ximalaya.com/album/54323818.xml", 3
  );

  useReveal(page);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true); setConfetti(true); setToast(true);
    setTimeout(() => setConfetti(false), 2400);
    setTimeout(() => setToast(false), 4200);
  };

  const scrollTo = (id) => {
    setPage("home");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const openProject = (id) => setPage({ type: "project", id });
  const openMethod = (id) => setPage({ type: "method", id });
  const goHome = () => setPage("home");

  /* ══════════════════════════════════════════════════════
     PROJECT DETAIL PAGE
  ══════════════════════════════════════════════════════ */
  if (page !== "home" && page.type === "project") {
    const proj = PROJECTS.find(p => p.id === page.id);
    if (!proj) { setPage("home"); return null; }
    const content = lang === "en" ? proj.contentEn : proj.contentFr;
    return (
      <>
        <Style />
        <div className="bg-orb bg-orb-a" aria-hidden="true" />
        <div className="bg-orb bg-orb-b" aria-hidden="true" />
        <SiteHeader lang={lang} setLang={setLang} t={t} goHome={goHome} scrollTo={scrollTo} />
        <main className="detail-main">
          <article className="detail-article">
            <button className="back-btn" onClick={goHome}>{t.backHome}</button>
            <header className="detail-header">
              <p className="tag" style={{ marginBottom: "1rem" }}>{lang === "en" ? proj.tag : proj.tagFr}</p>
              <h1 className="detail-title">{lang === "en" ? proj.titleEn : proj.titleFr}</h1>
              <div className="detail-meta">
                <span>{t.publishedOn} {proj.date}</span>
                <span>·</span>
                <span>{proj.readMins} {t.readTime}</span>
              </div>
            </header>
            <hr className="detail-rule" />
            <DetailContent blocks={content} />
          </article>
        </main>
        <SiteFooter t={t} />
        <Confetti active={confetti} />
      </>
    );
  }

  /* ══════════════════════════════════════════════════════
     METHOD DETAIL PAGE
  ══════════════════════════════════════════════════════ */
  if (page !== "home" && page.type === "method") {
    const method = PM_METHODS.find(m => m.id === page.id);
    if (!method) { setPage("home"); return null; }
    const content = lang === "en" ? method.contentEn : method.contentFr;
    return (
      <>
        <Style />
        <div className="bg-orb bg-orb-a" aria-hidden="true" />
        <div className="bg-orb bg-orb-b" aria-hidden="true" />
        <SiteHeader lang={lang} setLang={setLang} t={t} goHome={goHome} scrollTo={scrollTo} />
        <main className="detail-main">
          <article className="detail-article">
            <button className="back-btn" onClick={goHome}>{t.backHome}</button>
            <header className="detail-header">
              <p className="method-tag" style={{ marginBottom: "1rem" }}>{lang === "en" ? method.tagEn : method.tagFr}</p>
              <h1 className="detail-title">{lang === "en" ? method.titleEn : method.titleFr}</h1>
              <div className="detail-meta">
                <span>{method.readMins} {t.readTime}</span>
              </div>
            </header>
            <hr className="detail-rule" />
            <DetailContent blocks={content} />
          </article>
        </main>
        <SiteFooter t={t} />
      </>
    );
  }

  /* ══════════════════════════════════════════════════════
     HOME PAGE
  ══════════════════════════════════════════════════════ */
  return (
    <>
      <Style />
      <div className="bg-orb bg-orb-a" aria-hidden="true" />
      <div className="bg-orb bg-orb-b" aria-hidden="true" />
      <SiteHeader lang={lang} setLang={setLang} t={t} goHome={goHome} scrollTo={scrollTo} />

      <main id="top">

        {/* Nameplate */}
        <section className="nameplate reveal">
          <p className="eyebrow">{lang === "en" ? "Product Leader · AI Platforms · Operational Excellence" : "Chef de Produit · Plateformes IA · Excellence Opérationnelle"}</p>
          <h1 className="top-name">Yalong LI</h1>
        </section>

        {/* Hero */}
        <section className="hero reveal">
          <h2>{t.h1a} <span>{t.h1b}</span></h2>
          <p className="hero-copy">{t.heroCopy}</p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollTo("projects")}>{t.cta1}</button>
            <button className="btn btn-ghost" onClick={() => scrollTo("contact")}>{t.cta2}</button>
          </div>
        </section>

        {/* Path */}
        <section className="reveal" id="path">
          <div className="section-heading">
            <p className="eyebrow">{t.pathEyebrow}</p>
            <h2>{t.pathH2}</h2>
          </div>
          <div className="timeline">
            {EXPERIENCE.map((item, i) => (
              <article className="timeline-card" key={i}>
                <p className="period">{item.period}</p>
                <h3>{lang === "en" ? item.titleEn : item.titleFr}</h3>
                <p>{lang === "en" ? item.bodyEn : item.bodyFr}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="reveal" id="education">
          <div className="section-heading">
            <p className="eyebrow">{t.eduEyebrow}</p>
            <h2>{t.eduH2}</h2>
          </div>
          <div className="timeline">
            {EDUCATION.map((item, i) => (
              <article className="timeline-card" key={i}>
                <p className="period">{item.period}</p>
                <h3>{lang === "en" ? item.titleEn : item.titleFr}</h3>
                <p>{lang === "en" ? item.bodyEn : item.bodyFr}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="reveal" id="projects">
          <div className="section-heading">
            <p className="eyebrow">{t.projEyebrow}</p>
            <h2>{t.projH2}</h2>
          </div>

          {/* Work projects */}
          <div className="project-grid" style={{ marginBottom: "3.5rem" }}>
            {PROJECTS.map((p) => (
              <article className="project-card" key={p.id}>
                <p className="tag">{lang === "en" ? p.tag : p.tagFr}</p>
                <h3>{lang === "en" ? p.titleEn : p.titleFr}</h3>
                <p>{lang === "en" ? p.summaryEn : p.summaryFr}</p>
                <button className="card-link-btn" onClick={() => openProject(p.id)}>{t.projLinkLabel} →</button>
              </article>
            ))}
          </div>

          {/* YouTube */}
          <div className="section-row">
            <div>
              <div className="yt-badge"><span className="yt-dot" aria-hidden="true" />YouTube</div>
              <div className="section-heading" style={{ marginBottom: 0 }}>
                <p className="eyebrow">{t.ytEyebrow}</p>
                <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>The Janus Gaze</h2>
              </div>
              <p style={{ color: "var(--muted)", marginTop: "0.5rem", maxWidth: "50ch", fontSize: "0.93rem" }}>{t.ytDesc}</p>
            </div>
            <a className="sub-btn" href="https://www.youtube.com/@thejanusgaze" target="_blank" rel="noopener noreferrer"><YouTubeIcon />{t.ytSub}</a>
          </div>
          <div className="yt-grid" style={{ marginBottom: "3.5rem" }}>
            {ytLoading
              ? [0,1].map(i => <Skeleton key={i} h="260px" />)
              : ytVideos.map((v) => (
                <div key={v.id}>
                  {v.title && <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: "0.45rem", fontWeight: 500 }}>{v.title}</p>}
                  <div className="yt-embed-wrap">
                    <iframe src={`https://www.youtube.com/embed/${v.id}`} title={v.title || `YouTube video ${v.id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
                  </div>
                  {v.published && <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.35rem" }}>{v.published}</p>}
                </div>
              ))
            }
          </div>

          {/* Podcast */}
          <div className="section-row">
            <div>
              <div className="pod-badge">🎙 Podcast</div>
              <div className="section-heading" style={{ marginBottom: 0 }}>
                <p className="eyebrow">{t.podEyebrow}</p>
                <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>从长记议</h2>
              </div>
              <p style={{ color: "var(--muted)", marginTop: "0.5rem", maxWidth: "50ch", fontSize: "0.93rem" }}>{t.podDesc}</p>
              <p className="pod-stats">{t.podStats}</p>
            </div>
            <div className="pod-listen-btns">
              <a className="sub-btn" href="https://podcasts.apple.com/fr/podcast/%E4%BB%8E%E9%95%BF%E8%AE%B0%E8%AE%AE/id1592882364" target="_blank" rel="noopener noreferrer">
                <ApplePodcastsIcon />{t.podApple}
              </a>
              <a className="sub-btn sub-btn-spotify" href="https://open.spotify.com/show/4uIc1P0KvLJjfPCFmjXnvQ" target="_blank" rel="noopener noreferrer">
                <SpotifyIcon />{t.podSpotify}
              </a>
            </div>
          </div>
          <div className="pod-grid">
            {podLoading
              ? [0,1,2].map(i => <Skeleton key={i} h="190px" />)
              : (podEpisodes || []).map((ep, i) => (
                <article className="pod-card" key={i}>
                  {ep.date && <div className="pod-meta"><span>{ep.date}</span>{ep.duration && <><span>·</span><span>{ep.duration}</span></>}</div>}
                  <h3>{ep.title}</h3>
                  <p>{ep.desc}</p>
                  <div className="pod-card-links">
                    <a className="pod-link pod-link-apple" href={ep.appleHref} target="_blank" rel="noopener noreferrer"><ApplePodcastsIcon /> Apple</a>
                    <a className="pod-link pod-link-spotify" href={ep.spotifyHref} target="_blank" rel="noopener noreferrer"><SpotifyIcon /> Spotify</a>
                  </div>
                </article>
              ))
            }
          </div>
        </section>

        {/* Methodology */}
        <section className="reveal" id="methodology">
          <div className="section-heading">
            <p className="eyebrow">{t.methodEyebrow}</p>
            <h2>{t.methodH2}</h2>
          </div>
          <div className="method-grid">
            {PM_METHODS.map((m) => (
              <article className="method-card" key={m.id}>
                <span className="method-tag">{lang === "en" ? m.tagEn : m.tagFr}</span>
                <h3>{lang === "en" ? m.titleEn : m.titleFr}</h3>
                <p>{lang === "en" ? m.bodyEn : m.bodyFr}</p>
                <button className="card-link-btn" onClick={() => openMethod(m.id)}>{t.methodLinkLabel}</button>
              </article>
            ))}
          </div>
          <div className="method-note">
            <span className="method-note-icon">🔄</span>
            <p><strong>{t.methodNoteLabel}:</strong> {t.methodNote}</p>
          </div>
        </section>

        {/* Contact */}
        <section className="contact-section reveal" id="contact">
          <p className="eyebrow">{t.contactEyebrow}</p>
          <div className="contact-grid">
            <div style={{ display: "grid", gap: "0.9rem" }}>
              <div className="avail"><span className="avail-dot" aria-hidden="true" />{t.avail}</div>
              <h2 style={{ fontSize: "clamp(1.3rem, 3.5vw, 2rem)", maxWidth: "24ch" }}>{t.contactH2}</h2>
              <div className="contact-links">
                {[
                  ["💼", "LinkedIn", "https://www.linkedin.com/in/yalong-li-711904217/"],
                  ["▶", "The Janus Gaze", "https://www.youtube.com/@thejanusgaze"],
                  ["🎙", "从长记议 Podcast", "https://podcasts.apple.com/fr/podcast/%E4%BB%8E%E9%95%BF%E8%AE%B0%E8%AE%AE/id1592882364"],
                ].map(([icon, label, href]) => (
                  <a key={label} href={href} className="contact-link" target="_blank" rel="noopener noreferrer">
                    <span>{icon} {label}</span><span>→</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="form-success" role="status">
                  <span className="success-icon">🎉</span>
                  <p className="success-title">{t.successTitle}</p>
                  <p className="success-sub">{t.successSub}</p>
                </div>
              ) : (
                <form className="form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <label className="form-label" htmlFor="cf-name">{t.nameLabel}</label>
                    <input id="cf-name" type="text" className="form-input" placeholder={t.namePh} required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-row">
                    <label className="form-label" htmlFor="cf-email">{t.emailLabel}</label>
                    <input id="cf-email" type="email" className="form-input" placeholder={t.emailPh} required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="form-row">
                    <label className="form-label" htmlFor="cf-msg">{t.msgLabel}</label>
                    <textarea id="cf-msg" className="form-textarea" placeholder={t.msgPh} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary form-submit" disabled={submitted}>{t.sendBtn}</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter t={t} />
      <Confetti active={confetti} />
      <Toast show={toast} t={t} />
    </>
  );
}

/* ─── All CSS in one place ──────────────────────────────────────────────────── */
function Style() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500&family=Space+Grotesk:wght@400;500;600;700&display=swap');
      :root {
        --bg: #f4f3ee; --surface: rgba(255,255,255,0.66); --surface-strong: #ffffff;
        --text: #171717; --muted: #5f5c57; --line: rgba(23,23,23,0.09);
        --accent: #0d7c66; --accent-soft: #d9efe9; --shadow: 0 12px 40px rgba(0,0,0,0.07); --radius: 18px;
      }
      *, *::before, *::after { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body { background: var(--bg); color: var(--text); font-family: 'Space Grotesk', sans-serif; min-height: 100vh; line-height: 1.5; overflow-x: hidden; }
      a { color: inherit; text-decoration: none; }

      .bg-orb { position: fixed; border-radius: 999px; filter: blur(65px); z-index: -1; pointer-events: none; }
      .bg-orb-a { width: 360px; height: 360px; background: rgba(13,124,102,0.22); top: -100px; left: -110px; }
      .bg-orb-b { width: 420px; height: 420px; background: rgba(191,157,90,0.24); bottom: -180px; right: -120px; }

      .site-header, main, .site-footer, .detail-main { width: min(1060px, calc(100% - 2.5rem)); margin: 0 auto; }

      /* Header */
      .site-header { position: sticky; top: 0.7rem; z-index: 15; margin-top: 0.7rem; padding: 0.65rem 1rem; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); backdrop-filter: blur(9px); display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; }
      .brand-btn { background: none; border: none; cursor: pointer; padding: 0.15rem 0.25rem; }
      .brand-name { font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text); line-height: 1; display: block; transition: color 200ms; }
      .brand-btn:hover .brand-name { color: var(--accent); }
      .site-nav { display: flex; gap: 0.2rem; align-items: center; }
      .site-nav button { font-size: 0.88rem; color: var(--muted); background: none; border: none; cursor: pointer; font-family: inherit; transition: color 200ms; padding: 0.4rem 0.65rem; border-radius: 999px; }
      .site-nav button:hover { color: var(--accent); background: var(--accent-soft); }
      .lang-switch { display: flex; border: 1px solid var(--line); border-radius: 999px; overflow: hidden; flex-shrink: 0; }
      .lang-btn { background: none; border: none; cursor: pointer; font-family: inherit; font-size: 0.76rem; font-weight: 600; padding: 0.3rem 0.65rem; color: var(--muted); transition: background 200ms, color 200ms; letter-spacing: 0.05em; }
      .lang-btn.active { background: var(--accent); color: #fff; }
      .lang-btn:not(.active):hover { background: var(--accent-soft); color: var(--accent); }

      /* Main */
      main { padding: 2.3rem 0 2.5rem; }
      section { margin-bottom: 5.5rem; }
      .eyebrow { margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); font-size: 0.76rem; font-weight: 600; }
      h1, h2, h3, p { margin: 0; }
      h1, h2 { font-family: 'Newsreader', serif; line-height: 1.08; letter-spacing: -0.015em; font-weight: 500; }
      h2 { font-size: clamp(1.8rem, 4vw, 3rem); max-width: 18ch; }
      .hero h2 { font-size: clamp(1.95rem, 4.8vw, 3.8rem); max-width: 16ch; }
      .hero h2 span { color: var(--muted); }
      .hero-copy { margin-top: 1.4rem; max-width: 58ch; color: var(--muted); }
      .hero-cta { margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 0.8rem; }

      /* Nameplate */
      .nameplate { margin-bottom: 1.6rem; }
      .top-name { font-family: 'Space Grotesk', sans-serif; font-size: clamp(3.2rem, 13vw, 10.2rem); line-height: 0.9; letter-spacing: -0.05em; text-transform: uppercase; font-weight: 700; margin-bottom: 0.65rem; color: var(--text); }

      /* Buttons */
      .btn { display: inline-block; padding: 0.74rem 1.1rem; border-radius: 999px; border: 1px solid transparent; font-size: 0.95rem; font-family: inherit; cursor: pointer; transition: transform 220ms ease, background-color 220ms, color 220ms; }
      .btn:hover { transform: translateY(-2px); }
      .btn-primary { background: var(--accent); color: #fff; }
      .btn-primary:hover { background: #0a6554; }
      .btn-ghost { background: transparent; border-color: var(--line); color: var(--text); }
      .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
      .card-link-btn { background: none; border: none; cursor: pointer; font-family: inherit; font-size: 0.92rem; font-weight: 600; color: var(--accent); padding: 0; margin-top: 0.2rem; transition: opacity 200ms; text-align: left; }
      .card-link-btn:hover { opacity: 0.7; }

      /* Section heading */
      .section-heading { display: grid; gap: 0.55rem; margin-bottom: 1.3rem; }

      /* Timeline */
      .timeline { display: grid; gap: 0.9rem; }
      .timeline-card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 1rem 1rem 1.05rem; box-shadow: var(--shadow); }
      .period { color: var(--muted); font-size: 0.82rem; margin-bottom: 0.35rem; }
      .timeline-card h3 { font-size: 1.08rem; margin-bottom: 0.32rem; }
      .timeline-card p:last-child { color: var(--muted); }

      /* Project grid */
      .project-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.9rem; }
      .project-card { background: var(--surface-strong); border: 1px solid var(--line); border-radius: var(--radius); padding: 1rem; display: grid; gap: 0.55rem; }
      .project-card h3 { font-size: 1.08rem; margin-bottom: 0.32rem; }
      .project-card p { color: var(--muted); }
      .tag { background: var(--accent-soft); color: #094f40; display: inline-block; font-size: 0.75rem; padding: 0.18rem 0.52rem; border-radius: 999px; width: fit-content; }

      /* YouTube */
      .yt-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
      .yt-embed-wrap { border-radius: var(--radius); overflow: hidden; border: 1px solid var(--line); box-shadow: var(--shadow); background: #000; aspect-ratio: 16/9; width: 100%; }
      .yt-embed-wrap iframe { width: 100%; height: 100%; display: block; border: none; }
      .yt-badge { background: #ffe8e8; color: #c00; display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.75rem; font-weight: 600; padding: 0.18rem 0.6rem; border-radius: 999px; width: fit-content; margin-bottom: 0.55rem; }
      .yt-dot { width: 6px; height: 6px; border-radius: 50%; background: #ff0000; }
      .section-row { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.3rem; }
      .sub-btn { flex-shrink: 0; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.74rem 1.1rem; border-radius: 999px; border: 1px solid var(--line); font-size: 0.9rem; font-family: inherit; font-weight: 600; cursor: pointer; background: transparent; color: var(--text); transition: transform 220ms, border-color 220ms, color 220ms; text-decoration: none; }
      .sub-btn:hover { transform: translateY(-2px); border-color: var(--accent); color: var(--accent); }
      .sub-btn-spotify:hover { border-color: #1db954; color: #1db954; }
      .platform-icon { font-size: 0.85rem; }
      .pod-listen-btns { display: flex; flex-direction: column; gap: 0.6rem; align-self: flex-start; flex-shrink: 0; }

      /* Podcast */
      .pod-badge { background: var(--accent-soft); color: #094f40; display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.75rem; font-weight: 600; padding: 0.18rem 0.6rem; border-radius: 999px; width: fit-content; margin-bottom: 0.55rem; }
      .pod-stats { font-size: 0.82rem; color: var(--muted); margin-top: 0.3rem; }
      .pod-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.9rem; }
      .pod-card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 1rem; display: grid; gap: 0.5rem; box-shadow: var(--shadow); }
      .pod-meta { display: flex; align-items: center; gap: 0.5rem; font-size: 0.76rem; color: var(--muted); }
      .pod-ep { background: var(--accent-soft); color: #094f40; padding: 0.1rem 0.45rem; border-radius: 999px; font-size: 0.7rem; font-weight: 600; }
      .pod-card h3 { font-size: 1rem; }
      .pod-card h3 em { display: block; font-size: 0.8rem; color: var(--muted); font-style: normal; margin-top: 0.1rem; }
      .pod-card p { color: var(--muted); font-size: 0.85rem; line-height: 1.55; }
      .pod-card-links { display: flex; gap: 0.75rem; margin-top: 0.2rem; }
      .pod-link { color: var(--accent); font-weight: 600; font-size: 0.88rem; }
      .pod-link:hover { text-decoration: underline; }

      /* Methods */
      .method-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.9rem; }
      .method-card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 1rem 1rem 1.05rem; box-shadow: var(--shadow); display: grid; gap: 0.45rem; }
      .method-card h3 { font-size: 1.05rem; margin-bottom: 0.1rem; }
      .method-card p { color: var(--muted); font-size: 0.88rem; line-height: 1.55; }
      .method-tag { background: #171717; color: #fff; display: inline-block; font-size: 0.7rem; padding: 0.15rem 0.5rem; border-radius: 999px; width: fit-content; letter-spacing: 0.04em; }
      .method-note { margin-top: 1.3rem; background: var(--surface-strong); border: 1px solid var(--line); border-radius: var(--radius); padding: 1rem 1.2rem; display: flex; align-items: flex-start; gap: 0.85rem; }
      .method-note-icon { font-size: 1.3rem; flex-shrink: 0; }
      .method-note p { color: var(--muted); font-size: 0.88rem; line-height: 1.6; }
      .method-note strong { color: var(--text); }

      /* Contact */
      .contact-section { background: var(--surface); border: 1px solid var(--line); border-radius: calc(var(--radius) + 8px); padding: 1.4rem; display: grid; gap: 0.95rem; }
      .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.8rem; align-items: start; }
      .contact-links { display: grid; gap: 0.5rem; margin-top: 0.5rem; }
      .contact-link { display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0.85rem; border: 1px solid var(--line); border-radius: 12px; background: var(--surface-strong); font-size: 0.9rem; color: var(--muted); transition: border-color 200ms, color 200ms; gap: 0.5rem; }
      .contact-link:hover { border-color: var(--accent); color: var(--accent); }
      .contact-link span:last-child { opacity: 0.5; transition: opacity 200ms, transform 200ms; }
      .contact-link:hover span:last-child { opacity: 1; transform: translateX(3px); }
      .avail { display: inline-flex; align-items: center; gap: 0.45rem; background: var(--accent-soft); color: #094f40; font-size: 0.75rem; font-weight: 600; padding: 0.28rem 0.7rem; border-radius: 999px; width: fit-content; }
      .avail-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: blink 2s infinite; }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

      /* Form */
      .form { display: grid; gap: 0.75rem; }
      .form-row { display: grid; gap: 0.3rem; }
      .form-label { font-size: 0.76rem; font-weight: 600; letter-spacing: 0.04em; color: var(--muted); text-transform: uppercase; }
      .form-input, .form-textarea { width: 100%; background: var(--surface-strong); border: 1px solid var(--line); border-radius: 12px; color: var(--text); font-family: 'Space Grotesk', sans-serif; font-size: 0.95rem; padding: 0.7rem 0.85rem; transition: border-color 200ms, box-shadow 200ms; min-height: 44px; }
      .form-input::placeholder, .form-textarea::placeholder { color: var(--muted); opacity: 0.6; }
      .form-input:focus, .form-textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(13,124,102,0.12); }
      .form-textarea { min-height: 110px; resize: vertical; }
      .form-submit { font-family: 'Space Grotesk', sans-serif; font-size: 0.95rem; font-weight: 600; background: var(--accent); color: #fff; padding: 0.74rem 1.1rem; border-radius: 999px; border: none; cursor: pointer; transition: transform 220ms ease, background-color 220ms ease; min-height: 44px; width: fit-content; }
      .form-submit:hover { transform: translateY(-2px); background: #0a6554; }
      .form-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
      .form-success { display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem; padding: 0.5rem 0; }
      .success-icon { font-size: 2rem; }
      .success-title { font-family: 'Newsreader', serif; font-size: 1.4rem; font-weight: 500; }
      .success-sub { color: var(--muted); font-size: 0.9rem; }

      /* ── Detail pages ── */
      .detail-main { padding: 2.5rem 0 4rem; }
      .detail-article { max-width: 680px; }
      .back-btn { background: none; border: none; cursor: pointer; font-family: inherit; font-size: 0.88rem; color: var(--muted); padding: 0; margin-bottom: 2rem; display: inline-flex; align-items: center; gap: 0.3rem; transition: color 200ms; }
      .back-btn:hover { color: var(--accent); }
      .detail-header { margin-bottom: 1.5rem; }
      .detail-title { font-family: 'Newsreader', serif; font-size: clamp(1.9rem, 4vw, 3rem); font-weight: 500; letter-spacing: -0.02em; line-height: 1.1; margin-top: 0.5rem; margin-bottom: 0.75rem; }
      .detail-meta { font-size: 0.82rem; color: var(--muted); display: flex; gap: 0.5rem; flex-wrap: wrap; }
      .detail-rule { border: none; border-top: 1px solid var(--line); margin: 0 0 2.5rem; }
      .detail-body { display: grid; gap: 0; }
      .detail-intro { font-size: 1.08rem; color: var(--text); line-height: 1.75; margin-bottom: 2rem; font-family: 'Newsreader', serif; font-weight: 400; }
      .detail-h2 { font-family: 'Newsreader', serif; font-size: 1.45rem; font-weight: 500; letter-spacing: -0.01em; margin-top: 2.2rem; margin-bottom: 0.75rem; color: var(--text); }
      .detail-p { font-size: 0.97rem; color: var(--muted); line-height: 1.8; margin-bottom: 1.1rem; }
      .detail-callout { margin: 1.8rem 0; padding: 1rem 1.4rem; border-left: 3px solid var(--accent); background: var(--accent-soft); border-radius: 0 var(--radius) var(--radius) 0; font-family: 'Newsreader', serif; font-size: 1.05rem; color: var(--text); line-height: 1.65; font-style: italic; }
      .detail-metrics { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin: 1.2rem 0 1.5rem; }
      .detail-metric { background: var(--surface-strong); border: 1px solid var(--line); border-radius: 12px; padding: 0.85rem 1rem; font-size: 0.92rem; font-weight: 600; color: var(--text); }

      /* Footer */
      .site-footer { padding: 1.4rem 0 2.2rem; display: flex; justify-content: space-between; gap: 1rem; color: var(--muted); font-size: 0.9rem; }
      .socials { display: flex; gap: 0.8rem; }
      .socials a:hover { color: var(--accent); }

      /* Reveal */
      .reveal { opacity: 0; transform: translateY(20px); transition: opacity 560ms ease, transform 560ms ease; }
      .reveal.in { opacity: 1; transform: translateY(0); }
      @keyframes confettiFall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }
      @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

      .pod-link-apple, .pod-link-spotify { display: inline-flex; align-items: center; gap: 0.35rem; }
      .pod-link-spotify:hover { color: #1db954; }

      /* Responsive */
      @media (max-width: 920px) {
        .project-grid, .method-grid, .pod-grid { grid-template-columns: 1fr 1fr; }
        .yt-grid { grid-template-columns: 1fr; }
        .detail-metrics { grid-template-columns: 1fr; }
      }
      @media (max-width: 680px) {
        .site-header { border-radius: 16px; padding: 0.75rem; flex-direction: column; align-items: flex-start; gap: 0.55rem; }
        .site-nav { gap: 0.2rem; flex-wrap: wrap; }
        main { padding-top: 2.1rem; }
        .project-grid, .method-grid, .pod-grid { grid-template-columns: 1fr; }
        .contact-grid { grid-template-columns: 1fr; }
        .section-row { flex-direction: column; }
        .pod-listen-btns { flex-direction: row; flex-wrap: wrap; }
        .site-footer { flex-direction: column; }
      }
    `}</style>
  );
}
