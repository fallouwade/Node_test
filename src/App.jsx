import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [donne, setDonne] = useState({ prenom: "", email: "", telephone: "" });
  const [modifi, setmodifi] = useState(false);
  const [identifiant, setId] = useState();



  useEffect(() => {
    axios
      .get('https://projet1-node.onrender.com/api/stuff')
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données:', error);
      });
  }, [donne]);


  // Ajout de note
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = { ...donne };

    if(modifi){
        axios
    .put(`https://projet1-node.onrender.com/api/stuff/${identifiant}`, noteObject)
    .then((response)=>{
      
      setDonne({ prenom: "", email: "", telephone: "" });
    })
    .catch(() => {
      console.error('Erreur lors de l\'ajout de la note:', error);

    })

    }

    else{
    axios
      .post('https://projet1-node.onrender.com/api/stuff', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data));
        setDonne({ prenom: "", email: "", telephone: "" });
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la note:', error);
      });
    }
    setmodifi(false)

  };



  // Suppression de note
  const deleteNote = (id) => {
    axios
      .delete(`https://projet1-node.onrender.com/api/stuff/${id}`)
      .then(() => {
        setNotes(notes.filter(note => note._id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la note:', error);
      });
  };

  const updater= (id)=>{
    const note = notes.find(n => n._id === id)
    setmodifi(true)
    setId(id)
  
    setDonne(prev=>({prenom: note.prenom, email: note.email, telephone: note.telephone}))
    
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonne(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className='container-fluid flex flex-col '>
      <h1 className='font-bold text-center my-5 text-2xl'>Todo list</h1>

     
      <form onSubmit={addNote}>
      <div className="flex flex-col  items-center items-baseline
                         w-96 content-baseline gap-3 mx-auto content-stretch px-16">
                            
                            <div className="flex flex-col w-full gap-1">
                                <label>Prénom</label>
                                <input type="text" 
                                    name="prenom"
                                    value={donne.prenom || ""}
                                    onChange={handleChange}
                                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label>Email</label>
                                <input type="email"
                                name="email"
                                value={donne.email || ""}
                                onChange={handleChange}
                                 className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                            </div>
                           
                            <div className="flex flex-col w-full gap-1">
                                <label>Téléphone</label>
                                <input type="number"
                                name="telephone"
                                value={donne.telephone || ""}
                                onChange={handleChange}
                                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                            </div>
                        </div>
                        <div className="flex justify-center my-5">
                            <button
                            className="py-2 px-5 bg-sky-500 text-white font-semibold rounded shadow-md"  >
                                {modifi ? "Modifier" : "envoyer"}
                            </button>
                        </div>
      </form>

     
     
        {/* {notes.map(note => (
          <li key={note._id}>
            <Note note={note} />
            <button onClick={() => deleteNote(note._id)}>Supprimer</button>
            <button onClick={() => updater(note._id)}>Modifier</button>

          </li>
        ))} */}
          <Note note={notes} update={updater} delete={deleteNote}  />
    
    </div>
  );
};

export default App;
