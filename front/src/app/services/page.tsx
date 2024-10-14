"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

interface Intervention {
  id: string;
  date: string;
  title: string;
  description: string;
}


const Interventions: React.FC = () => {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const vehicleId: string = searchParams.get('vehicleId') || '';

  // Exemple de données qui proviendraient de votre base de données
  const exampleInterventions: Intervention[] = [
    {
      id: "1",
      date: "5 Jan 2024",
      title: "Changement d'huile",
      description: "Lorem ipsum dolor sit amet nulla adipiscing elit.",
    },
    {
      id: "2",
      date: "5 Jan 2024",
      title: "Remplacement des pneus",
      description: "Nunc maximus, nec ut commodo...",
    },
  ];

  useEffect(() => {
    // Simuler la récupération des données depuis la base de données
    setInterventions(exampleInterventions);
  }, []);

  const filteredInterventions = interventions.filter((intervention) =>
    intervention.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: string) => {
    console.log(`Modifier intervention avec id: ${id}`);
    // Naviguer vers la page de modification (remplacez avec votre route réelle)
    router.push(`/services/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Supprimer intervention avec id: ${id}`);
    // Implémentez la logique de suppression ici
  };

  const handleAddService = (vehicleID: string) => {
    // Naviguer vers la page d'ajout de service (remplacez avec votre route réelle)
    router.push(`/add-service?vehicleId=${vehicleID}`);
  };

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Interventions</h1>
      <h2 className="text-lg text-center mb-8">Rappel du nom du véhicule</h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Rechercher"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full max-w-sm"
        />
      </div>

      {/* Garder les interventions en colonne */}
      <div className="flex flex-col gap-6">
        {filteredInterventions.map((intervention) => (
          <div
            key={intervention.id}
            className="border border-gray-200 rounded-lg p-4 shadow-md relative"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">
                <i className="far fa-calendar-alt"></i> {intervention.date}
              </p>
              <div className="space-x-2">
                <button onClick={() => handleEdit(intervention.id)}></button>
                <button onClick={() => handleDelete(intervention.id)}></button>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{intervention.title}</h3>
            <p className="text-gray-700">{intervention.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => handleAddService(vehicleId)}
          className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Ajouter un service
        </button>
      </div>
    </section>
  );
};

export default Interventions;
