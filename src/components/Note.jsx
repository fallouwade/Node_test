import { useState } from "react";
import { MdMode } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
const Note = (props) => {
    
    const [page1, setpage] = useState(1)

    let affiche = props.note || []

    
   const page = (i) => {
        setpage(i)

    }
    let currentPage = page1;
    let itemsPerPage = 6;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const totalPages = Math.ceil(affiche.length / itemsPerPage);
    let pagi= affiche.slice(start, end);
    
    return (
        <div className="container-fluid">
        <div>
        <div className="flex justify-center my-5 mx-auto">
            <table className="border-collapse border border-slate sm:w-4/5 w-full">
                <thead>
                    <tr>
                        <th className="border border-slate text-center">Prénom</th>
                        <th className="border border-slate text-center">Email</th>

                        <th className="border border-slate text-center">Téléphone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pagi.map((item) => (

                            <tr key={item._id || Math.random()}>

                                <td className="border border-slate text-center">{item.prenom}</td>
                                <td className="border border-slate text-center">{item.email}</td>
                                <td className="border border-slate text-center">{item.telephone}</td>
                                <td className="border border-slate text-center">
                                    <div className="flex justify-center">
                                        <div>
                                            <button onClick={() => props.update(item._id)}>
                                                <MdMode className="hover:text-blue-400" />
                                            </button>
                                        </div>
                                        <div>
                                            <button onClick={() => props.delete(item._id)} >
                                                <RiDeleteBin5Line  className="hover:text-red-400"/>
                                            </button>
                                        </div>
                                    </div>
                                </td>

                            </tr>

                        ))
                    }
                </tbody>
            </table>
           
        </div>
        <div className="flex gap-3 justify-center mt-12" >

<button
    className="py-2 px-5 bg-sky-500 text-white font-semibold rounded shadow-md"
    onClick={() => page(page1 - 1)}
    disabled={page === 1}
    style={{ display: affiche.length >= 6 ? 'block' : 'none' }}
>
    Next
</button>
<button
    className="py-2 px-5 bg-sky-500 text-white font-semibold rounded shadow-md"
    onClick={() => page(page1 + 1)}
    style={{ display: affiche.length >= 6 ? 'block' : 'none' }}


>
    Suivant
</button>

</div>
        </div>
        </div>
    )
  }
  
  export default Note