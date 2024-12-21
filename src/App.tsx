"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { Box, VStack,Spinner, Text,Group  } from "@chakra-ui/react";
import Layout from "./components/layout";
import AddButton from "./components/Addbutton";
import ListItem from "./components/ListItem";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { FaRobot } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import UserHandler from "./utils/helperFuncions";
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
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignContent={"center"}
          alignSelf={"flex-end"}
        >
          <Select
            placeholder={"Filtrar por:"}
            onChange={(selectedOption) =>
              handleSubmitFilter(selectedOption?.value || "")
            }
            options={options}
          />

          <Box ml={2}>
            <AddButton />
          </Box>
        </Box>
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
