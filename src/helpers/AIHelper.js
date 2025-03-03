import * as FileSystem from 'expo-file-system';
import {incrementTodayRequestCount} from "./userHelper";

export const analyseImage = async (imageUri, allergens) => {
    const allergensFormatted = allergens.join(", ");

    const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    const payload = {
        model: "gpt-4o",
        messages: [
            {
                "role": "system",
                "content": "You are a nutritionist specializing in food analysis. Your task is to analyze food images and determine, for each allergen in a provided list, whether the allergen is likely present in the food or not. Return the results in the following JSON format: \n\n{ \n  \"product_description\": \"[Product Name or Description]\", \n  \"allergens\": { \n    \"[Allergen Name]\": { \n      \"contains\": true/false, \n      \"confidence\": [percentage from 0 to 100] \n    }, \n    ... \n  } \n}\n\nThe `contains` field should be `true` if the allergen is likely present and `false` if the allergen is likely absent. The `confidence` field should represent how certain you are of the presence or absence of the allergen based on the food image and product context. Ensure the confidence values are well-reasoned and based on visible evidence, typical ingredients, or other relevant factors."
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Please analyze the following food image and determine the likelihood of the presence of allergens in the food. Use the JSON format described below."
                    },
                    {
                        "type": "text",
                        "text": "For each allergen, return the following details: \n1. `contains`: true if the allergen is likely present, false if not. \n2. `confidence`: Your confidence level (as a percentage) in the presence or absence of the allergen."
                    },
                    {
                        "type": "text",
                        "text": "Here is the list of allergens to analyze: " + allergensFormatted
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": `data:image/jpeg;base64,${base64}`
                        }
                    }
                ]
            }
        ],
        max_tokens: 200,
    }

    try {

        await incrementTodayRequestCount();
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPEN_AI}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            const responseMessage = data.choices[0].message.content.trim();

            const jsonStart = responseMessage.indexOf('{');
            const jsonEnd = responseMessage.lastIndexOf('}');

            if (jsonStart !== -1 && jsonEnd !== -1) {
                const jsonString = responseMessage.substring(jsonStart, jsonEnd + 1);
                return JSON.parse(jsonString);
            } else {
                console.error("JSON not found in responseMessage");
                return null;
            }
        } else {
            console.error("API Error:", data);
        }
    } catch (error) {
        console.log("Error:", error);
    }
}