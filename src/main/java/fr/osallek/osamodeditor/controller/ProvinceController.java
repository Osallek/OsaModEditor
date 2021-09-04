package fr.osallek.osamodeditor.controller;

import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.form.MapActionForm;
import fr.osallek.osamodeditor.service.ProvinceService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/province")
public class ProvinceController {

    private final ProvinceService provinceService;

    public ProvinceController(ProvinceService provinceService) {
        this.provinceService = provinceService;
    }

    @PostMapping(value = "/change-owner", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> changeOwner(@RequestBody MapActionForm form) throws IOException {
        return ResponseEntity.ok(this.provinceService.changeOwner(form));
    }

    @PostMapping(value = "/change-controller", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> changeController(@RequestBody MapActionForm form) throws IOException {
        return ResponseEntity.ok(this.provinceService.changeController(form));
    }

    @PostMapping(value = "/change-owner-controller", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> changeOwnerAndController(@RequestBody MapActionForm form) throws IOException {
        return ResponseEntity.ok(this.provinceService.changeOwnerAndController(form));
    }

    @PostMapping(value = "/change-owner-controller-core", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> changeOwnerAndControllerAndCore(@RequestBody MapActionForm form) throws IOException {
        return ResponseEntity.ok(this.provinceService.changeOwnerAndControllerAndCore(form));
    }

    @PostMapping(value = "/add-hre", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> addToHre(@RequestBody MapActionForm form) throws IOException {
        return ResponseEntity.ok(this.provinceService.addToHre(form));
    }

    @PostMapping(value = "/remove-hre", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> removeFromHre(@RequestBody MapActionForm form) throws IOException {
        return ResponseEntity.ok(this.provinceService.removeFromHre(form));
    }

    @PostMapping(value = "/change-trade-good", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> changeTradeGood(@RequestBody MapActionForm form) throws IOException {
        return ResponseEntity.ok(this.provinceService.changeTradeGood(form));
    }
    
    @PostMapping(value = "/change-religion", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> changeReligion(@RequestBody MapActionForm form) throws IOException {
        return ResponseEntity.ok(this.provinceService.changeReligion(form));
    }
    
    @PostMapping(value = "/change-culture", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> changeCulture(@RequestBody MapActionForm form) throws IOException {
        return ResponseEntity.ok(this.provinceService.changeCulture(form));
    }

    @PostMapping(value = "/decolonize", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameDTO> decolonize(@RequestBody MapActionForm form) throws IOException {
        return ResponseEntity.ok(this.provinceService.decolonize(form));
    }
}
