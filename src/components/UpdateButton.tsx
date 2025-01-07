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
import {
  Button,
  DialogActionTrigger,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { FaRegTrashCan } from "react-icons/fa6";
import UserHandler from "../utils/helperFuncions";
import toast, { Toaster } from "react-hot-toast";
import { MdEditDocument } from "react-icons/md";
import Select from "react-select";
import { useState } from "react";

interface UserData {
  Nome: string;
  Telefone?: string;
  email?: string;
  Datacadastro: string;
  id: string;
}
const options = [
  { label: "Hóspede", value: "Hóspede" },
  { label: "Fornecedor", value: "Fornecedor" },
  { label: "Operador", value: "Operador" },
  { label: "Proprietário", value: "Proprietário" },
];

export default function DeleteButton(Item: UserData): JSX.Element {
  const { UpdateUser } = UserHandler();
  const [nome, setNome] = useState<string>(Item.Nome);
  const [telefone, setTelefone] = useState<string | undefined>(Item.Telefone);
  const [email, setEmail] = useState<string | undefined>(Item.email);
  const [Tipo, setTipo] = useState<string >();

  const handleUpdateSubmit = async (): Promise<void> => {
    const userData = {
      Nome: nome,
      Telefone: telefone,
      "E-mail": email,
      Tipo: Tipo,
      "Data de Cadastro": Item.Datacadastro,
      inicial: false,
    };
    console.log("Atualizando dados:", userData);

    try {
      await UpdateUser(Item.id, userData);
      toast.success("Usuario cadastrado com sucesso!");
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
          <IconButton
            aria-label="update user"
            marginX={2}
            bg={"#386be0"}
            _active={{ transform: "scale(0.85)" }}
          >
            <MdEditDocument />
          </IconButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja atualizar esse usuario</DialogTitle>
          </DialogHeader>
          <DialogBody>
            Usuario a ser atualizado {Item.Nome}
            <Input
              placeholder={Item.Nome}
              size="lg"
              my={1}
              value={nome}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNome(e.target.value)
              }
            />
            <Input
              placeholder={Item.Telefone}
              size="lg"
              my={1}
              value={telefone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTelefone(e.target.value)
              }
            />
            <Input
              placeholder={Item.email}
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
            <DialogActionTrigger asChild>
              <Button
                colorPalette="blue"
                _active={{ transform: "scale(0.85)" }}
                onClick={() => handleUpdateSubmit()}
              >
                Atualizar
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <Toaster position="bottom-right" />
    </>
  );
}
