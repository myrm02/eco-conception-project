'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Project from "@/types/Project"

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [tech, setTech] = useState<string | undefined>(undefined);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const techParam = queryParams.get('tech');
        if (techParam) {
            setTech(techParam); 
        }
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                let query = '/api/projet';
                if (tech) {
                    query += `?tech=${tech}`; 
                }
                const response = await fetch(query);
                const data = await response.json();
                setProjects(data);
            } 
            catch (err: unknown) {
                if (err instanceof Error) {
                    setError(`Une erreur est survenue : ${err.message}`);
                } else {
                    setError('Une erreur inconnue est survenue.');
                }
            }
        };

        fetchProjects();
    }, [tech]); 

    // Liste des technologies
    const technologies = ['React', 'Node.js', 'Flutter', 'Laravel', 'Vue.js', 'WordPress', 'Next.js', 'Tailwind CSS', 'Firebase', 'PostgreSQL'];

    // Filtrer les projets par technologie
    const handleSelectTech = (tech: string) => {
        window.history.pushState({}, '', `/projet?tech=${tech}`); 
        setTech(tech); 
    };

    if (error) {
        return <p>Erreur : {error}</p>;
    }

    return (
        <div className="container justify-center" aria-label="Page de projet">
            <h1 className="text-9xl text-blue-900">NOS PROJETS</h1>
            {/* Liste des technologies avec gestion de sélection */}
            <div className="technologies">
                <ul className="projects-techno">
                    <li>
                        <a href={`/projet`} aria-label="Filtre par défaut">
                        Tous les projets
                        </a>
                    </li>
                    {technologies.map((techItem) => (
                        <li
                            key={techItem}
                            onClick={() => handleSelectTech(techItem)}
                            className={techItem === tech ? 'selected' : ''}
                            aria-label={'Filtre pour la technologie ' + tech}
                        >
                            {techItem}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`project-card ${
                            index % 3 === 1 ? 'middle' : index % 3 === 0 ? 'left' : 'right'
                        }`}
                    >
                        <div className="image-container">
                            <div className='flipper'>
                            <Image
                                src={project.images}
                                alt={project.name}
                                className="project-image"
                                width={500}  
                                height={350}
                                priority={true}
                            />

                            <div className="overlay">
                                <h2 className="project-title">{project.name}</h2>
                                <p className="description">{project.description}</p>
                                <a href={`/projet/${project.id}`} className="more-info-button" aria-label="En savoir plus sur le projet">
                                    Voir plus
                                </a>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
