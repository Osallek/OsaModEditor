package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.TradeNode;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.util.Map;

public class TradeNodeDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private String localizedName;

    private Integer location;

    private ColorDTO color;

    private boolean inland;

    private boolean aiWillPropagateThroughTrade;

    private boolean end;

    //    private List<TradeNodeOutgoing> outgoings;

    public TradeNodeDTO(TradeNode tradeNode, Map<Eu4Language, Map<String, String>> localisations) {
        super(tradeNode.getName(), localisations);
        this.name = tradeNode.getName();
        this.localizedName = tradeNode.getLocalizedName();
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

    public String getLocalizedName() {
        return localizedName;
    }

    public void setLocalizedName(String localizedName) {
        this.localizedName = localizedName;
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

    public boolean isInland() {
        return inland;
    }

    public void setInland(boolean inland) {
        this.inland = inland;
    }

    public boolean isAiWillPropagateThroughTrade() {
        return aiWillPropagateThroughTrade;
    }

    public void setAiWillPropagateThroughTrade(boolean aiWillPropagateThroughTrade) {
        this.aiWillPropagateThroughTrade = aiWillPropagateThroughTrade;
    }

    public boolean isEnd() {
        return end;
    }

    public void setEnd(boolean end) {
        this.end = end;
    }
}
