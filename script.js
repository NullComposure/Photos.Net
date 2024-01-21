// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDbKvWxdKHnFwMBJZbV5lamDqntcZjPX4g',
    authDomain: 'ip-details-58368.firebaseapp.com',
    projectId: 'ip-details-58368',
    storageBucket: 'ip-details-58368.appspot.com',
    messagingSenderId: '815552255425',
    appId: '1:815552255425:web:6eeafc40d6fe9ed1e7cb40',
    measurementId: 'G-W1B2WF0VVV'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://ipapi.co/json/';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const ipDetails = {
                ipAddress: data.ip,
                city: data.city,
                region: data.region,
                country: data.country_name,
                latitude: data.latitude,
                longitude: data.longitude
            };

            // Add the IP details to Firestore
            addDoc(collection(db, 'ipInfo'), ipDetails)
                .then(docRef => {
                    console.log('IP details added to Firestore with ID:', docRef.id);
                })
                .catch(error => {
                    console.error('Error adding IP details to Firestore:', error);
                });

            // Update your HTML content with IP details if needed
            document.getElementById('ip-info').innerHTML = `
                <strong>IP Address:</strong> ${ipDetails.ipAddress}<br>
                <strong>City:</strong> ${ipDetails.city}<br>
                <strong>Region:</strong> ${ipDetails.region}<br>
                <strong>Country:</strong> ${ipDetails.country}<br>
                <strong>Latitude:</strong> ${ipDetails.latitude}<br>
                <strong>Longitude:</strong> ${ipDetails.longitude}<br>
            `;
        })
        .catch(error => {
            console.error('Error fetching IP details:', error);
            document.getElementById('ip-info').innerHTML = 'Failed to fetch IP details';
        });
});
