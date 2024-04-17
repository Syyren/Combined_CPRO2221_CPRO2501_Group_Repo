package com.brcg.coolcatgames.feature.multiplayer.room.controller;

import com.brcg.coolcatgames.feature.multiplayer.room.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/room")
public class RoomController {

    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("/{roomId}/join")
    public void joinRoom(@PathVariable String roomId, @RequestParam String userId) {
        roomService.addUserToRoom(roomId, userId);
    }

    @PostMapping("/{roomId}/leave")
    public void leaveRoom(@PathVariable String roomId, @RequestParam String userId) {
        roomService.removeUserFromRoom(roomId, userId);
    }

    @GetMapping("/{roomId}/users")
    public Set<String> getUsersInRoom(@PathVariable String roomId) {
        return roomService.getUsersInRoom(roomId);
    }
}
