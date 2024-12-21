import { Box } from "@chakra-ui/react";
import { ReactNode } from 'react';

export default function Layout({
    children,
  }: {
    children: ReactNode;
  }){
  return (
    <Box  height={"88vh"} width={"140vh"} borderWidth='1px'bg={"#f8f8f8"} borderRadius='lg' overflow='hidden' p={2} >
        {children}
    </Box>
  );
}