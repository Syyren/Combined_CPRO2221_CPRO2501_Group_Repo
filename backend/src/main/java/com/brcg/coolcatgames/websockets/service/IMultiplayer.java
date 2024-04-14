package com.brcg.coolcatgames.websockets.service;

import com.fasterxml.jackson.databind.ObjectMapper;

public interface IMultiplayer {

    default ObjectMapper getObjectMapper() {
        return DefaultObjectMapperHolder.OBJECT_MAPPER;
    }

    void gameStateUpdate(String gameStateJson);

    class DefaultObjectMapperHolder {
        static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    }
}
