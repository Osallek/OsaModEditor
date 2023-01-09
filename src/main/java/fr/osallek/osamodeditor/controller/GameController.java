package fr.osallek.osamodeditor.controller;

import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.GameInitDTO;
import fr.osallek.osamodeditor.form.GameForm;
import fr.osallek.osamodeditor.service.GameService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping(value = "/init", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameInitDTO> initGame() throws IOException {
        return ResponseEntity.ok(this.gameService.getInit());
    }

    @PostMapping(value = "/copy", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameInitDTO> copy(@RequestBody GameForm form) throws IOException {
        return ResponseEntity.ok(this.gameService.copyMod(form.getMod()));
    }

    @GetMapping(value = "/progress", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> gameProgress() {
        return ResponseEntity.ok(this.gameService.getGameProgress());
    }

    @PostMapping(value = "/init", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> initGame(@RequestBody GameForm form) throws IOException {
        return ResponseEntity.ok(this.gameService.parseGame(form.getInstallFolder(), form.getMod()));
    }

    @PostMapping(value = "/defines", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> changeDefines(@RequestBody Map<String, Map<String, String>> defines) throws IOException {
        return ResponseEntity.ok(this.gameService.changeDefines(defines));
    }
}
