import { useState } from "react";

export default function App() {
  const [objet, setobjet] = useState([]);
  
  //FONCTION AJOUT D'UN PRODUIT
  function AjoutObjet(nouvelObjet) {
    setobjet(objets => [...objets, nouvelObjet]);
  }

  //FONCTION SUPPRESSION D'UN PRODUIT
  //id afin de cibler un produit spécifique
  //filter afin de parcourir le tab
  function btnSupprimer(id) {
    setobjet(objets => objets.filter(item => item.id !== id));
  }

  //CASE COCHE
  function CaseCoche(id) {
    setobjet(objets =>
      objets.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  
  

 return (
  <div className="app">
    <Logo />
    <Form Ajoutproduit={AjoutObjet} />
    <PackingList objet={objet} btnSupprimer={btnSupprimer} CaseCoche={CaseCoche} />
    <Stats objet={objet}  />

  </div>
 )
}

function Logo() {
  return(
    <h1> ☀ NoteFly ✈</h1>
  )
}

function Form({Ajoutproduit}) {
  const [description, setdescription] = useState("");
  //Cette fonction permet le réglage de la quantité.(par défaut 1)
  const [quantity, setquantity] = useState(1);

  function AjoutEnregistrement(e) {
    e.preventDefault();

    if(!description) return;

    const NouvelObjet = {description,quantity,packed: false, id: Date.now() };
    console.log(NouvelObjet);
    Ajoutproduit(NouvelObjet);
    //MAJ sur IU après ajout d'un élement
    setdescription("");
    setquantity(1);

  }
  return ( 
    <form className="add-form" onSubmit={AjoutEnregistrement}> 
    <h3> Noter tout pour votre voyage ! 📃 </h3>
    <select value={quantity} onChange={(e) => setquantity(Number(e.target.value))}>
      
      {Array.from({length:10} ,(_, i) => i + 1). map(num=>
      
      <option value={num} key={num}>
          {num}
      </option>)}
    </select>

      <input type="text" placeholder="produit" 
      value={description} onChange={(e)=> setdescription(e.target.value)} />
      <button> Ajouter </button>
    </form>
)
}







//Liste de produits
function PackingList({objet , btnSupprimer , CaseCoche}) {
  return ( 
    <div className="list">
        <ul> 
          {objet.map((item) => (
            //Item nom du composant,item nom de l'accessoire(props), item qui est objet
            <Item item={item} btnSupprimer={btnSupprimer} CaseCoche={CaseCoche} />
          ))}
        </ul>
    </div>
  );
}

//chaque produit
  function Item({ item  , btnSupprimer , CaseCoche}) {
    return ( 
        <li>
          <input type="checkbox" checked={item.packed} onChange={()=>CaseCoche(item.id)}/>
            <span style={item.packed ? {textDecoration:"line-through"} : {}}>
            {item.quantity} {item.description}  
            </span>
            <button onClick={() => btnSupprimer(item.id)}>❌</button>
        </li>
    );
  }


  

//FOOTER
function Stats({objet }) {
  //MSG Auto quand liste est vide
  if (!objet.length)
    return (
        <span className="stats">
          <em> Commencer à préparer vos affaires ! 👜 </em>
        </span>
    )

  //Sommes des genres de produit
  const nbxobjet = objet.length;
  const nbxobjetemballé = objet.filter((objet) => objet.packed).length;
  const pourcentageemballe = Math.round((nbxobjetemballé / nbxobjet) * 100);

  //reduce permet de calculer la somme
  const SommeItem = objet.reduce((total, item) => total + item.quantity, 0);
  return (
      <footer className="stats">
        <span style={{display:"flex",justifyContent:"center",width:"100%"}}>  
          👝 Tu as {SommeItem} dans ta liste {SommeItem > 1 ? "produits " : "produit "} 
          et {nbxobjet} types dont {nbxobjetemballé} emballé ({pourcentageemballe} %)
        </span>
      </footer>
  )
}


