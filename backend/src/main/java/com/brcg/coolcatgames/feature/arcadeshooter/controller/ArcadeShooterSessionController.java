package com.brcg.coolcatgames.feature.arcadeshooter.controller;

import com.brcg.coolcatgames.feature.arcadeshooter.model.ArcadeShooterSession;
import com.brcg.coolcatgames.feature.arcadeshooter.model.EndSessionRequest;
import com.brcg.coolcatgames.feature.arcadeshooter.service.ArcadeShooterSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/arcadeshooter/sessions")
@RequiredArgsConstructor
public class ArcadeShooterSessionController {

    private final ArcadeShooterSessionService sessionService;

    @PostMapping("/start")
    public ResponseEntity<ArcadeShooterSession> startSession(@RequestParam String userId) {
        ArcadeShooterSession newSession = sessionService.startSession(userId);
        return ResponseEntity.ok(newSession);
    }

    @PutMapping("/end/{id}")
    public ResponseEntity<ArcadeShooterSession> endSession(@PathVariable String id, @RequestBody EndSessionRequest endSessionRequest) {
        ArcadeShooterSession endedSession = sessionService.endSession(id, endSessionRequest.getFinalScore(), endSessionRequest.getLevelReached());
        if (endedSession == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(endedSession);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ArcadeShooterSession> updateSession(@PathVariable String id, @RequestBody ArcadeShooterSession session) {
        ArcadeShooterSession updatedSession = sessionService.updateSession(id, session);
        if (updatedSession == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedSession);
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<ArcadeShooterSession> getSessionById(@PathVariable String id) {
        ArcadeShooterSession session = sessionService.getSessionById(id);
        if (session == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(session);
    }

    @GetMapping("/search/user/{userId}")
    public ResponseEntity<List<ArcadeShooterSession>> getSessionsByUserId(@PathVariable String userId) {
        List<ArcadeShooterSession> sessions = sessionService.getSessionsByUserId(userId);
        if (sessions.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(sessions);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable String id) {
        boolean isDeleted = sessionService.deleteSession(id);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}