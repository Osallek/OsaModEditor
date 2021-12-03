package fr.osallek.osamodeditor.controller;

import fr.osallek.osamodeditor.dto.BookmarkEdit;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.service.BookmarkService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/bookmark/{name}")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @PostMapping(value = "/edit", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> edit(@PathVariable("name") String name, @RequestBody BookmarkEdit body) throws IOException {
        return ResponseEntity.ok(this.bookmarkService.edit(name, body));
    }
}
