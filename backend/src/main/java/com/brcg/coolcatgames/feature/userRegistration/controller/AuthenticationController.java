package com.brcg.coolcatgames.feature.userRegistration.controller;

import com.brcg.coolcatgames.config.JwtUtil;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller class for handling user authentication.
 */
@RestController
@RequestMapping("/api/players")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PlayerService playerService;

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    /**
     * Generates a JWT token for the user upon successful authentication.
     *
     * @param loginRequest the user login request
     * @return ResponseEntity containing the JWT token and user details
     * @throws Exception if an error occurs during authentication
     */
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Player loginRequest) throws Exception {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        final String jwt = jwtUtil.generateToken(userDetails);
        String userId = String.valueOf(playerService.getUserIdByUsername(String.valueOf(userDetails.getUsername())));

        Map<String, String> response = new HashMap<>();
        response.put("userId", userId);
        response.put("username", userDetails.getUsername());
        response.put("jwt", jwt);
        return ResponseEntity.ok(response);
    }
}