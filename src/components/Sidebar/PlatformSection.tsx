import useSwr from "swr";
import {
  Text,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  AccordionButton,
  Center,
  Spinner,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import Client from "src/libs/supabase";
import { PlatformList } from "src/utils/platform";
import { useFilterContext } from "src/context/FilterContext";

const CategoriesSection = () => {
  const { data: categories, error } = useSwr("categories", () =>
    Client.getCategories()
  );
  const { setPlatform } = useFilterContext();

  const isLoading = !categories && !error;

  return (
    <AccordionItem>
      <AccordionButton py="4">
        <Text
          color="black.200"
          lineHeight="base"
          fontWeight="semibold"
          flex="1"
          textAlign="left"
        >
          Platform
        </Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        {isLoading ? (
          <Center py="6">
            <Spinner />
          </Center>
        ) : (
          <CheckboxGroup defaultValue={["naruto", "kakashi"]}>
            <List>
              {PlatformList.map((category: any) => (
                <ListItem py="2" key={category.id}>
                  <Checkbox
                    onChange={(event) =>
                      setPlatform(category.id, event.target.checked)
                    }
                    size="lg"
                    w="full"
                    value={category.id}
                  >
                    {category.name}
                  </Checkbox>
                </ListItem>
              ))}
            </List>
          </CheckboxGroup>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default CategoriesSection;
