import { Avatar, InputAdornment, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useIntl } from "react-intl";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import { SpriteType } from "types";
import { getImageUrl } from "utils/global.utils";

const LISTBOX_PADDING = 8; // px

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

interface Props {
  folderName: string | null;
  value: SpriteType | undefined;
  values: SpriteType[];
  onChange: (spriteType: SpriteType) => void;
}

export function VirtualizedSpriteTypesAutocomplete({ folderName, value, values, onChange }: Props) {
  const intl = useIntl();

  function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const keys = data.map((d: { key: any }) => d.key);
    const options = values.filter((v) => keys.includes(v.name));
    const option = options[index];
    const dataSet = data[index];
    const inlineStyle = {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    };

    return (
      <ListItem {...dataSet.props} style={inlineStyle} key={index}>
        <ListItemButton
          onClick={(event) => {
            if (option && option !== value) {
              onChange(option);
            }
          }}
        >
          {folderName && option && (
            <ListItemAvatar>
              <Avatar src={getImageUrl(folderName, option.textureFile)} />
            </ListItemAvatar>
          )}
          <ListItemText primary={option.name} />
        </ListItemButton>
      </ListItem>
    );
  }

  const OuterElementContext = React.createContext({});

  const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  });

  function useResetCache(data: any) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => {
      if (ref.current != null) {
        ref.current.resetAfterIndex(0, true);
      }
    }, [data]);
    return ref;
  }

  const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData: React.ReactChild[] = [];
    (children as React.ReactChild[]).forEach((item: React.ReactChild & { children?: React.ReactChild[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    });

    const itemCount = itemData.length;
    const itemSize = 48;

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map((value) => 48).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => itemSize}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  });

  return (
    <Autocomplete
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      disableListWrap
      disableClearable
      value={value}
      options={values ?? []}
      onChange={(event, newValue) => {
        if (newValue && newValue !== value) {
          onChange(newValue);
        }
      }}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={intl.formatMessage({ id: "mission.icon" })}
          InputProps={{
            ...params.InputProps,
            startAdornment: folderName && value && (
              <InputAdornment position="start">
                <Avatar src={getImageUrl(folderName, value.textureFile)} style={{ height: 36, width: 36 }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
