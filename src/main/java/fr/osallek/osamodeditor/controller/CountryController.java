package fr.osallek.osamodeditor.controller;

import fr.osallek.osamodeditor.dto.CountryEditDTO;
import fr.osallek.osamodeditor.dto.FileDTO;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.service.CountryService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/country/{tag}")
public class CountryController {

    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @PostMapping(value = "/flag", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FileDTO> initGame(@PathVariable("tag") String tag, @RequestPart("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(this.countryService.flag(tag, file));
    }

    @PostMapping(value = "/edit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> edit(@PathVariable("tag") String tag, @RequestPart(value = "flag", required = false) MultipartFile flagFile,
                                        @RequestPart(value = "body", required = false) CountryEditDTO body) throws IOException {
        return ResponseEntity.ok(this.countryService.edit(tag, flagFile, body));
    }
}
