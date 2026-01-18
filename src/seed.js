// scripts/seedPetClient.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4Q6074At_QjQUhT_mdZR7fkPDGyytQ7M",
  authDomain: "eam1-a59b1.firebaseapp.com",
  projectId: "eam1-a59b1",
  storageBucket: "eam1-a59b1.firebasestorage.app",
  messagingSenderId: "593745158866",
  appId: "1:593745158866:web:67deab710186c0be7e030b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedPet() {
  const pet = {
    Name: "Max",
    race: "Labrador Retriever",
    colour: "Black",
    kind: "Dog",
    gender: "Male",
    micro: "978000000123456",
    yearofbirth: "2019",
    vax: "Yes",
    parasite: "Yes",
    surgery: "None",
    chronic: "None",
    notes: "Very friendly, good with children",
    ownerid: "8FgPwE2TSCu5GjkDhqr7",
  };

  // Fixed id => re-run safe
  await setDoc(doc(db, "pets", "pet_001"), pet, { merge: true });

  console.log("Created/updated pets/pet_001");
}

seedPet().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
