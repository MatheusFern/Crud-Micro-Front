import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { MdEditDocument, MdPerson } from "react-icons/md";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";
interface User {
  Nome: string;
  Telefone: string;
  email: string;
  Datacadastro: string;
  id: string;
}

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}

export default function ListItem(Item: User) {
  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      gap="6"
      bg={"#ffffff"}
      borderRadius={15}
      my={2}
      px={10}
      py={2}
      alignItems={"center"}
      color={"teal"}
    >
      <GridItem colSpan={2}>
        <HStack>
          <Box padding={4} bg={"teal.100"} borderRadius={30}>
            <Icon fontSize="30px" radius={5} color={"teal.500"}>
              <MdPerson />
            </Icon>
          </Box>
          <Box justifyItems={"flex-start"} ml={4}>
            <Heading size="sm">{Item.Nome ? Item.Nome : ''}</Heading>
            <Text textStyle="sm" fontWeight="semibold">
              {Item.Telefone ? Item.Telefone : ''}
            </Text>
            <Text textStyle="sm" fontWeight="semibold">
              {Item.email ? Item.email : ''}
            </Text>
          </Box>
        </HStack>
      </GridItem>
      <GridItem colSpan={1}>
        <Box>
          {" "}
          <Text textStyle="sm" fontWeight="semibold">
            Data de cadastro
          </Text>
          <Text textStyle="sm" fontWeight="semibold">
            { Item.Datacadastro? formatDate(Item.Datacadastro): "" }
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box>
        <UpdateButton Nome={Item.Nome} id={Item.id} email={Item.email} Telefone={Item.Telefone} Datacadastro={Item.Datacadastro}/>
          <DeleteButton Nome={Item.Nome} id={Item.id} />
        </Box>
      </GridItem>
    </Grid>
  );
}
