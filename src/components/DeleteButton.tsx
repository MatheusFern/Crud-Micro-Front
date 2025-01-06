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
import { Button, DialogActionTrigger, IconButton } from "@chakra-ui/react";
import { FaRegTrashCan } from "react-icons/fa6";
import UserHandler from "../utils/helperFuncions";
import toast, { Toaster } from "react-hot-toast";

interface User {
  Nome: string;
  Telefone?: string;
  email?: string;
  Datacadastro?: string;
  id: string;
}

export default function DeleteButton(Item: User): JSX.Element {
  const { DeleteUser } = UserHandler();

  const handleDelete = async (id: string) => {
    try {
      await DeleteUser(id);
      toast.success("Usuario excluido com sucesso!");
    } catch (error) {
      console.log("ih deu ruim");
    }
  };

  return (
    <>
      <DialogRoot>
        <DialogTrigger asChild>
          <IconButton
            aria-label="delete user"
            marginX={2}
            bg={"#e03843"}
            _active={{ transform: "scale(0.85)" }}
          >
            <FaRegTrashCan />
          </IconButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja realmente excluir esse usuario</DialogTitle>
          </DialogHeader>
          <DialogBody>Usuario a ser excluido {Item.Nome}</DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button
                colorPalette="red"
                _active={{ transform: "scale(0.85)" }}
                onClick={() => handleDelete(Item.id)}
              >
                Excluir
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <Toaster position="bottom-right"/>
    </>
  );
}
