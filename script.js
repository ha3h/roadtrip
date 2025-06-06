//DO NOT TOUCH UNTIL YOU PROMPT ENGINEER / ADD KEYS

import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"; //import for e5 models

const APIKEY = ""; //import your own apikey

// Initialize the Generative AI model
const ai = new GoogleGenerativeAI(APIKEY);
const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" }); //free model

// Get references to HTML input elements and the button
const startLocationInput = document.getElementById('startLocation');
const endLocationInput = document.getElementById('endLocation');
const numStopsInput = document.getElementById('numStops');
const generateTripBtn = document.getElementById('generateTripBtn');

// Get references to HTML output and message elements
const loadingMessage = document.getElementById('loadingMessage');
const errorMessage = document.getElementById('errorMessage');
const tripPlanOutput = document.getElementById('tripPlanOutput');

// Async function to handle the road trip generation
async function generateRoadTrip() {
    // Clear previous output and hide any old messages
    tripPlanOutput.innerHTML = '';
    errorMessage.style.display = 'none';
    loadingMessage.style.display = 'none'; // Ensure it's hidden initially for new requests

    // Get input values from the text fields
    const startLocation = startLocationInput.value.trim();
    const endLocation = endLocationInput.value.trim();
    // Convert number of stops to an integer
    const numStops = parseInt(numStopsInput.value, 10); // Base 10 for parseInt

    // Basic input validation
    if (!startLocation || !endLocation || isNaN(numStops) || numStops < 0) {
        errorMessage.textContent = "Please ensure all fields are filled and the number of stops is valid.";
        errorMessage.style.display = 'block';
        return; // Stop execution if inputs are invalid
    }

    // Show loading message while fetching data
    loadingMessage.style.display = 'block';

    try {
        // Your original prompt, unchanged as per your instruction
        const prompt = `Plan a detailed road trip from ${startLocation} to ${endLocation}.
        I want ${numStops} interesting and relevant stops along the way.
        For each stop, include:
        - The name of the stop
        - A brief description of why it's interesting
        - Estimated driving time from the previous point (or start)
        - Suggested activities or points of interest at the stop.
        Organize the itinerary clearly, day by day, if applicable.
        Ensure the trip is realistic, enjoyable, and considers logical routing.`;

        // Generate content using your specified model and prompt
        const result = await model.generateContent(prompt);
        const responseText = result.response.text(); // Get the text directly from the response

        // Display the generated plan in the output div using a <pre> tag for formatting
        tripPlanOutput.innerHTML = `<pre>${responseText}</pre>`;

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error generating road trip:", error);
        // Display a user-friendly error message
        errorMessage.textContent = "Failed to generate road trip. Please check your API key and try again later.";
        errorMessage.style.display = 'block';
    } finally {
        // Hide the loading message once the process is complete (success or error)
        loadingMessage.style.display = 'none';
    }
}

// Add an event listener to the "Generate Road Trip" button
// This will call the 'generateRoadTrip' function when the button is clicked.
generateTripBtn.addEventListener('click', generateRoadTrip);