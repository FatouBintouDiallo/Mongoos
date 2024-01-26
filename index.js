// connexion à la base de donnée
const mongoose= require('mongoose')

class Database {
    constructor() {
      this._connect()
    }
  _connect() {
       mongoose.connect(`mongodb://localhost:27017/Fatima`)
         .then(() => {
           console.log('Database connection successful')
         })
         .catch(err => {
           console.error('Database connection error')
         })
        }
      }
      //Création et enregistrer un enregistrement d'un modèle
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

const Person = mongoose.model('Person', personSchema);
const newPerson = new Person({
  name: 'John Doe',
  age: 25,
  favoriteFoods: ['Pizza', 'Burger']
});

newPerson.save()
  .then(data => {
    console.log('Yes:', data);
  })
  .catch(err => {
    console.log(err);
  });
//Création de nombreux enregistrements avec model.create()

const arrayOfpeople = [{name:'Diallo',prénom:'Fatou',age:'20'},
{name:'Mary',prénom:'Abdou',age:'10'},
{name:'Mary',prénom:'Saliou',age:'17'}]
Person.create(arrayOfpeople)
.then(data => {
  console.log('enregistré:',data);
})
  .catch(err => {
    console.error(err)
  })  
 // Utilisons model.find() pour rechercher votre base de données 
  const Name = 'John';

  Person.find({ name: Name })
    .then(people => {
      console.log(' name:', people);
    })
    .catch(err => {
      console.error('Error :', err);
    });
    //Utilisons model.findOne() pour renvoyer un seul document correspondant à partir de votre base de données
    const food = 'Pizza';

    Person.findOne({ favoriteFoods: food })
      .then(person => {
        if (person) {
          console.log(' favorite food:', person);
        }
      })
      .catch(err => {
        console.error('Error searching for person:', err);
      });
     // Utilisez model.findById() pour rechercher votre base de données par _id
     const Search = 'personne'; // 

Person.findById(Search)
  .then(person => {
    if (person) {
      console.log('Person avec ID:', person);
  
    }
  })
  .catch(err => {
    console.error('Error :', err);
  });
  //Effectuons des mises à jour classiques en exécutant Rechercher, Modifier, puis Enregistrer
  const personId = 'your_person_id_here'; // Remplacez par l'ID de la personne à rechercher

// Utilisation de la méthode findById() avec des promesses
Person.findById(personId)
  .then(person => {
    if (person) {
      console.log('Person found:', person);
    } else {
      console.log('No person found with the specified ID.');
    }
  })
  .catch(err => {
    console.error('Error searching for person by ID:', err);
  });
  const personName = 'John';

  // Recherche de la personne par son nom et mise à jour de l'âge à 20
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, (err, data) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log(' successfully:', data);
    }
  });
  // Remplacez par l'ID de la personne à supprimer
  const personIdToDelete = 'person'; 

// Recherche de la personne par son ID et suppression
Person.findByIdAndRemove(personIdToDelete, (err,data) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('successfully:', data);
  }
});
const nameToRemove = 'Mary';

// Utilisation de la méthode remove() pour supprimer toutes les personnes avec le nom "Mary"
Person.remove({ name: nameToRemove }, (err, result) 
   .then(data => {
    console.log(`Removed ${result.deletedCount} people with the name "${nameToRemove}":`,data)
  })
  .catch(err => {
    console.error('Error removing people:', err);
  })
  );
// Recherche des personnes qui aiment les burritos, triées par nom, limitées à deux documents, et masquant l'âge
Person.find({ favoriteFoods: 'burritos' })
  .sort({ name: 1 }) // Tri par nom (ascendant)
  .limit(2)          // Limite à deux documents
  .select('-age')    // Masquer le champ "age"
  .exec((err, data) => {
    if (err) {
      console.error('Error :', err);
    } else {
      console.log('Personne qui aime les  burritos:', data);
    }
  });
module.exports = new Database()
