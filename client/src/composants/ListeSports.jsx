import useSports from "../hooks/useSports";


const ListeSports = () => {
    const { sports } = useSports(); 

    return (<div className="d-flex flex-column align-items-center">
                <h1 className='my-5'>Liste des sports aux Jeux Olympiques</h1>
                <ul>
                    {sports.map((sport) => (
                        <h1 key={sport.id_sport}>{sport.nom_sport}</h1>
                    ))}
                </ul>
            </div> );
}
 
export default ListeSports;