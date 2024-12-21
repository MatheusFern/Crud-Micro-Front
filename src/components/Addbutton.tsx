"use client";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Input } from "@chakra-ui/react";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { useState } from "react";
import Select from "react-select";
import UserHandler from "../utils/helperFuncions";
import toast, { Toaster } from "react-hot-toast";


interface UserData {
  nome: string;
  telefone: string;
  email: string;
  Tipo: string;
  inicial: boolean;
}

const options = [
  { label: "Hóspede", value: "Hóspede" },
  { label: "Fornecedor", value: "Fornecedor" },
  { label: "Operador", value: "Operador" },
  { label: "Proprietário", value: "Proprietário" },
];

export default function AddButton(): JSX.Element {
  const { CreateUser } = UserHandler();
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [Tipo, setTipo] = useState<string>("");

  const handleSubmit = async (): Promise<void> => {
    const currentDate = new Date().toISOString().split("T")[0];

    const userData: UserData & { registrationDate: string } = {
      nome,
      telefone,
      email,
      Tipo,
      registrationDate: currentDate,
      inicial: false,
    };
    console.log("Enviando dados:", userData);

    try {
      await CreateUser(userData);
      toast.success("Successfully created!");
    } catch (error) {
      console.log(error);
    }

    setNome("");
    setTelefone("");
    setEmail("");
    setTipo("");
  };

  return (
    <>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button colorPalette="teal" _active={{ transform: "scale(0.85)" }}>
            Adicionar <MdOutlinePersonAddAlt />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar usuário</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Input
              placeholder="Nome"
              size="lg"
              my={1}
              value={nome}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNome(e.target.value)
              }
            />
            <Input
              placeholder="Telefone"
              size="lg"
              my={1}
              value={telefone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTelefone(e.target.value)
              }
            />
            <Input
              placeholder="Email"
              size="lg"
              my={1}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <Select
              defaultValue={options.find((opt) => opt.value === Tipo)}
              onChange={(selectedOption) =>
                setTipo(selectedOption?.value || "")
              }
              options={options}
            />
          </DialogBody>
          <DialogFooter>
            <Button colorPalette="green" onClick={handleSubmit}>
              Cadastrar
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <Toaster position="bottom-right"/>
    </>
  );
}
