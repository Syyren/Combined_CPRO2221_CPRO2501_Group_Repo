package com.brcg.coolcatgames.feature.arcadeshooter.controller;

import com.brcg.coolcatgames.feature.arcadeshooter.model.ArcadeShooterSession;
import com.brcg.coolcatgames.feature.arcadeshooter.model.EndSessionRequest;
import com.brcg.coolcatgames.feature.arcadeshooter.service.ArcadeShooterSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Controller class for managing arcade shooter sessions.
 */
@RestController
@RequestMapping("/api/arcadeshooter/sessions")
@RequiredArgsConstructor
public class ArcadeShooterSessionController {

    private final ArcadeShooterSessionService sessionService;

    /**
     * Endpoint to start a new session.
     *
     * @param userId the ID of the user starting the session
     * @return ResponseEntity containing the created session or 404 if not found
     */
    @PostMapping("/start")
    public ResponseEntity<ArcadeShooterSession> startSession(@RequestParam String userId) {
        ArcadeShooterSession newSession = sessionService.startSession(userId);
        if (newSession == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(newSession);
    }

    /**
     * Endpoint to end an existing session.
     *
     * @param id                the ID of the session to end
     * @param endSessionRequest the request body containing session end details
     * @return ResponseEntity containing the ended session or 404 if not found
     */
    @PutMapping("/end/{id}")
    public ResponseEntity<ArcadeShooterSession> endSession(@PathVariable String id, @RequestBody EndSessionRequest endSessionRequest) {
        ArcadeShooterSession endedSession = sessionService.endSession(id, endSessionRequest.getFinalScore(), endSessionRequest.getLevelReached());
        if (endedSession == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(endedSession);
    }

    /**
     * Endpoint to update an existing session.
     *
     * @param id      the ID of the session to update
     * @param session the updated session data
     * @return ResponseEntity containing the updated session or 404 if not found
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<ArcadeShooterSession> updateSession(@PathVariable String id, @RequestBody ArcadeShooterSession session) {
        ArcadeShooterSession updatedSession = sessionService.updateSession(id, session);
        if (updatedSession == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedSession);
    }

    /**
     * Endpoint to retrieve a session by its ID.
     *
     * @param id the ID of the session to retrieve
     * @return ResponseEntity containing the session or 404 if not found
     */
    @GetMapping("/search/{id}")
    public ResponseEntity<ArcadeShooterSession> getSessionById(@PathVariable String id) {
        ArcadeShooterSession session = sessionService.getSessionById(id);
        if (session == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(session);
    }

    /**
     * Endpoint to retrieve all sessions belonging to a user.
     *
     * @param userId the ID of the user
     * @return ResponseEntity containing the list of sessions or 404 if none found
     */
    @GetMapping("/search/user/{userId}")
    public ResponseEntity<List<ArcadeShooterSession>> getSessionsByUserId(@PathVariable String userId) {
        List<ArcadeShooterSession> sessions = sessionService.getSessionsByUserId(userId);
        if (sessions.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(sessions);
    }

    /**
     * Endpoint to delete a session by its ID.
     *
     * @param id the ID of the session to delete
     * @return ResponseEntity indicating success or 404 if not found
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable String id) {
        boolean isDeleted = sessionService.deleteSession(id);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}