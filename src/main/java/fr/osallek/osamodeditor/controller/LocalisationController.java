package fr.osallek.osamodeditor.controller;

import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.LocalisedDTO;
import fr.osallek.osamodeditor.service.LocalisationService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/localisation")
public class LocalisationController {

    private final LocalisationService localisationService;

    public LocalisationController(LocalisationService localisationService) {
        this.localisationService = localisationService;
    }

    @PostMapping(value = "/missing", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> missing() throws IOException {
        return ResponseEntity.ok(this.localisationService.missing());
    }

    @PostMapping(value = "/{key}/edit", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> edit(@PathVariable("key") String key, @RequestBody LocalisedDTO body) throws IOException {
        return ResponseEntity.ok(this.localisationService.edit(key, body));
    }
}
