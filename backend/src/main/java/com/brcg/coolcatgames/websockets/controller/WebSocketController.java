package com.brcg.coolcatgames.websockets.controller;


import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import com.brcg.coolcatgames.service.JsonSerializationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

@Controller
public class WebSocketController {

    private final JsonSerializationService jsonService = new JsonSerializationService();

    @Autowired
    private RestTemplate restTemplate;

    @Value("${hangman.api.base-url}")
    private String hangmanApiBaseUrl;

    @MessageMapping("/games/{gameName}/{roomId}")
    @SendTo("/games/{gameName}/{roomId}")
    public String handleHangmanMessage(@DestinationVariable String roomId, String gameStateJson, @PathVariable String gameName) {
        try {
            // Deserialize the received gameStateJson into an Object
            Object gameStateObject = jsonService.deserializeObjectToJson(gameStateJson, Object.class);

            // Handle different games based on the gameName
            switch (gameName) {
                case "hangman":
                    // Check if the deserialized object is an instance of HangmanGameState
                    if (gameStateObject instanceof HangmanGameState) {
                        HangmanGameState gameState = (HangmanGameState) gameStateObject;

                        // Update the game state by making a call to the HangmanController endpoint
                        ResponseEntity<HangmanGameState> response = restTemplate.getForEntity(hangmanApiBaseUrl + "/api/hangman/gamestate", HangmanGameState.class);
                        HangmanGameState updatedGameState = response.getBody();

                        // Serialize the updated gameState back into JSON
                        String newGameStateJson = jsonService.serializeObjectToJson(updatedGameState);

                        // Send the updated game state back to all clients subscribed to the /games/hangman/{roomId} destination
                        return newGameStateJson;
                    } else {
                        // Handle the case when the deserialized object is not an instance of HangmanGameState
                        throw new IllegalArgumentException("Received JSON does not represent HangmanGameState");
                    }
                    // Add cases for other games here
                    // case "tic-tac-toe":
                    //     // Handle tic-tac-toe logic
                    //     break;
                default:
                    throw new IllegalArgumentException("Unsupported game: " + gameName);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
