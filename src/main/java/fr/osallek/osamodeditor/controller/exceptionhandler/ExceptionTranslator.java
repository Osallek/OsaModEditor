package fr.osallek.osamodeditor.controller.exceptionhandler;

import fr.osallek.eu4parser.common.ModNotFoundException;
import fr.osallek.osamodeditor.common.exception.ClimateNotFoundException;
import fr.osallek.osamodeditor.common.exception.ColonialRegionNotFoundException;
import fr.osallek.osamodeditor.common.exception.CountryNotFoundException;
import fr.osallek.osamodeditor.common.exception.CultureNotFoundException;
import fr.osallek.osamodeditor.common.exception.DescriptorFileFoundException;
import fr.osallek.osamodeditor.common.exception.GraphicalCultureNotFoundException;
import fr.osallek.osamodeditor.common.exception.IdeaGroupNotFoundException;
import fr.osallek.osamodeditor.common.exception.InvalidColorException;
import fr.osallek.osamodeditor.common.exception.InvalidFileException;
import fr.osallek.osamodeditor.common.exception.LocalisationNotFoundException;
import fr.osallek.osamodeditor.common.exception.MissionNotFoundException;
import fr.osallek.osamodeditor.common.exception.MissionsTreeNotFoundException;
import fr.osallek.osamodeditor.common.exception.MonsoonNotFoundException;
import fr.osallek.osamodeditor.common.exception.ProvinceNotFoundException;
import fr.osallek.osamodeditor.common.exception.ReligionNotFoundException;
import fr.osallek.osamodeditor.common.exception.TerrainNotFoundException;
import fr.osallek.osamodeditor.common.exception.TradeCompanyNotFoundException;
import fr.osallek.osamodeditor.common.exception.TradeGoodNotFoundException;
import fr.osallek.osamodeditor.common.exception.TradeNodeNotFoundException;
import fr.osallek.osamodeditor.common.exception.WinterNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.PropertyAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.xml.datatype.DatatypeConfigurationException;

@RestControllerAdvice
public class ExceptionTranslator {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionTranslator.class);

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleInterruptedException(InterruptedException e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.DEFAULT_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleException(Exception e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.DEFAULT_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.MISSING_PARAMETER), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handlePropertyAccessException(PropertyAccessException e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.INVALID_PARAMETER), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleDatatypeConfigurationException(DatatypeConfigurationException e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.DEFAULT_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleModNotFoundException(ModNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.MOD_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleDescriptorFileFoundException(DescriptorFileFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.DESCRIPTOR_FILE_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleClimateNotFoundException(ClimateNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.CLIMATE_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleColonialRegionNotFoundException(ColonialRegionNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.COLONIAL_REGION_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleCountryNotFoundException(CountryNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.COUNTRY_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleCultureNotFoundException(CultureNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.CULTURE_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleIdeaGroupNotFoundException(IdeaGroupNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.IDEA_GROUP_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleMonsoonNotFoundException(MonsoonNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.MONSOON_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleProvinceNotFoundException(ProvinceNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.PROVINCE_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleReligionNotFoundException(ReligionNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.RELIGION_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleTerrainNotFoundException(TerrainNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.TERRAIN_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleTradeCompanyNotFoundException(TradeCompanyNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.TRADE_COMPANY_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleTradeGoodNotFoundException(TradeGoodNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.TRADE_GOOD_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleTradeNodeNotFoundException(TradeNodeNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.TRADE_NODE_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleWinterNotFoundException(WinterNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.WINTER_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleGraphicalCultureNotFoundException(GraphicalCultureNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.GRAPHICAL_CULTURE_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleInvalidFileException(InvalidFileException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.INVALID_FILE), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleInvalidColorException(InvalidColorException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.INVALID_COLOR), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleMissionNotFoundException(MissionNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.MISSION_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleMissionsTreeNotFoundException(MissionsTreeNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.MISSIONS_TREE_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleLocalisationNotFoundException(LocalisationNotFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.LOCALISATION_NOT_FOUND), HttpStatus.NOT_FOUND);
    }
}
