package fr.osallek.osamodeditor.controller;

import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.GameForm;
import fr.osallek.osamodeditor.dto.GameInitDTO;
import fr.osallek.osamodeditor.service.GameService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.io.IOException;

@RestController
@RequestMapping("/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping(value = "/init", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<GameInitDTO>> initGame() {
        return Mono.just(ResponseEntity.ok(this.gameService.getInit()));
    }

    @PostMapping(value = "/init", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<GameDTO>> initGame(@RequestBody GameForm form) throws IOException {
        return Mono.just(ResponseEntity.ok(this.gameService.parseGame(form.getInstallFolder(), form.getMod())));
    }
}
