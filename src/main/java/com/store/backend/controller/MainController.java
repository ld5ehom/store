package com.store.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MainController {
    @GetMapping(value = "/")
    public String index(){
        return "Welcome to the UCLA Store!!";
    }
}
//http://localhost:8080/