package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.TradeNode;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;

import java.util.Map;

public class TradeNodeDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private Integer location;

    private ColorDTO color;

    private Boolean inland;

    private Boolean aiWillPropagateThroughTrade;

    private Boolean end;

    //    private List<TradeNodeOutgoing> outgoings;

    public TradeNodeDTO(TradeNode tradeNode, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(tradeNode.getName(), localisations);
        this.name = tradeNode.getName();
        this.location = tradeNode.getLocation();
        this.color = tradeNode.getColor() == null ? new ColorDTO(this.name, true) : new ColorDTO(tradeNode.getColor());
        this.inland = tradeNode.isInland();
        this.aiWillPropagateThroughTrade = tradeNode.isAiWillPropagateThroughTrade();
        this.end = tradeNode.isEnd();
    }

    @Override
    @JsonIgnore
    public String getKey() {
        return this.name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLocation() {
        return location;
    }

    public void setLocation(Integer location) {
        this.location = location;
    }

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    public Boolean isInland() {
        return inland;
    }

    public void setInland(Boolean inland) {
        this.inland = inland;
    }

    public Boolean isAiWillPropagateThroughTrade() {
        return aiWillPropagateThroughTrade;
    }

    public void setAiWillPropagateThroughTrade(Boolean aiWillPropagateThroughTrade) {
        this.aiWillPropagateThroughTrade = aiWillPropagateThroughTrade;
    }

    public Boolean isEnd() {
        return end;
    }

    public void setEnd(Boolean end) {
        this.end = end;
    }
}
