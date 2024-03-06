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
    medailles.forEach(medaille => {
        if (!medaillesParEpreuve[medaille.epreuve_id]) {
            medaillesParEpreuve[medaille.epreuve_id] = [];
        }
        medaillesParEpreuve[medaille.epreuve_id].push(medaille);
    });
    
    
    return (
        <div className='d-flex align-items-center flex-column'>
            <h1 className='my-5'>Liste des médaillés</h1>
            <div className='row row-gap-3'>
            {epreuves.map((epreuve) => (
            <div className='col-4 m-0 p-0 d-flex flex-column align-items-center' key={epreuve.id_epreuve}>
                <h2>{epreuve.nom_epreuve}</h2>
                        {medaillesParEpreuve[epreuve.epreuve_id].map((medaille, index) => (
                                    <div className={`medaille ${medaille.type_medaille.toLowerCase()}`} key={index}>
                                        <p>{medaille.type_medaille === 'Or' ? '🥇' : (medaille.type_medaille === 'Argent' ? '🥈' : '🥉')} {medaille.nom_athlete}</p>
                                    </div>
                        ))}
            </div>
            ))}
            </div>
        </div>
    );
  };
 
export default ListeMedailles;