package fr.osallek.osamodeditor.controller;

import fr.osallek.osamodeditor.dto.AdvisorEdit;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.service.AdvisorService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/advisor/{name}")
public class AdvisorController {

    private final AdvisorService advisorService;

    public AdvisorController(AdvisorService advisorService) {
        this.advisorService = advisorService;
    }

    @PostMapping(value = "/edit", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> edit(@PathVariable("name") String name, @RequestBody AdvisorEdit body) throws IOException {
        return ResponseEntity.ok(this.advisorService.edit(name, body));
    }
}
