package fr.osallek.osamodeditor.controller;

import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.MissionsTreeEditDTO;
import fr.osallek.osamodeditor.service.MissionsTreeService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/missions-tree/{name}")
public class MissionsTreeController {

    private final MissionsTreeService missionsTreeService;

    public MissionsTreeController(MissionsTreeService missionsTreeService) {
        this.missionsTreeService = missionsTreeService;
    }

    @PostMapping(value = "/edit", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> edit(@PathVariable("name") String name, @RequestBody MissionsTreeEditDTO body) throws IOException {
        return ResponseEntity.ok(this.missionsTreeService.edit(name, body));
    }
}
