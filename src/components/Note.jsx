const Note = ({ note }) => {
    console.log(note);
    
    return (
        <div>
             <ul>
      
          <li key={note._id}>
            <p>{note.prenom} - {note.email} - {note.telephone}</p>
           
          </li>
    
      </ul>
        </div>
    )
  }
  
  export default Note