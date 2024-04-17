import { initializeApp } from 'firebase/app'
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDnj9kzOn9cvXUQ8tVYwfbkba737rytAyM",
  authDomain: "vulpes-shop-be5ec.firebaseapp.com",
  projectId: "vulpes-shop-be5ec",
  storageBucket: "vulpes-shop-be5ec.appspot.com",
  messagingSenderId: "220184054598",
  appId: "1:220184054598:web:e1a1690bb6659288713347"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)


async function uploadFileInStorage(file, filename) {
  try {
    const storageRef = ref(storage, `products/${filename}`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL)
    return downloadURL
  } 
  catch (error) {
    console.error('Error uploading file:', error); 
  }
}

export { uploadFileInStorage }