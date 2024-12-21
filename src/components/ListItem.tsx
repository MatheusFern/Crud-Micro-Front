import { Box, Heading, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEditDocument, MdPerson } from "react-icons/md";
interface User {
  Nome: string;
  Telefone: string;
  email:string;
  Datacadastro:string;
  id:string
}

export default function ListItem(Item: User) {
  return (
    <HStack
      bg={"#ffffff"}
      borderRadius={15}
      justifyContent={'space-between'}
      my={2}
      px={10}
      py={2}
    >
      <HStack>
        <Box padding={4} bg={"#f0fcf8"} borderRadius={30}>
          <Icon fontSize="30px" radius={5}>
            <MdPerson />
          </Icon>
        </Box>
        <Box justifyItems={"flex-start"} ml={4}>
          <Heading size="sm">{Item.Nome}</Heading>
          <Text textStyle="sm" fontWeight="semibold">
            {Item.Telefone}
          </Text>
          <Text textStyle="sm" fontWeight="semibold">
          {Item.email}
          </Text>
        </Box>
      </HStack>

      <Box>
        {" "}
        <Text textStyle="sm" fontWeight="semibold">
          Data de cadastro
        </Text>
        <Text textStyle="sm" fontWeight="semibold">
        {Item.Datacadastro}
        </Text>
      </Box>
      <Box>
        <IconButton
          aria-label="edit user"
          marginX={2}
          bg={"#386be0"}
          _active={{ transform: "scale(0.85)" }}
        >
          <MdEditDocument />
        </IconButton>
        <IconButton
          aria-label="delete user"
          marginX={2}
          bg={"#e03843"}
          _active={{ transform: "scale(0.85)" }}
        >
          <FaRegTrashCan />
        </IconButton>
      </Box>
    </HStack>
  );
}
