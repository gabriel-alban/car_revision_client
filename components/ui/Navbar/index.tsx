"use client"

import Link from "next/link"
import { Box, Button, HStack, Spacer, Text } from "@chakra-ui/react"
import { useAuth } from "@/hooks/useAuth"
import { useLogout } from "@/hooks/useLogout";

export const Navbar = () => {
    const {isLoggedIn} = useAuth();
    const {logout} = useLogout();

    return (
        <Box
            as="nav"
            w="full"
            borderBottomWidth="1px"
            borderColor="border.subtle"
            bg="bg.panel"
            px={{ base: "4", md: "6" }}
            py="3"
        >
            <HStack gap="6">
                <Text fontWeight="bold">Car Revisions</Text>

                {isLoggedIn ? (
                    <Link href="/dashboard">
                        <Text>Dashboard</Text>
                    </Link>
                ) : null}

                <Spacer />

                {isLoggedIn === null ? null : isLoggedIn ? (
                    <Button size="sm" colorPalette="red" onClick={logout}>
                        Log off
                    </Button>
                ) : (
                    <HStack gap="2">
                        <Link href="/login">
                            <Button size="sm" variant="outline">
                                Login
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="sm" colorPalette="blue">
                                Register
                            </Button>
                        </Link>
                    </HStack>
                )}
            </HStack>
        </Box>
    )

}