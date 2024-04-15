package com.brcg.coolcatgames.websockets.controller;

import com.brcg.coolcatgames.service.JsonSerializationService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

// Define WebSocket endpoint
@Controller
public class WebSocketController {

    private final JsonSerializationService jsonService = new JsonSerializationService();

    @MessageMapping("/games/{gameName}/{roomId}")
    @SendTo("/games/{gameName}/{roomId}")
    public String handleGameMessage(@DestinationVariable String roomId, String gameStateJson, @PathVariable String gameName) {
        String newGameStateJson = gameStateJson;
//        switch (gameName) {
//            case "hangman" ->
//                    newGameStateJson = jsonService.serializeObjectToJson();
//            case "tic-tac-toe" ->
//                    newGameStateJson = jsonService.serializeObjectToJson();
//            default ->
//                    newGameStateJson = jsonService.serializeObjectToJson();
//        };
        return newGameStateJson;
    }
}

