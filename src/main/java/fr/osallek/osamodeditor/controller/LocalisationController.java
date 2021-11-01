package fr.osallek.osamodeditor.controller;

import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.LocalisedDTO;
import fr.osallek.osamodeditor.service.LocalisationService;
import java.io.IOException;
import javax.websocket.server.PathParam;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping(value = "/{key}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> edit(@PathParam("key") String key, @RequestBody LocalisedDTO body) throws IOException {
        return ResponseEntity.ok(this.localisationService.edit(key, body));
    }
}
