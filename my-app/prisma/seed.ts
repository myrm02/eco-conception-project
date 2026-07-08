import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.projet.createMany({
    data: [
      {
        name: "Site e-commerce",
        description: "Un site de vente en ligne moderne.",
        contexte: "Une plateforme pour vendre des produits en ligne.",
        technologies: "React, Node.js, MongoDB.",
        resultats: "Augmentation des ventes de 30%.",
        objectifs: "Créer une expérience utilisateur fluide et intuitive.",
        images: "https://i.postimg.cc/8zZPkMZs/1.png",
        videos: "https://drive.google.com/file/d/10uNfAKtuvBrGO1wCkRpKt1rV6eMENhGL/view?usp=drive_link",
        testimonials: "Bonne expérience, site rapide et efficace.",
        client: "Client D",
        date_realisation: new Date("2023-12-01"),
        completed: false,
      },

      {
        name: "Application mobile",
        description: "Une application mobile pour gérer les tâches.",
        contexte: "Application de gestion de tâches pour les professionnels.",
        technologies: "Flutter, Firebase.",
        resultats: "Amélioration de la productivité des utilisateurs.",
        objectifs: "Permettre un suivi efficace des tâches.",
        images: "https://i.postimg.cc/13v5Rwvn/2.png",
        videos: "https://drive.google.com/file/d/182SGwU2F2uCV8WMr1GDn5LNRk1vPWVHa/view?usp=drive_link",
        testimonials: "L'application a révolutionné notre organisation quotidienne.",
        client: "Client E",
        date_realisation: new Date("2025-01-15"),
        completed: true,
      },

      {
        name: "Système de réservation",
        description: "Une application de réservation en ligne.",
        contexte: "Faciliter la prise de rendez-vous pour les entreprises.",
        technologies: "Laravel, Vue.js, MySQL.",
        resultats: "Diminution du taux d'annulation des rendez-vous.",
        objectifs: "Simplifier la gestion des réservations pour les clients.",
        images: "https://i.postimg.cc/7ZKYP0K2/3.png",
        videos: "https://drive.google.com/file/d/10uNfAKtuvBrGO1wCkRpKt1rV6eMENhGL/view?usp=drive_link",
        testimonials: "Réservation simple et rapide, interface agréable.",
        client: "Client H",
        date_realisation: new Date("2023-09-15"),
        completed: false,
      },

      {
        name: "Site vitrine",
        description: "Un site vitrine pour une entreprise.",
        contexte: "Présenter les services et produits d'une société.",
        technologies: "WordPress, Elementor.",
        resultats: "Augmentation des demandes de contact.",
        objectifs: "Offrir une vitrine moderne et responsive.",
        images: "https://i.postimg.cc/bwmNYkmS/4.png",
        videos: "https://drive.google.com/file/d/182SGwU2F2uCV8WMr1GDn5LNRk1vPWVHa/view?usp=drive_link",
        testimonials: "Un site clair et efficace pour notre entreprise.",
        client: "Client I",
        date_realisation: new Date("2024-02-10"),
        completed: true,
      },

      {
        name: "Dashboard analytique",
        description: "Un tableau de bord pour visualiser des données.",
        contexte: "Optimisation du suivi des performances d’une entreprise.",
        technologies: "Vue.js, Node.js, PostgreSQL.",
        resultats: "Meilleure prise de décision grâce aux analyses.",
        objectifs: "Rendre les données plus compréhensibles via des graphiques.",
        images: "https://i.postimg.cc/NjdfGmdr/5.png",
        videos: "https://drive.google.com/file/d/13acT0rFfFwIIlpqf37GY9ZcqTFKpKHrB/view?usp=drive_link",
        testimonials: "Outil indispensable pour nos analyses marketing.",
        client: "Client G",
        date_realisation: new Date("2024-05-20"),
        completed: true,
      },

      {
        name: "Portfolio créatif",
        description: "Un portfolio pour un artiste.",
        contexte: "Présenter les œuvres d'un artiste de manière interactive.",
        technologies: "Next.js, Tailwind CSS.",
        resultats: "Visibilité accrue et plus de contacts professionnels.",
        objectifs: "Mettre en avant les créations avec un design attractif.",
        images: "https://i.postimg.cc/XYs7Nds5/6.png",
        videos: "https://drive.google.com/file/d/13acT0rFfFwIIlpqf37GY9ZcqTFKpKHrB/view?usp=drive_link",
        testimonials: "Très beau site, navigation fluide.",
        client: "Client F",
        date_realisation: new Date("2024-07-10"),
        completed: false,
      },


    ],
  });

  console.log("Projets ajoutés avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
