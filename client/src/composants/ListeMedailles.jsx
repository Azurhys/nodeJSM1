import React from 'react';
import useMedailles from '../hooks/useMedailles';
import useEpreuves from '../hooks/useEpreuves';

const ListeMedailles = () => {
    const { medailles, loading, error } = useMedailles();
    const { epreuves } = useEpreuves();

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    
    const medaillesParEpreuve = {};
    epreuves.forEach(epreuve => {
      medaillesParEpreuve[epreuve.id_epreuve] = medailles.filter(medaille => medaille.id_epreuve === epreuve.id_epreuve);
    });
    console.log(medaillesParEpreuve)
    return (
        <div className='d-flex align-items-center flex-column'>
            <h1>Liste des médaillés</h1>
            <div className='row'>
            {epreuves.map((epreuve) => (
            <div className='col-4 m-0 p-0 d-flex flex-column' key={epreuve.id_epreuve}>
                <h2>{epreuve.nom_epreuve}</h2>
                    {epreuve.epreuve_id == medailles.epreuve_id ? (
                        <p>🥇 {medaillesParEpreuve[epreuve.id_epreuve][0].nom_athlete}</p>
                    ) : (
                        <p>🥇 -</p>
                    )}
                    {medaillesParEpreuve[epreuve.id_epreuve]?.[1] ? (
                        <p>🥈 {medaillesParEpreuve[epreuve.id_epreuve][1].nom_athlete}</p>
                    ) : (
                        <p>🥈 -</p>
                    )}
                    {medaillesParEpreuve[epreuve.id_epreuve]?.[2] ? (
                        <p>🥉 {medaillesParEpreuve[epreuve.id_epreuve][2].nom_athlete}</p>
                    ) : (
                        <p>🥉 -</p>
                    )}
            </div>
            ))}
            </div>
        </div>
    );
  };
 
export default ListeMedailles;