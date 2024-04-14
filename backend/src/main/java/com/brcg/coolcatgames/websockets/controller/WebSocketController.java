package com.brcg.coolcatgames.websockets.controller;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/game/{roomId}")
    @SendTo("/topic/game/{roomId}")
    public String handleGameMessage(@DestinationVariable String roomId, String gameStateJson) {

        return gameStateJson;
    }
}

