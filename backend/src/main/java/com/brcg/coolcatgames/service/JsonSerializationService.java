package com.brcg.coolcatgames.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class JsonSerializationService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String serializeObjectToJson(Object object) {
        try {
            //converts object to json string
            String json = objectMapper.writeValueAsString(object);
            System.out.println("Object successfully converted to Json:\n"+ json);
            return json;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Object deserializeObjectToJson(String json, Class<?> clazz) {
        try {
            //converts json to new object
            Object newObject =  objectMapper.readValue(json, clazz);
            System.out.println("String json successfully converted to Class:\n"+clazz.getName());
            return newObject;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

//
//    public String wrapJson(String type, String payload) {
//        try {
//            //takes payload string and wraps in type as json and maps as "type":"type", "payload":{payload}
//            var wrapper = new java.util.HashMap<String, Object>();
//            wrapper.put("type", type);
//            wrapper.put("payload", payload);
//            //re-serialize the map to string and returns as wrapped json
//            String wrappedJson = objectMapper.writeValueAsString(wrapper);
//            System.out.println("Payload successfully wrapped to new Json:\n"+ wrappedJson);
//            return wrappedJson;
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
}
