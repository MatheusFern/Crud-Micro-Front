"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import {
  Box,
  VStack,
  Spinner,
  Text,
  Group,
  IconButton,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Layout from "./components/layout";
import AddButton from "./components/Addbutton";
import ListItem from "./components/ListItem";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { FaRobot } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import UserHandler from "./utils/helperFuncions";
import { MdFilterAltOff } from "react-icons/md";
import { FaArrowsRotate } from "react-icons/fa6";
import "./App.css";

const options = [
  { label: "Hóspede", value: "Hóspede" },
  { label: "Fornecedor", value: "Fornecedor" },
  { label: "Operador", value: "Operador" },
  { label: "Proprietário", value: "Proprietário" },
];

interface User {
  Nome: string;
  Telefone: string;
  email: string;
  Datacadastro: string;
  id: string;
}
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { GetUsers, FilterUsersByType } = UserHandler();

  const fetchUsers = async () => {
    setLoading(false);
    try {
      const userlist = await GetUsers();
      setUsers(userlist?.data);
      setLoading(true);
    } catch (err) {
      setError(true);
      console.log("ih deu ruim");
    }
  };

  const handleSubmitFilter = async (type: string) => {
    try {
      const filteredUsers = await FilterUsersByType(type);
      setUsers(filteredUsers?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Layout>
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap="6"
          borderRadius={15}
          // my={2}
          // px={10}
          // py={2}
         
          color={"teal"}
        >
          <GridItem colSpan={2}>
            <Select
              placeholder={"Filtrar por:"}
              onChange={(selectedOption) =>
                handleSubmitFilter(selectedOption?.value || "")
              }
              options={options}
            />
          </GridItem>
          <GridItem colSpan={7}>
        
          </GridItem>

          <GridItem colSpan={3}>
            <HStack>
            <IconButton
              colorPalette={"teal"}
              mx={1}
              px={1}
              aria-label="Reset"
              _active={{ transform: "scale(0.85)" }}
              variant={"ghost"}
              onClick={() => fetchUsers()}
              rounded={5}
            >
              <FaArrowsRotate />
              Atualizar
            </IconButton>
            <Box ml={2}>
              <AddButton />
            </Box>
            </HStack>
          
          </GridItem>
         
        </Grid>

        {error ? (
          <>
            <EmptyState
              icon={<FaRobot />}
              title="Algo deu Errado"
              description="Por favor tente atualizar a lista"
            >
              <Group>
                <Button
                  colorPalette={"teal"}
                  _active={{ transform: "scale(0.85)" }}
                  onClick={() => fetchUsers()}
                >
                  <IoMdRefresh /> atualizar
                </Button>
              </Group>
            </EmptyState>
          </>
        ) : (
          <Box
            mt={5}
            borderRadius={5}
            w={"100%"}
            h={"90%"}
            bg={"teal"}
            padding={2}
            overflow="auto"
            css={{
              "&::-webkit-scrollbar": {
                width: "6px",
                marginX: "5px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "teal.500",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "gray.500",
              },
              "&::-webkit-scrollbar-track": {
                background: "gray.200",
              },
            }}
          >
            {loading ? (
              <>
                {users.map((user: User) => (
                  <ListItem
                    id={user.id}
                    Nome={user.Nome}
                    Telefone={user.Telefone}
                    email={user.email}
                    Datacadastro={user.Datacadastro}
                  />
                ))}
              </>
            ) : (
              <>
                <VStack colorPalette="white">
                  <Spinner color="colorPalette.200" />
                  <Text color="colorPalette.200">Atualizando...</Text>
                </VStack>
              </>
            )}
          </Box>
        )}
      </Layout>
    </>
  );
}

export default App;
